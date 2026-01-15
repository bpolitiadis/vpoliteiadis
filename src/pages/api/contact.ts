import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { createContactFormEmail, createConfirmationEmail } from '../../lib/email-templates.js';

// Ensure this API route runs server-side, not prerendered
export const prerender = false;

// Maximum request body size (10KB)
const MAX_REQUEST_SIZE = 10 * 1024;

// Input length limits (RFC 5321 for email, reasonable limits for others)
const INPUT_LIMITS = {
  firstName: 50,
  lastName: 50,
  email: 254, // RFC 5321 maximum
  message: 5000,
} as const;

// Initialize rate limiter with Upstash Redis
// Falls back to in-memory if Redis is not configured (for local dev)
function getRateLimiter(): Ratelimit | null {
  const redisUrl = import.meta.env.UPSTASH_REDIS_REST_URL;
  const redisToken = import.meta.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    // In production, this should be configured
    // For local dev, return null and skip rate limiting
    if (import.meta.env.PROD) {
      console.warn('Rate limiting disabled: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set');
    }
    return null;
  }

  const redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour per IP
    analytics: true,
    prefix: '@contact-form',
  });
}

// Lazy initialization of Resend to avoid build-time errors
function getResend(): Resend {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(apiKey);
}

// Get client IP address from request headers
function getClientIP(request: Request): string {
  // Check various headers for IP (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback to a default key if IP cannot be determined
  // In production, this should never happen with proper proxy configuration
  return 'unknown';
}

// Sanitize HTML content (basic sanitization for defense in depth)
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Standardized error response format
interface ErrorResponse {
  error: string;
  // Never include details, stack traces, or internal information
}

function createErrorResponse(message: string, status: number): Response {
  const response: ErrorResponse = { error: message };
  return new Response(JSON.stringify(response), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

function createSuccessResponse(message: string): Response {
  return new Response(
    JSON.stringify({
      success: true,
      message,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }
  );
}

// Contact form validation schema with strict length limits
const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(INPUT_LIMITS.firstName, `First name must be ${INPUT_LIMITS.firstName} characters or less`),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(INPUT_LIMITS.lastName, `Last name must be ${INPUT_LIMITS.lastName} characters or less`),
  email: z
    .string()
    .email('Invalid email address')
    .max(INPUT_LIMITS.email, `Email must be ${INPUT_LIMITS.email} characters or less`),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(INPUT_LIMITS.message, `Message must be ${INPUT_LIMITS.message} characters or less`),
  honeypot: z.string().optional(), // Honeypot field for spam detection
});

export const POST: APIRoute = async ({ request }) => {
  // Validate request size before processing
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_REQUEST_SIZE) {
    console.warn('Request rejected: body too large', { contentLength });
    return createErrorResponse('Request too large', 413);
  }

  // Rate limiting
  const rateLimiter = getRateLimiter();
  if (rateLimiter) {
    const clientIP = getClientIP(request);
    try {
      const { success, limit, remaining, reset } = await rateLimiter.limit(clientIP);

      if (!success) {
        const retryAfter = Math.ceil((reset - Date.now()) / 1000);
        console.warn('Rate limit exceeded', { clientIP, limit, remaining, reset });

        return new Response(
          JSON.stringify({
            error: 'Too many requests. Please try again later.',
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': retryAfter.toString(),
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
              'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
          }
        );
      }
    } catch (rateLimitError) {
      // Log rate limiting errors but don't block the request
      // This ensures availability even if rate limiting service is down
      console.error('Rate limiting error (non-blocking):', rateLimitError);
    }
  }

  let body: unknown;

  try {
    // Handle both JSON and form data requests
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      // Handle JSON requests (from React form)
      body = await request.json();

      // Honeypot check for JSON
      if (body && typeof body === 'object' && 'honeypot' in body) {
        const honeypotValue = (body as { honeypot?: unknown }).honeypot;
        if (honeypotValue && String(honeypotValue).trim().length > 0) {
          console.warn('Honeypot field detected, likely spam.');
          return createErrorResponse('Invalid request', 400);
        }
      }
    } else {
      // Handle form data requests (fallback)
      const formDataRaw = await request.formData();
      const honeypotField = formDataRaw.get('honeypot');
      if (honeypotField && String(honeypotField).trim().length > 0) {
        console.warn('Honeypot field detected, likely spam.');
        return createErrorResponse('Invalid request', 400);
      }
      body = Object.fromEntries(formDataRaw);
    }
  } catch (parseError) {
    console.error('Request parsing error:', parseError);
    return createErrorResponse('Invalid request format', 400);
  }

  // Validate request body structure
  if (!body || typeof body !== 'object') {
    console.warn('Invalid request body structure');
    return createErrorResponse('Invalid request', 400);
  }

  // Validate with Zod schema
  const parseResult = contactFormSchema.safeParse(body);

  if (!parseResult.success) {
    // Log detailed validation errors server-side only
    const errors = parseResult.error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    console.warn('Validation errors:', errors);

    // Return generic error to client (never expose field paths or validation details)
    return createErrorResponse('Invalid input. Please check your form data.', 400);
  }

  const formData = parseResult.data;

  // Sanitize message content (defense in depth)
  const sanitizedMessage = sanitizeHtml(formData.message);

  // Ensure environment variables are set
  if (
    !import.meta.env.RESEND_API_KEY ||
    !import.meta.env.FROM_EMAIL ||
    !import.meta.env.CONTACT_EMAIL
  ) {
    console.error('Missing Resend API key or email environment variables.');
    return createErrorResponse('Service temporarily unavailable', 500);
  }

  // Send emails using Resend
  try {
    const resend = getResend();
    const toEmail = import.meta.env.CONTACT_EMAIL || import.meta.env.FROM_EMAIL;
    const replyTo = import.meta.env.REPLY_TO_EMAIL || formData.email;

    // Create form data with sanitized message
    const sanitizedFormData = {
      ...formData,
      message: sanitizedMessage,
    };

    // Send notification email to site owner
    const notificationTemplate = createContactFormEmail(sanitizedFormData);
    const notificationResult = await resend.emails.send({
      from: import.meta.env.FROM_EMAIL,
      to: [toEmail],
      replyTo: replyTo,
      subject: notificationTemplate.subject,
      html: notificationTemplate.html,
      text: notificationTemplate.text,
    });

    // Send confirmation email to form submitter (optional)
    let confirmationResult = null;
    if (import.meta.env.SEND_CONFIRMATION_EMAIL === 'true') {
      const confirmationTemplate = createConfirmationEmail(sanitizedFormData);
      confirmationResult = await resend.emails.send({
        from: import.meta.env.FROM_EMAIL,
        to: [formData.email],
        subject: confirmationTemplate.subject,
        html: confirmationTemplate.html,
        text: confirmationTemplate.text,
      });
    }

    if (import.meta.env.RESEND_DEBUG === 'true') {
      console.log('Emails sent successfully', {
        notificationEmailId: notificationResult.data?.id,
        confirmationEmailId: confirmationResult?.data?.id,
        to: toEmail,
        replyTo,
        subject: notificationTemplate.subject,
      });
    }

    // Log success server-side only
    console.log('Contact form submitted successfully', {
      notificationEmailId: notificationResult.data?.id,
      confirmationEmailId: confirmationResult?.data?.id,
      from: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
    });

    // Check for email send errors
    if (notificationResult.error) {
      console.error('Failed to send notification email:', notificationResult.error);
      return createErrorResponse('Failed to send message', 500);
    }

    if (confirmationResult?.error) {
      // Log warning but don't fail the request (notification was sent)
      console.warn('Failed to send confirmation email, but notification was sent:', confirmationResult.error);
    }

    return createSuccessResponse('Message sent successfully');
  } catch (error) {
    // Log detailed error server-side only
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error('Failed to send emails:', {
      error: errorMessage,
      stack: errorStack,
      // Never log sensitive data like email addresses in error context
    });

    // Return generic error to client (never expose internal errors or stack traces)
    return createErrorResponse('Failed to send message. Please try again later.', 500);
  }
};

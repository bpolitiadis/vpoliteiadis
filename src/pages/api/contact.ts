import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';
import { loggedOperation } from '../../lib/http-utils.js';
import { createContactFormEmail, createConfirmationEmail } from '../../lib/email-templates.js';

// Ensure this API route runs server-side, not prerendered
export const prerender = false;

// Lazy initialization of Resend to avoid build-time errors
function getResend() {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(apiKey);
}

// Contact form validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }).max(60),
  lastName: z.string().min(1, { message: 'Last Name is required' }).max(60),
  email: z.string().email({ message: 'Invalid email address' }).max(254),
  message: z.string().min(1, { message: 'Message is required' }).max(5000),
  honeypot: z.string().optional(),
});


// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = parseInt(import.meta.env.RATE_LIMIT_WINDOW || '60000');
  const maxRequests = parseInt(import.meta.env.RATE_LIMIT_REQUESTS || '10');
  
  const key = ip;
  const current = rateLimitStore.get(key);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
}

// Clean up old rate limit entries
function cleanupRateLimit() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}


export const POST: APIRoute = async ({ request, locals }) => {
  const logger = locals.logger;
  const { requestId, traceId } = locals.requestContext || {};
  
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    
    // Check rate limiting
    cleanupRateLimit();
    if (!checkRateLimit(clientIP)) {
      logger?.warn({ clientIP }, 'Rate limit exceeded');
      return new Response(JSON.stringify({ 
        error: 'Too many requests. Please try again later.' 
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      logger?.warn({ errors: validationResult.error.errors }, 'Contact form validation failed');
      return new Response(JSON.stringify({ 
        error: 'Invalid form data',
        details: validationResult.error.errors 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const formData = validationResult.data;
    
    // Check honeypot (spam protection)
    if (formData.honeypot && formData.honeypot.trim().length > 0) {
      logger?.info({ honeypot: formData.honeypot }, 'Honeypot triggered - likely spam');
      // Silently accept to avoid revealing the honeypot
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Validate required environment variables
    if (!import.meta.env.RESEND_API_KEY) {
      logger?.error('RESEND_API_KEY environment variable is not set');
      return new Response(JSON.stringify({ 
        error: 'Email service not configured' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    if (!import.meta.env.FROM_EMAIL) {
      logger?.error('FROM_EMAIL environment variable is not set');
      return new Response(JSON.stringify({ 
        error: 'Email service not configured' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Send emails using Resend
    const emailResult = await loggedOperation(
      'send-contact-emails',
      async () => {
        const resend = getResend();
        const toEmail = import.meta.env.CONTACT_EMAIL || import.meta.env.FROM_EMAIL;
        const replyTo = import.meta.env.REPLY_TO_EMAIL || formData.email;
        
        // Send notification email to site owner
        const notificationTemplate = createContactFormEmail(formData);
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
          const confirmationTemplate = createConfirmationEmail(formData);
          confirmationResult = await resend.emails.send({
            from: import.meta.env.FROM_EMAIL,
            to: [formData.email],
            subject: confirmationTemplate.subject,
            html: confirmationTemplate.html,
            text: confirmationTemplate.text,
          });
        }
        
        if (import.meta.env.RESEND_DEBUG === 'true') {
          logger?.info({ 
            notificationEmailId: notificationResult.data?.id,
            confirmationEmailId: confirmationResult?.data?.id,
            to: toEmail,
            replyTo,
            subject: notificationTemplate.subject 
          }, 'Emails sent successfully');
        }
        
        return { notification: notificationResult, confirmation: confirmationResult };
      },
      { requestId, traceId, logger }
    );
    
    if (emailResult.notification?.error) {
      logger?.error({ error: emailResult.notification.error }, 'Failed to send notification email');
      return new Response(JSON.stringify({ 
        error: 'Failed to send message. Please try again later.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    if (emailResult.confirmation?.error) {
      logger?.warn({ error: emailResult.confirmation.error }, 'Failed to send confirmation email, but notification was sent');
    }
    
    logger?.info({ 
      notificationEmailId: emailResult.notification?.data?.id,
      confirmationEmailId: emailResult.confirmation?.data?.id,
      from: formData.email,
      name: `${formData.firstName} ${formData.lastName}`
    }, 'Contact form submitted successfully');
    
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Message sent successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    logger?.error({ err: error }, 'Contact form submission failed');
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error. Please try again later.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

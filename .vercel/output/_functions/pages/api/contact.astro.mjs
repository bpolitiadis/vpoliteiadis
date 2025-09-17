import { Resend } from 'resend';
import { z } from 'zod';
import { l as loggedOperation } from '../../chunks/http-utils_Cc3RaauO.mjs';
export { renderers } from '../../renderers.mjs';

function createContactFormEmail(data) {
  const subjectPrefix = typeof import.meta !== "undefined" && "[Contact Form]" || "[Contact Form]";
  const subject = `${subjectPrefix} Message from ${data.firstName} ${data.lastName}`;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600;">
              New Contact Form Submission
            </h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">
              Someone has reached out through your website
            </p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px;">
            <!-- Contact Information -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #007bff;">
              <h2 style="color: #495057; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                Contact Information
              </h2>
              <div style="display: grid; gap: 10px;">
                <div style="display: flex; align-items: center;">
                  <span style="font-weight: 600; color: #495057; min-width: 60px;">Name:</span>
                  <span style="color: #333;">${data.firstName} ${data.lastName}</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-weight: 600; color: #495057; min-width: 60px;">Email:</span>
                  <a href="mailto:${data.email}" style="color: #007bff; text-decoration: none;">${data.email}</a>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-weight: 600; color: #495057; min-width: 60px;">Date:</span>
                  <span style="color: #333;">${(/* @__PURE__ */ new Date()).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <!-- Message -->
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
              <h2 style="color: #495057; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                Message
              </h2>
              <div style="white-space: pre-wrap; line-height: 1.6; color: #333; font-size: 16px; background-color: #f8f9fa; padding: 15px; border-radius: 4px; border: 1px solid #e9ecef;">
                ${data.message}
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #dee2e6;">
            <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px;">
              This message was sent from the contact form on your website.
            </p>
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              Reply directly to this email to respond to ${data.firstName}.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  const text = `
New Contact Form Submission

Contact Information:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Date: ${(/* @__PURE__ */ new Date()).toLocaleString()}

Message:
${data.message}

---
This message was sent from the contact form on your website.
Reply directly to this email to respond to ${data.firstName}.
  `.trim();
  return { subject, html, text };
}
function createConfirmationEmail(data) {
  const subject = `Thank you for your message, ${data.firstName}!`;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Message Received</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600;">
              Message Received!
            </h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">
              Thank you for reaching out
            </p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Hi ${data.firstName},
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for your message! I've received your contact form submission and will get back to you within 24-48 hours.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
              <h3 style="color: #495057; margin: 0 0 10px 0; font-size: 16px;">Your Message:</h3>
              <p style="color: #333; font-size: 14px; line-height: 1.5; margin: 0; white-space: pre-wrap;">${data.message}</p>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
              If you have any urgent questions, feel free to reach out directly.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #dee2e6;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              This is an automated confirmation. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  const text = `
Hi ${data.firstName},

Thank you for your message! I've received your contact form submission and will get back to you within 24-48 hours.

Your Message:
${data.message}

If you have any urgent questions, feel free to reach out directly.

Best regards,
Vasileios Politeiadis

---
This is an automated confirmation. Please do not reply to this email.
  `.trim();
  return { subject, html, text };
}

const prerender = false;
function getResend() {
  const apiKey = "re_7h4CjRJN_BD9AJ4s9zp3h2C3qbRaEALeB";
  return new Resend(apiKey);
}
const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }).max(60),
  lastName: z.string().min(1, { message: "Last Name is required" }).max(60),
  email: z.string().email({ message: "Invalid email address" }).max(254),
  message: z.string().min(1, { message: "Message is required" }).max(5e3),
  honeypot: z.string().optional()
});
const rateLimitStore = /* @__PURE__ */ new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = parseInt("60000");
  const maxRequests = parseInt("10");
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
function cleanupRateLimit() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}
const POST = async ({ request, locals }) => {
  const logger = locals.logger;
  const { requestId, traceId } = locals.requestContext || {};
  try {
    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    cleanupRateLimit();
    if (!checkRateLimit(clientIP)) {
      logger?.warn({ clientIP }, "Rate limit exceeded");
      return new Response(JSON.stringify({
        error: "Too many requests. Please try again later."
      }), {
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    }
    const body = await request.json();
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      logger?.warn({ errors: validationResult.error.errors }, "Contact form validation failed");
      return new Response(JSON.stringify({
        error: "Invalid form data",
        details: validationResult.error.errors
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const formData = validationResult.data;
    if (formData.honeypot && formData.honeypot.trim().length > 0) {
      logger?.info({ honeypot: formData.honeypot }, "Honeypot triggered - likely spam");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (false) ;
    if (false) ;
    const emailResult = await loggedOperation(
      "send-contact-emails",
      async () => {
        const resend = getResend();
        const toEmail = "b.politiadis@gmail.com";
        const replyTo = "contact@yourdomain.com";
        const notificationTemplate = createContactFormEmail(formData);
        const notificationResult = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: [toEmail],
          replyTo,
          subject: notificationTemplate.subject,
          html: notificationTemplate.html,
          text: notificationTemplate.text
        });
        let confirmationResult = null;
        if (true) {
          const confirmationTemplate = createConfirmationEmail(formData);
          confirmationResult = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: [formData.email],
            subject: confirmationTemplate.subject,
            html: confirmationTemplate.html,
            text: confirmationTemplate.text
          });
        }
        if (false) ;
        return { notification: notificationResult, confirmation: confirmationResult };
      },
      { requestId, traceId, logger }
    );
    if (emailResult.notification?.error) {
      logger?.error({ error: emailResult.notification.error }, "Failed to send notification email");
      return new Response(JSON.stringify({
        error: "Failed to send message. Please try again later."
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (emailResult.confirmation?.error) {
      logger?.warn({ error: emailResult.confirmation.error }, "Failed to send confirmation email, but notification was sent");
    }
    logger?.info({
      notificationEmailId: emailResult.notification?.data?.id,
      confirmationEmailId: emailResult.confirmation?.data?.id,
      from: formData.email,
      name: `${formData.firstName} ${formData.lastName}`
    }, "Contact form submitted successfully");
    return new Response(JSON.stringify({
      success: true,
      message: "Message sent successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    logger?.error({ err: error }, "Contact form submission failed");
    return new Response(JSON.stringify({
      error: "Internal server error. Please try again later."
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

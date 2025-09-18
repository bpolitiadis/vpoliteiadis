import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';
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
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
  honeypot: z.string().optional(), // Honeypot field for spam detection
});

export const POST: APIRoute = async ({ request }) => {
  // Honeypot check
  const formDataRaw = await request.formData();
  const honeypotField = formDataRaw.get('honeypot');
  if (honeypotField) {
    console.warn('Honeypot field detected, likely spam.');
    return new Response(JSON.stringify({ 
      error: 'Spam detected. Message not sent.' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = Object.fromEntries(formDataRaw);

  const parseResult = contactFormSchema.safeParse(body);

  if (!parseResult.success) {
    const errors = parseResult.error.errors.map(err => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    console.error('Validation errors:', errors);
    return new Response(JSON.stringify({ 
      error: 'Validation failed', 
      details: errors 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const formData = parseResult.data;

  // Ensure environment variables are set
  if (!import.meta.env.RESEND_API_KEY || !import.meta.env.FROM_EMAIL || !import.meta.env.CONTACT_EMAIL) {
    console.error('Missing Resend API key or email environment variables.');
    return new Response(JSON.stringify({ 
      error: 'Server configuration error. Please try again later.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // Send emails using Resend
  let emailResult;
  try {
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
      console.log('Emails sent successfully', { 
        notificationEmailId: notificationResult.data?.id,
        confirmationEmailId: confirmationResult?.data?.id,
        to: toEmail,
        replyTo,
        subject: notificationTemplate.subject 
      });
    }
    
    emailResult = { notification: notificationResult, confirmation: confirmationResult };
  } catch (error) {
    console.error('Failed to send emails:', error);
    throw error;
  }
  
  if (emailResult.notification?.error) {
    console.error('Failed to send notification email:', emailResult.notification.error);
    return new Response(JSON.stringify({ 
      error: 'Failed to send message. Please try again later.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  if (emailResult.confirmation?.error) {
    console.warn('Failed to send confirmation email, but notification was sent:', emailResult.confirmation.error);
  }
  
  console.log('Contact form submitted successfully', { 
    notificationEmailId: emailResult.notification?.data?.id,
    confirmationEmailId: emailResult.confirmation?.data?.id,
    from: formData.email,
    name: `${formData.firstName} ${formData.lastName}`
  });
  
  return new Response(JSON.stringify({ 
    success: true,
    message: 'Message sent successfully' 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
  
};
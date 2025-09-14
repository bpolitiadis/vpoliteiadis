/**
 * Email templates for contact form and other email communications
 */

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  honeypot?: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

/**
 * Create email template for contact form submissions
 */
export function createContactFormEmail(data: ContactFormData): EmailTemplate {
  const subjectPrefix = (typeof import.meta !== 'undefined' && import.meta.env?.EMAIL_SUBJECT_PREFIX) || '[Contact Form]';
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
                  <span style="color: #333;">${new Date().toLocaleString()}</span>
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
Date: ${new Date().toLocaleString()}

Message:
${data.message}

---
This message was sent from the contact form on your website.
Reply directly to this email to respond to ${data.firstName}.
  `.trim();
  
  return { subject, html, text };
}

/**
 * Create a simple confirmation email for the form submitter
 */
export function createConfirmationEmail(data: ContactFormData): EmailTemplate {
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

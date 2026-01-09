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
  // Generate subject from message content (first 50 chars) or use default
  const messagePreview = data.message.length > 50 ? data.message.substring(0, 50) + '...' : data.message;
  const subject = `${subjectPrefix} Message from ${data.firstName} ${data.lastName}: ${messagePreview}`;
  
  // Get site URL for logo (fallback to relative path if env not available)
  const siteUrl = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SITE_URL) || 'https://vpoliteiadis.com';
  const logoUrl = `${siteUrl}/images/vp-logo.webp`;
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #0A0A0A 0%, #0F0F0F 50%, #0A0A0A 100%); background-attachment: fixed;">
      <!-- Background Pattern -->
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.03; background-image: radial-gradient(circle at 20% 50%, rgba(57, 255, 20, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 184, 107, 0.1) 0%, transparent 50%); pointer-events: none; z-index: 0;"></div>
      
      <div style="max-width: 640px; margin: 0 auto; padding: 40px 20px; position: relative; z-index: 1;">
        <!-- Main Container -->
        <div style="background: linear-gradient(180deg, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%); border: 1px solid rgba(57, 255, 20, 0.12); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(57, 255, 20, 0.05);">
          
          <!-- Elegant Header -->
          <div style="position: relative; padding: 40px 32px 32px; background: linear-gradient(180deg, rgba(57, 255, 20, 0.08) 0%, transparent 100%); border-bottom: 1px solid rgba(57, 255, 20, 0.15);">
            <!-- Top Accent Line -->
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent 0%, rgba(57, 255, 20, 0.6) 20%, rgba(0, 184, 107, 0.4) 80%, transparent 100%);"></div>
            
            <!-- Logo and Brand -->
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
              <img src="${logoUrl}" alt="VP Logo" width="32" height="32" style="width: 32px; height: 32px; border-radius: 6px; display: block;" />
              <div>
                <div style="font-size: 14px; font-weight: 500; color: rgba(232, 255, 232, 0.65); letter-spacing: 0.3px;">Vasileios Politeiadis</div>
              </div>
            </div>
            
            <!-- Title -->
            <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #E8FFE8; letter-spacing: -0.8px; line-height: 1.2;">
              New Contact Form Submission
            </h1>
            <p style="margin: 0; font-size: 15px; color: rgba(232, 255, 232, 0.6); font-weight: 400; line-height: 1.5;">
              Someone has reached out through your website
            </p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 32px;">
            <!-- Contact Information -->
            <div style="margin-bottom: 32px;">
              <div style="display: inline-block; margin-bottom: 16px;">
                <span style="font-size: 11px; font-weight: 600; color: #39FF14; text-transform: uppercase; letter-spacing: 1px;">Contact Information</span>
              </div>
              <div style="background: rgba(34, 34, 34, 0.4); border: 1px solid rgba(57, 255, 20, 0.1); border-radius: 12px; padding: 24px; backdrop-filter: blur(8px);">
                <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 0 0 16px 0; vertical-align: top;">
                      <div style="font-size: 12px; font-weight: 500; color: rgba(232, 255, 232, 0.5); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Name</div>
                      <div style="font-size: 16px; font-weight: 500; color: #E8FFE8; line-height: 1.4;">${data.firstName} ${data.lastName}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 0 16px 0; vertical-align: top;">
                      <div style="font-size: 12px; font-weight: 500; color: rgba(232, 255, 232, 0.5); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Email</div>
                      <div style="font-size: 16px; font-weight: 500; line-height: 1.4;">
                        <a href="mailto:${data.email}" style="color: #39FF14; text-decoration: none; transition: color 0.2s;">${data.email}</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0; vertical-align: top;">
                      <div style="font-size: 12px; font-weight: 500; color: rgba(232, 255, 232, 0.5); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Date</div>
                      <div style="font-size: 16px; font-weight: 500; color: rgba(232, 255, 232, 0.8); line-height: 1.4;">${new Date().toLocaleString()}</div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            
            <!-- Message -->
            <div>
              <div style="display: inline-block; margin-bottom: 16px;">
                <span style="font-size: 11px; font-weight: 600; color: #39FF14; text-transform: uppercase; letter-spacing: 1px;">Message</span>
              </div>
              <div style="background: rgba(10, 10, 10, 0.6); border: 1px solid rgba(57, 255, 20, 0.1); border-radius: 12px; padding: 24px; backdrop-filter: blur(8px);">
                <div style="white-space: pre-wrap; line-height: 1.8; color: rgba(232, 255, 232, 0.9); font-size: 15px; font-weight: 400;">
                  ${data.message}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Elegant Footer -->
          <div style="padding: 24px 32px; background: rgba(34, 34, 34, 0.2); border-top: 1px solid rgba(57, 255, 20, 0.08);">
            <div style="text-align: center;">
              <p style="margin: 0 0 4px 0; color: rgba(232, 255, 232, 0.4); font-size: 12px; line-height: 1.6;">
                This message was sent from the contact form on your website.
              </p>
              <p style="margin: 0; color: rgba(232, 255, 232, 0.4); font-size: 12px;">
                Reply directly to this email to respond to ${data.firstName}.
              </p>
            </div>
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
  
  // Get site URL for logo (fallback to relative path if env not available)
  const siteUrl = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SITE_URL) || 'https://vpoliteiadis.com';
  const logoUrl = `${siteUrl}/images/vp-logo.webp`;
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Message Received</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #0A0A0A 0%, #0F0F0F 50%, #0A0A0A 100%); background-attachment: fixed;">
      <!-- Background Pattern -->
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.03; background-image: radial-gradient(circle at 20% 50%, rgba(0, 184, 107, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(57, 255, 20, 0.1) 0%, transparent 50%); pointer-events: none; z-index: 0;"></div>
      
      <div style="max-width: 640px; margin: 0 auto; padding: 40px 20px; position: relative; z-index: 1;">
        <!-- Main Container -->
        <div style="background: linear-gradient(180deg, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%); border: 1px solid rgba(0, 184, 107, 0.12); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 184, 107, 0.05);">
          
          <!-- Elegant Header -->
          <div style="position: relative; padding: 40px 32px 32px; background: linear-gradient(180deg, rgba(0, 184, 107, 0.08) 0%, transparent 100%); border-bottom: 1px solid rgba(0, 184, 107, 0.15);">
            <!-- Top Accent Line -->
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent 0%, rgba(0, 184, 107, 0.6) 20%, rgba(57, 255, 20, 0.4) 80%, transparent 100%);"></div>
            
            <!-- Logo and Brand -->
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
              <img src="${logoUrl}" alt="VP Logo" width="32" height="32" style="width: 32px; height: 32px; border-radius: 6px; display: block;" />
              <div>
                <div style="font-size: 14px; font-weight: 500; color: rgba(232, 255, 232, 0.65); letter-spacing: 0.3px;">Vasileios Politeiadis</div>
              </div>
            </div>
            
            <!-- Title -->
            <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #E8FFE8; letter-spacing: -0.8px; line-height: 1.2;">
              Message Received!
            </h1>
            <p style="margin: 0; font-size: 15px; color: rgba(232, 255, 232, 0.6); font-weight: 400; line-height: 1.5;">
              Thank you for reaching out
            </p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 32px;">
            <p style="color: #E8FFE8; font-size: 17px; line-height: 1.7; margin: 0 0 24px 0; font-weight: 500;">
              Hi ${data.firstName},
            </p>
            
            <p style="color: rgba(232, 255, 232, 0.85); font-size: 16px; line-height: 1.8; margin: 0 0 32px 0;">
              Thank you for your message! I've received your contact form submission and will get back to you within 24-48 hours.
            </p>
            
            <!-- Message Preview -->
            <div style="margin-bottom: 32px;">
              <div style="display: inline-block; margin-bottom: 16px;">
                <span style="font-size: 11px; font-weight: 600; color: #00B86B; text-transform: uppercase; letter-spacing: 1px;">Your Message</span>
              </div>
              <div style="background: rgba(34, 34, 34, 0.4); border: 1px solid rgba(0, 184, 107, 0.1); border-radius: 12px; padding: 24px; backdrop-filter: blur(8px);">
                <div style="white-space: pre-wrap; line-height: 1.8; color: rgba(232, 255, 232, 0.8); font-size: 15px; font-weight: 400;">
                  ${data.message}
                </div>
              </div>
            </div>
            
            <p style="color: rgba(232, 255, 232, 0.85); font-size: 16px; line-height: 1.8; margin: 0;">
              If you have any urgent questions, feel free to reach out directly.
            </p>
          </div>
          
          <!-- Elegant Footer -->
          <div style="padding: 24px 32px; background: rgba(34, 34, 34, 0.2); border-top: 1px solid rgba(0, 184, 107, 0.08);">
            <div style="text-align: center;">
              <p style="margin: 0; color: rgba(232, 255, 232, 0.4); font-size: 12px; line-height: 1.6;">
                This is an automated confirmation. Please do not reply to this email.
              </p>
            </div>
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

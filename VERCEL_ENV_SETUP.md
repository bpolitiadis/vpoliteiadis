# 🚀 Vercel Environment Variables Setup

## Required Environment Variables for Contact Form

You need to set these environment variables in your Vercel project settings:

### 1. **RESEND_API_KEY** (Required)
- Get your API key from [Resend Dashboard](https://resend.com/api-keys)
- Format: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2. **FROM_EMAIL** (Required)  
- Must be a verified domain in Resend
- Example: `noreply@vpoliteiadis.com` or `contact@vpoliteiadis.com`

### 3. **CONTACT_EMAIL** (Optional)
- Email address to receive contact form submissions
- Defaults to `FROM_EMAIL` if not set
- Example: `b.politiadis@gmail.com`

## How to Set Environment Variables in Vercel

1. **Via Vercel Dashboard:**
   - Go to your project → Settings → Environment Variables
   - Add each variable for **Production** environment
   - Optionally add for Preview/Development environments

2. **Via Vercel CLI:**
   ```bash
   vercel env add RESEND_API_KEY production
   vercel env add FROM_EMAIL production  
   vercel env add CONTACT_EMAIL production
   ```

## Optional Environment Variables

- `SEND_CONFIRMATION_EMAIL=true` - Send confirmation emails to form submitters
- `RESEND_DEBUG=true` - Enable debug logging for email operations
- `LOG_LEVEL=info` - Set logging level (debug, info, warn, error)

## After Setting Variables

1. **Redeploy your site** - Environment variables only take effect on new deployments
2. **Test the contact form** - Try submitting a test message
3. **Check Vercel logs** - Look for any error messages in the Functions tab

## Troubleshooting

- **500 Error**: Usually means missing `RESEND_API_KEY` or `FROM_EMAIL`
- **No logs visible**: Check that `LOG_LEVEL=info` is set
- **Emails not sending**: Verify your Resend domain is verified and API key is valid

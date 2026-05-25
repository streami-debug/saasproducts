# Cloudflare Email Setup Guide for saasproducts

This guide explains how to configure Cloudflare Email Routing and integrate it with the saasproducts marketplace.

## Overview

The saasproducts marketplace uses **Cloudflare Email Routing** combined with **MailChannels** to send transactional emails:

- **Order confirmations** to customers
- **Admin notifications** for new orders
- **Creator welcome emails**
- **Support and transactional messages**

## Prerequisites

1. Domain: `saasproducts.dpdns.org` (already configured)
2. Cloudflare account with the domain added
3. Cloudflare Pages Functions deployed

## Step 1: Enable Email Routing in Cloudflare

1. Go to **Cloudflare Dashboard** → **saasproducts.dpdns.org**
2. Navigate to **Email** → **Email Routing**
3. Click **Enable Email Routing**
4. Configure catch-all rule:
   - **Catch-all address:** `*@saasproducts.dpdns.org`
   - **Route to:** Your personal email (e.g., `admin@example.com`)

## Step 2: Configure MailChannels Integration

The email service uses **MailChannels API**, which is free and Cloudflare-friendly:

### Enable DKIM for saasproducts.dpdns.org

1. In Cloudflare Email Routing settings, note the **DKIM records** provided
2. Add these DNS records to your Cloudflare DNS settings
3. Verify DKIM is active (usually takes 5-10 minutes)

### MailChannels Setup

The email service automatically uses MailChannels API endpoint:
```
https://api.mailchannels.net/tx/v1/send
```

No additional API key is required if you've set up DKIM properly.

## Step 3: Environment Variables

Add these to your `.env.local` and Cloudflare Pages environment:

```env
# Admin email for order notifications
ADMIN_EMAIL=admin@saasproducts.dpdns.org

# Email sender configuration (optional)
EMAIL_FROM=noreply@saasproducts.dpdns.org
EMAIL_FROM_NAME=saasproducts
```

## Step 4: Test Email Sending

### Local Testing

```bash
# Start development server
npm run dev

# Test email endpoint
curl -X POST http://localhost:3000/api/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<h1>Hello from saasproducts!</h1>"
  }'
```

### Production Testing (Cloudflare Pages)

After deployment, test via:

```bash
curl -X POST https://saasproducts.dpdns.org/api/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email from Production",
    "html": "<h1>Hello from saasproducts production!</h1>"
  }'
```

## Step 5: Email Templates

The following email templates are available in `src/lib/email.ts`:

| Template | Purpose | Trigger |
|----------|---------|---------|
| `orderConfirmationEmail()` | Customer order receipt | After successful checkout |
| `adminOrderNotificationEmail()` | Admin alert for new orders | After successful checkout |
| `creatorWelcomeEmail()` | Welcome new creators | Creator signup |

## Troubleshooting

### Emails not sending

1. **Check DKIM records:** Ensure all DKIM records are added to Cloudflare DNS
2. **Verify sender domain:** Emails must come from `noreply@saasproducts.dpdns.org`
3. **Check MailChannels status:** Visit https://status.mailchannels.net/
4. **Review Cloudflare logs:** Check Pages Function logs for errors

### Emails going to spam

1. **Add SPF record:**
   ```
   v=spf1 include:mailchannels.net ~all
   ```

2. **Add DMARC record:**
   ```
   v=DMARC1; p=none; rua=mailto:admin@saasproducts.dpdns.org
   ```

3. **Verify sender reputation:** Use tools like MXToolbox to check domain reputation

## API Endpoints

### Send Email

**POST** `/api/email/send`

Request:
```json
{
  "to": "customer@example.com",
  "subject": "Your Order Confirmation",
  "html": "<h1>Thank you for your purchase!</h1>",
  "text": "Thank you for your purchase!"
}
```

Response:
```json
{
  "success": true,
  "messageId": "msg_1234567890",
  "message": "Email sent successfully"
}
```

## Advanced Configuration

### Custom Email Domain

To use a custom email domain (e.g., `support@saasproducts.dpdns.org`):

1. Add subdomain to Cloudflare DNS
2. Update `EMAIL_FROM` environment variable
3. Add corresponding DKIM records

### Email Rate Limiting

MailChannels has rate limits:
- **Free tier:** 100 emails/day
- **Upgrade available** for higher limits

Monitor usage in Cloudflare Pages analytics.

### Webhook Notifications

To track email delivery status, configure webhooks in MailChannels dashboard:
- Delivery confirmations
- Bounce notifications
- Complaint handling

## Support

For issues with:
- **Cloudflare Email Routing:** https://support.cloudflare.com/hc/en-us/articles/200172286
- **MailChannels:** https://mailchannels.zendesk.com/
- **saasproducts:** Check `/functions/api/email/` logs in Cloudflare Pages

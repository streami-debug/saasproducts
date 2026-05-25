/**
 * Email service for sending transactional emails via Cloudflare Email Routing
 * Supports order confirmations, admin notifications, and welcome emails
 */

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email via Cloudflare Email Routing or local SMTP fallback
 */
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // For Cloudflare Pages Functions, use fetch to a mail service
    // Or configure Email Routing to forward to your domain
    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: payload.to }],
            dkim_domain: 'saasproducts.dpdns.org'
          }
        ],
        from: {
          email: 'noreply@saasproducts.dpdns.org',
          name: 'saasproducts'
        },
        subject: payload.subject,
        content: [
          {
            type: 'text/html',
            value: payload.html
          },
          {
            type: 'text/plain',
            value: payload.text || stripHtml(payload.html)
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Email send failed:', error);
      return { success: false, error: `Email service error: ${response.status}` };
    }

    return { success: true, messageId: `msg_${Date.now()}` };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send order confirmation email to customer
 */
export function orderConfirmationEmail(customerEmail: string, orderData: {
  orderId: string;
  productTitle: string;
  productPrice: number;
  downloadUrl?: string;
}): EmailPayload {
  return {
    to: customerEmail,
    subject: `Order Confirmation: ${orderData.productTitle}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #0ea5e9;">Order Confirmed!</h1>
        <p>Thank you for your purchase. Here are your order details:</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Order ID:</strong> ${orderData.orderId}</p>
          <p><strong>Product:</strong> ${orderData.productTitle}</p>
          <p><strong>Amount:</strong> $${orderData.productPrice.toFixed(2)}</p>
        </div>
        
        ${orderData.downloadUrl ? `
          <p style="margin: 20px 0;">
            <a href="${orderData.downloadUrl}" style="background: #0ea5e9; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">
              Download Your Product
            </a>
          </p>
        ` : ''}
        
        <p style="color: #64748b; font-size: 14px; margin-top: 40px;">
          If you have any questions, reply to this email or visit our support page.
        </p>
        
        <p style="color: #94a3b8; font-size: 12px;">
          © 2026 saasproducts. All rights reserved.
        </p>
      </div>
    `,
    text: `Order Confirmation\n\nOrder ID: ${orderData.orderId}\nProduct: ${orderData.productTitle}\nAmount: $${orderData.productPrice.toFixed(2)}`
  };
}

/**
 * Send admin notification email for new orders
 */
export function adminOrderNotificationEmail(adminEmail: string, orderData: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  productTitle: string;
  productPrice: number;
  createdAt: string;
}): EmailPayload {
  return {
    to: adminEmail,
    subject: `[saasproducts] New Order: ${orderData.productTitle}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #0ea5e9;">New Order Received</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Order ID:</strong> ${orderData.orderId}</p>
          <p><strong>Customer:</strong> ${orderData.customerName} (${orderData.customerEmail})</p>
          <p><strong>Product:</strong> ${orderData.productTitle}</p>
          <p><strong>Amount:</strong> $${orderData.productPrice.toFixed(2)}</p>
          <p><strong>Timestamp:</strong> ${orderData.createdAt}</p>
        </div>
        
        <p>
          <a href="https://saasproducts.dpdns.org/admin" style="background: #0ea5e9; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">
            View in Admin Panel
          </a>
        </p>
      </div>
    `,
    text: `New Order\n\nOrder ID: ${orderData.orderId}\nCustomer: ${orderData.customerName}\nProduct: ${orderData.productTitle}\nAmount: $${orderData.productPrice.toFixed(2)}`
  };
}

/**
 * Send welcome email to new creators
 */
export function creatorWelcomeEmail(creatorEmail: string, creatorName: string): EmailPayload {
  return {
    to: creatorEmail,
    subject: 'Welcome to saasproducts Creator Program',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #0ea5e9;">Welcome, ${creatorName}! 🎉</h1>
        
        <p>You're now part of the saasproducts creator community. Here's what you can do:</p>
        
        <ul style="line-height: 1.8;">
          <li>Upload and sell your digital products</li>
          <li>Track real-time sales and earnings</li>
          <li>Access creator analytics and insights</li>
          <li>Connect with thousands of buyers</li>
        </ul>
        
        <p style="margin: 30px 0;">
          <a href="https://saasproducts.dpdns.org/dashboard/creator" style="background: #0ea5e9; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">
            Go to Creator Dashboard
          </a>
        </p>
        
        <p style="color: #64748b; font-size: 14px;">
          Questions? Check out our <a href="https://saasproducts.dpdns.org/docs" style="color: #0ea5e9;">creator documentation</a>.
        </p>
      </div>
    `,
    text: `Welcome to saasproducts!\n\nYou can now upload and sell your digital products. Visit your creator dashboard to get started.`
  };
}

/**
 * Utility: Strip HTML tags from text
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

import { sendEmail, orderConfirmationEmail, adminOrderNotificationEmail } from '../../../src/lib/email';

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const body = (await request.json().catch(() => ({}))) as { orderID?: string; customerEmail?: string; productTitle?: string; productPrice?: number };

  if (!body.orderID) {
    return Response.json({ error: 'orderID is required.' }, { status: 400 });
  }

  try {
    // Send order confirmation email to customer
    if (body.customerEmail && body.productTitle && body.productPrice) {
      const confirmationResult = await sendEmail(
        orderConfirmationEmail(body.customerEmail, {
          orderId: body.orderID,
          productTitle: body.productTitle,
          productPrice: body.productPrice
        })
      );

      if (!confirmationResult.success) {
        console.warn('Failed to send customer confirmation email:', confirmationResult.error);
      }

      // Send admin notification
      const adminResult = await sendEmail(
        adminOrderNotificationEmail(process.env.ADMIN_EMAIL || 'admin@saasproducts.dpdns.org', {
          orderId: body.orderID,
          customerName: 'Customer',
          customerEmail: body.customerEmail,
          productTitle: body.productTitle,
          productPrice: body.productPrice,
          createdAt: new Date().toISOString()
        })
      );

      if (!adminResult.success) {
        console.warn('Failed to send admin notification:', adminResult.error);
      }
    }

    return Response.json({ 
      success: true, 
      url: '/dashboard/user?checkout=success',
      message: 'Order captured successfully. Confirmation email sent.'
    });
  } catch (error) {
    console.error('Checkout capture error:', error);
    return Response.json({ 
      error: 'Failed to process order capture',
      details: String(error)
    }, { status: 500 });
  }
};

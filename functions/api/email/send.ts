import { sendEmail } from '../../../src/lib/email';

/**
 * Cloudflare Pages Function for sending emails
 * POST /api/email/send
 * 
 * Body: {
 *   to: string;
 *   subject: string;
 *   html: string;
 *   text?: string;
 * }
 */
export const onRequestPost: PagesFunction = async ({ request, env }) => {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await request.json() as { to?: string; subject?: string; html?: string; text?: string };

    // Validate required fields
    if (!body.to || !body.subject || !body.html) {
      return Response.json(
        { error: 'Missing required fields: to, subject, html' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.to)) {
      return Response.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email
    const result = await sendEmail({
      to: body.to,
      subject: body.subject,
      html: body.html,
      text: body.text
    });

    if (!result.success) {
      return Response.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      messageId: result.messageId,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Email API error:', error);
    return Response.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
};

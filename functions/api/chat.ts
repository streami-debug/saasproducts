/**
 * AI Chat API endpoint for Cloudflare Pages
 * POST /api/chat
 * 
 * Provides intelligent responses using OpenAI with product knowledge context
 */

import { PRODUCT_CATALOG } from '../../src/lib/catalog';

interface ChatRequest {
  message?: string;
  conversationHistory?: Array<{ role: string; content: string }>;
}

/**
 * Generate product knowledge context for the AI
 */
function getProductContext(): string {
  const products = PRODUCT_CATALOG.map(
    (p) =>
      `- ${p.title} ($${p.price}): ${p.description} Category: ${p.category}. Features: ${p.features.join(', ')}`
  ).join('\n');

  return `You are a helpful AI assistant for saasproducts, a marketplace for digital products and SaaS templates.

AVAILABLE PRODUCTS:
${products}

Your role is to:
1. Help customers find the right product for their needs
2. Answer questions about product features, pricing, and compatibility
3. Provide recommendations based on customer requirements
4. Be friendly, professional, and concise
5. Encourage customers to browse the marketplace or check out specific products

Always be helpful and try to guide customers toward making a purchase.`;
}

/**
 * Call OpenAI API with product context
 */
async function callOpenAI(
  messages: Array<{ role: string; content: string }>,
  systemPrompt: string
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return 'Sorry, the AI service is currently unavailable. Please try again later or contact support.';
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          ...messages.map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content
          }))
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return 'Sorry, I encountered an error processing your request. Please try again.';
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    return data.choices[0]?.message?.content || 'I could not generate a response. Please try again.';
  } catch (error) {
    console.error('Chat API error:', error);
    return 'Sorry, an error occurred. Please try again later.';
  }
}

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const body = (await request.json().catch(() => ({}))) as ChatRequest;
    const userMessage = body.message || '';
    const history = body.conversationHistory || [];

    if (!userMessage.trim()) {
      return Response.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    // Build conversation messages
    const messages = [
      ...history,
      {
        role: 'user',
        content: userMessage
      }
    ];

    // Get product context and call AI
    const systemPrompt = getProductContext();
    const reply = await callOpenAI(messages, systemPrompt);

    // Extract product recommendations if mentioned
    const recommendedProducts = PRODUCT_CATALOG.filter((p) =>
      reply.toLowerCase().includes(p.title.toLowerCase())
    ).map((p) => p.id);

    return Response.json({
      success: true,
      reply,
      recommendedProducts: recommendedProducts.length > 0 ? recommendedProducts : undefined
    });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return Response.json(
      {
        error: 'Failed to process chat request',
        details: String(error)
      },
      { status: 500 }
    );
  }
};

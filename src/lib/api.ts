import type { AdminOverview } from './catalog';
import type { Template } from '@/types';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  templates(params: { category?: string; search?: string; minPrice?: number; maxPrice?: number } = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== 'all') query.set(key, String(value));
    });
    return request<{ templates: Template[]; total: number }>(`/api/templates?${query.toString()}`);
  },
  template(id: string) {
    return request<Template>(`/api/templates/${encodeURIComponent(id)}`);
  },
  adminOverview() {
    return request<AdminOverview>('/api/admin/overview');
  },
  health() {
    return request<{ ok: boolean; service: string; timestamp: string }>('/api/health');
  },
  createCheckoutOrder(templateId: string) {
    return request<{ id: string; status: string }>('/api/checkout/paypal', {
      method: 'POST',
      body: JSON.stringify({ templateId })
    });
  },
  captureCheckout(orderID?: string) {
    return request<{ success: boolean; url: string }>('/api/checkout/capture', {
      method: 'POST',
      body: JSON.stringify({ orderID })
    });
  }
};

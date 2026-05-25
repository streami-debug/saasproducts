export interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'chatgpt' | 'claude' | 'midjourney' | 'cursor' | 'coding' | 'saas' | 'automation' | 'marketing' | string;
  tier: 'basic' | 'bundle' | 'premium';
  tags: string[];
  rating: number;
  reviewCount: number;
  downloadCount: number;
  creatorId: string;
  creatorName: string;
  features: string[];
  compatibility: string[];
  createdAt: string;
  previewUrl?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: 'user' | 'creator' | 'admin';
  subscriptionTier: 'free' | 'premium';
  createdAt: string;
}

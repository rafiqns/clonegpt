export interface User {
  id: string;
  email: string;
  subscription_tier: 'free' | 'pro' | 'enterprise';
}

export interface Chat {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  model: string;
}

export interface Message {
  id: string;
  chat_id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  stripe_price_id: string;
}
import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    
    if (data.user) {
      set({ 
        user: {
          id: data.user.id,
          email: data.user.email!,
          subscription_tier: 'free'
        }
      });
    }
  },
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          subscription_tier: 'free'
        }
      }
    });
    if (error) throw error;
    
    // Auto sign in after signup
    if (data.user) {
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      set({ 
        user: {
          id: data.user.id,
          email: data.user.email!,
          subscription_tier: 'free'
        }
      });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
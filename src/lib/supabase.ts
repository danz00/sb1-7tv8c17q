import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Substitua estas configurações pelas do seu PostgreSQL local
const supabaseUrl = 'http://localhost:5432';  // ou sua porta PostgreSQL
const supabaseAnonKey = 'seu_token_local';    // configure autenticação apropriada

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Database configuration is required');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
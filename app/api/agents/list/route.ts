import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Public-safe agent projection: system_prompt is intentionally stripped.
export type PublicAgent = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string | null;
  icon: string;
  color_theme: string;
  welcome_message: string | null;
  suggested_prompts: string[];
  is_featured: boolean;
  sort_order: number;
};

export async function GET() {
  const { data, error } = await supabase
    .from('agents')
    .select('id, slug, name, description, category, icon, color_theme, welcome_message, suggested_prompts, is_featured, sort_order')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('[agents/list] Supabase error:', error.message);
    return NextResponse.json(
      { error: `Failed to load agents: ${error.message}` },
      { status: 500 },
    );
  }

  const agents: PublicAgent[] = (data ?? []).map((a) => ({
    id: a.id,
    slug: a.slug,
    name: a.name,
    description: a.description,
    category: a.category,
    icon: a.icon,
    color_theme: a.color_theme,
    welcome_message: a.welcome_message,
    suggested_prompts: a.suggested_prompts ?? [],
    is_featured: a.is_featured,
    sort_order: a.sort_order,
  }));

  return NextResponse.json({ agents });
}

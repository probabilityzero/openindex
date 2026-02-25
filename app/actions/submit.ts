'use server';

import { getAdminSupabase } from '@/lib/supabase';

// Simple UUID v4 generator
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export async function submitWork(data: {
  title: string;
  original_title: string;
  type: string;
  year: number;
  summary: string;
  url: string;
  resource_type: string;
  language: string;
}) {
  try {
    const admin = getAdminSupabase();

    // Create work
    const { data: work, error: workError } = await admin
      .from('works')
      .insert({
        id: generateUUID(),
        title: data.title,
        original_title: data.original_title || null,
        type: data.type,
        year: data.year,
        summary: data.summary,
        cover_url: null,
      })
      .select()
      .single();

    if (workError) {
      console.error('Work insert error:', workError);
      return { success: false, error: 'Failed to create work' };
    }

    // Create resource if URL provided
    if (data.url && work) {
      const { error: resourceError } = await admin
        .from('resources')
        .insert({
          id: generateUUID(),
          work_id: work.id,
          type: data.resource_type,
          version_label: null,
          language: data.language,
          format: null,
          platform: null,
          locator: data.url,
          size_bytes: null,
          source: 'user_submission',
        });

      if (resourceError) {
        console.error('Resource insert error:', resourceError);
        // Work was created, so don't fail entirely
      }
    }

    return { success: true };
  } catch (err) {
    console.error('Submit error:', err);
    return { success: false, error: 'An error occurred' };
  }
}

import { supabase } from './supabase';
import localTags from '@/data/tags';

export async function searchWorks(query: string, limit = 20, offset = 0) {
  const { data, error } = await supabase
    .from('works')
    .select('id, type, title, year, summary, cover_url')
    .ilike('title', `%${query}%`)
    .order('year', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export async function getWorksByType(type: string, limit = 50, offset = 0) {
  const { data, error } = await supabase
    .from('works')
    .select('id, type, title, year, summary, cover_url')
    .eq('type', type)
    .order('year', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export async function getWorkById(id: string) {
  const { data, error } = await supabase
    .from('works')
    .select(`
      id, type, title, original_title, year, summary, cover_url, created_at,
      work_people (person_id, role, people (id, name)),
      work_tags (tag_id),
      external_ids (id, source, external_key, url)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getWorkResources(workId: string, limit = 20, offset = 0) {
  const { data, error } = await supabase
    .from('resources')
    .select('id, type, version_label, language, format, platform, locator, size_bytes, source')
    .eq('work_id', workId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export async function getTrendingWorks(limit = 10) {
  const { data, error } = await supabase
    .from('works')
    .select('id, type, title, year, summary, cover_url')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getPerson(id: string) {
  const { data, error } = await supabase
    .from('people')
    .select(`
      id, name,
      work_people (role, works (id, title, year, type))
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getTag(id: string) {
  // Read tags from local data file instead of DB
  const tag = localTags.find(t => t.id === id) || null;
  return tag;
}

export async function getWorksByTag(tagId: string, limit = 50, offset = 0) {
  // Try to use work_tags join if available, otherwise fallback to text search
  try {
    const { data, error } = await supabase
      .from('work_tags')
      .select('works (id, type, title, year, summary, cover_url)')
      .eq('tag_id', tagId)
      .range(offset, offset + limit - 1);

    if (!error && data) return data.map((item: any) => item.works);
  } catch (e) {
    // ignore and fallback
  }

  // Fallback: use local tag name and do a lightweight text search on works
  const tag = localTags.find(t => t.id === tagId);
  const name = tag?.name || '';
  if (!name) return [];

  const pattern = `%${name}%`;
  const { data, error } = await supabase
    .from('works')
    .select('id, type, title, year, summary, cover_url')
    .or(`title.ilike.${pattern},summary.ilike.${pattern}`)
    .order('year', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export async function getAllTags() {
  // Return local tags list (sorted by name)
  return localTags.slice().sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAllPeople() {
  const { data, error } = await supabase
    .from('people')
    .select('id, name')
    .order('name');

  if (error) throw error;
  return data;
}

import Link from 'next/link';
import { getAllTags } from '@/lib/queries';

export const revalidate = 86400; // revalidate daily

export default async function TagsPage() {
  let tags = [];
  try {
    tags = await getAllTags();
  } catch (err) {
    console.error(err);
  }

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#8ab4f8', fontSize: '12px' }}>← home</Link>
      </header>

      <h1 style={{ fontSize: '24px', marginBottom: '2rem' }}>Tags</h1>

      {tags.length > 0 ? (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {tags.map((tag: any) => (
            <Link key={tag.id} href={`/tag/${tag.id}`} style={{ color: '#8ab4f8' }}>
              {tag.name}
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ color: '#999' }}>No tags found.</div>
      )}
    </main>
  );
}

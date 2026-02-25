import Link from 'next/link';
import { getWorksByType } from '@/lib/queries';

export const revalidate = 86400; // revalidate daily

const categoryLabels: Record<string, string> = {
  film: 'Films',
  music: 'Music',
  software: 'Software',
  game: 'Games',
  book: 'Books',
  asset: 'Assets',
};

export default async function BrowsePage({ params, searchParams }: { params: Promise<{ type: string }>; searchParams: Promise<{ page?: string }> }) {
  const { type } = await params;
  const { page = '1' } = await searchParams;
  const pageNum = parseInt(page) || 1;
  const limit = 50;
  const offset = (pageNum - 1) * limit;

  let works = [];
  try {
    works = await getWorksByType(type, limit, offset);
  } catch (err) {
    console.error(err);
  }

  const label = categoryLabels[type] || type;

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#8ab4f8', fontSize: '12px' }}>← home</Link>
      </header>

      <h1 style={{ fontSize: '24px', marginBottom: '2rem' }}>{label}</h1>

      {works.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {works.map((work: any) => (
                <tr key={work.id}>
                  <td>
                    <Link href={`/work/${work.id}`} style={{ color: '#8ab4f8' }}>
                      {work.title}
                    </Link>
                  </td>
                  <td style={{ color: '#999', fontSize: '12px', width: '80px' }}>{work.year}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {works.length === limit && (
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', fontSize: '12px' }}>
              {pageNum > 1 && (
                <Link href={`/browse/${type}?page=${pageNum - 1}`} style={{ color: '#8ab4f8' }}>
                  ← previous
                </Link>
              )}
              <Link href={`/browse/${type}?page=${pageNum + 1}`} style={{ color: '#8ab4f8' }}>
                next →
              </Link>
            </div>
          )}
        </>
      ) : (
        <div style={{ color: '#999' }}>No {label.toLowerCase()} found.</div>
      )}
    </main>
  );
}

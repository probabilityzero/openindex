import Link from 'next/link';
import { getTag, getWorksByTag } from '@/lib/queries';
import { notFound } from 'next/navigation';

export const revalidate = 86400; // revalidate daily

export default async function TagPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ page?: string }> }) {
  const { id } = await params;
  const { page = '1' } = await searchParams;
  const pageNum = parseInt(page) || 1;
  const limit = 50;
  const offset = (pageNum - 1) * limit;

  let tag;
  let works = [];

  try {
    tag = await getTag(id);
    if (!tag) notFound();
    works = await getWorksByTag(id, limit, offset);
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#8ab4f8', fontSize: '12px' }}>← home</Link>
      </header>

      <h1 style={{ fontSize: '24px', marginBottom: '2rem' }}>Tag: {tag.name}</h1>

      {works.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {works.map((work: any) => (
                <tr key={work?.id}>
                  <td>
                    <Link href={`/work/${work?.id}`} style={{ color: '#8ab4f8' }}>
                      {work?.title}
                    </Link>
                  </td>
                  <td style={{ color: '#999', fontSize: '12px' }}>{work?.type}</td>
                  <td style={{ color: '#999', fontSize: '12px' }}>{work?.year}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {works.length === limit && (
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', fontSize: '12px' }}>
              {pageNum > 1 && (
                <Link href={`/tag/${id}?page=${pageNum - 1}`} style={{ color: '#8ab4f8' }}>
                  ← previous
                </Link>
              )}
              <Link href={`/tag/${id}?page=${pageNum + 1}`} style={{ color: '#8ab4f8' }}>
                next →
              </Link>
            </div>
          )}
        </>
      ) : (
        <div style={{ color: '#999' }}>No works tagged with this.</div>
      )}
    </main>
  );
}

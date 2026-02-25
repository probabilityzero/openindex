import Link from 'next/link';
import { searchWorks } from '@/lib/queries';
import { SearchBox } from '@/components/search-box';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const { q = '', page = '1' } = await searchParams;
  const pageNum = parseInt(page) || 1;
  const limit = 20;
  const offset = (pageNum - 1) * limit;

  let results = [];
  let error = null;

  if (q.trim()) {
    try {
      results = await searchWorks(q, limit, offset);
    } catch (err) {
      error = 'Search failed';
      console.error(err);
    }
  }

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#8ab4f8', fontSize: '12px' }}>← back</Link>
      </header>

      <SearchBox />

      {error && (
        <div style={{ color: '#ff6b6b', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {q.trim() && (
        <div style={{ marginBottom: '1rem', color: '#999', fontSize: '12px' }}>
          Results for: <strong>{q}</strong>
        </div>
      )}

      {results.length > 0 ? (
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
              {results.map((work: any) => (
                <tr key={work.id}>
                  <td>
                    <Link href={`/work/${work.id}`} style={{ color: '#8ab4f8' }}>
                      {work.title}
                    </Link>
                  </td>
                  <td style={{ color: '#999', fontSize: '12px' }}>{work.type}</td>
                  <td style={{ color: '#999', fontSize: '12px' }}>{work.year}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {results.length === limit && (
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', fontSize: '12px' }}>
              {pageNum > 1 && (
                <Link href={`/search?q=${encodeURIComponent(q)}&page=${pageNum - 1}`} style={{ color: '#8ab4f8' }}>
                  ← previous
                </Link>
              )}
              <Link href={`/search?q=${encodeURIComponent(q)}&page=${pageNum + 1}`} style={{ color: '#8ab4f8' }}>
                next →
              </Link>
            </div>
          )}
        </>
      ) : (
        q.trim() && (
          <div style={{ color: '#999', marginTop: '2rem' }}>
            No results found for "{q}"
          </div>
        )
      )}
    </main>
  );
}

import Link from 'next/link';
import { getWorkById, getWorkResources } from '@/lib/queries';
import { notFound } from 'next/navigation';

export const revalidate = 86400; // revalidate daily (ISR)

export default async function WorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let work;
  let resources = [];

  try {
    work = await getWorkById(id);
    if (!work) notFound();
    resources = await getWorkResources(id);
  } catch (err) {
    console.error(err);
    notFound();
  }

  const creators = work.work_people || [];
  const tags = work.work_tags || [];
  const externalIds = work.external_ids || [];

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#8ab4f8', fontSize: '12px' }}>← home</Link>
      </header>

      <article>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '0.25rem' }}>
            {work.title}
          </h1>
          {work.original_title && work.original_title !== work.title && (
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '1rem' }}>
              {work.original_title}
            </div>
          )}
        </div>

        {work.summary && (
          <div style={{ marginBottom: '2rem', lineHeight: '1.6', color: '#ccc' }}>
            {work.summary}
          </div>
        )}

        <table style={{ marginBottom: '2rem', width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '120px', fontWeight: '600', paddingRight: '1rem', verticalAlign: 'top' }}>Type</td>
              <td>{work.type}</td>
            </tr>
            {work.year && (
              <tr>
                <td style={{ fontWeight: '600', paddingRight: '1rem', verticalAlign: 'top' }}>Year</td>
                <td>{work.year}</td>
              </tr>
            )}
            {creators.length > 0 && (
              <tr>
                <td style={{ fontWeight: '600', paddingRight: '1rem', verticalAlign: 'top' }}>Creators</td>
                <td>
                  {creators.map((cp: any, i: number) => (
                    <div key={i}>
                      <Link href={`/person/${cp.people?.id}`} style={{ color: '#8ab4f8' }}>
                        {cp.people?.name}
                      </Link>
                      {cp.role && <span style={{ color: '#999', marginLeft: '0.5rem' }}>({cp.role})</span>}
                    </div>
                  ))}
                </td>
              </tr>
            )}
            {tags.length > 0 && (
              <tr>
                <td style={{ fontWeight: '600', paddingRight: '1rem', verticalAlign: 'top' }}>Tags</td>
                <td style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {tags.map((t: any) => (
                    <Link key={t.tag_id} href={`/tag/${t.tag_id}`} style={{ color: '#8ab4f8' }}>
                      {t.tags?.name}
                    </Link>
                  ))}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {externalIds.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3>External IDs</h3>
            <table>
              <tbody>
                {externalIds.map((ext: any) => (
                  <tr key={ext.id}>
                    <td style={{ fontWeight: '600', width: '100px' }}>{ext.source}</td>
                    <td>
                      {ext.url ? (
                        <a href={ext.url} target="_blank" rel="noopener noreferrer" style={{ color: '#8ab4f8' }}>
                          {ext.external_key}
                        </a>
                      ) : (
                        ext.external_key
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {resources.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '16px', marginBottom: '1rem' }}>Resources ({resources.length})</h2>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Format</th>
                  <th>Language</th>
                  <th>Source</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {resources.slice(0, 20).map((res: any) => (
                  <tr key={res.id}>
                    <td style={{ fontSize: '12px' }}>{res.type}</td>
                    <td style={{ fontSize: '12px', color: '#999' }}>{res.format}</td>
                    <td style={{ fontSize: '12px', color: '#999' }}>{res.language}</td>
                    <td style={{ fontSize: '12px', color: '#999' }}>{res.source}</td>
                    <td>
                      {res.locator && (
                        <a href={res.locator} target="_blank" rel="noopener noreferrer" style={{ color: '#8ab4f8', fontSize: '12px' }}>
                          link
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {resources.length > 20 && (
              <div style={{ marginTop: '1rem', fontSize: '12px', color: '#999' }}>
                ... and {resources.length - 20} more resources
              </div>
            )}
          </div>
        )}
      </article>

      <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #333', fontSize: '11px', color: '#666' }}>
        <div>
          Created: {new Date(work.created_at).toLocaleDateString()}
        </div>
      </footer>
    </main>
  );
}

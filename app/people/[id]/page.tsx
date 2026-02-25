import Link from 'next/link';
import { getPerson } from '@/lib/queries';
import { notFound } from 'next/navigation';

export const revalidate = 86400; // revalidate daily

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let person;
  try {
    person = await getPerson(id);
    if (!person) notFound();
  } catch (err) {
    console.error(err);
    notFound();
  }

  const works = person.work_people || [];

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#8ab4f8', fontSize: '12px' }}>← home</Link>
      </header>

      <h1 style={{ fontSize: '24px', marginBottom: '2rem' }}>{person.name}</h1>

      {works.length > 0 && (
        <div>
          <h2 style={{ fontSize: '16px', marginBottom: '1rem' }}>Works ({works.length})</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Role</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {works.map((wp: any) => (
                <tr key={wp.works?.id}>
                  <td>
                    <Link href={`/work/${wp.works?.id}`} style={{ color: '#8ab4f8' }}>
                      {wp.works?.title}
                    </Link>
                  </td>
                  <td style={{ color: '#999', fontSize: '12px' }}>{wp.works?.year}</td>
                  <td style={{ color: '#999', fontSize: '12px' }}>{wp.role}</td>
                  <td style={{ color: '#999', fontSize: '12px' }}>{wp.works?.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {works.length === 0 && (
        <div style={{ color: '#999' }}>No works associated.</div>
      )}
    </main>
  );
}

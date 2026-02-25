import Link from 'next/link';
import { getAllPeople } from '@/lib/queries';

export const revalidate = 86400; // revalidate daily

export default async function PeoplePage() {
  let people = [];
  try {
    people = await getAllPeople();
  } catch (err) {
    console.error(err);
  }

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#8ab4f8', fontSize: '12px' }}>← home</Link>
      </header>

      <h1 style={{ fontSize: '24px', marginBottom: '2rem' }}>People</h1>

      {people.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {people.map((person: any) => (
            <div key={person.id}>
              <Link href={`/person/${person.id}`} style={{ color: '#8ab4f8' }}>
                {person.name}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: '#999' }}>No people found.</div>
      )}
    </main>
  );
}

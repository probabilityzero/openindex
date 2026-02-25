import Link from 'next/link';
import { SearchBox } from '@/components/search-box';

export const revalidate = 3600; // revalidate hourly

export default function Home() {
  const categories = [
    { type: 'film', label: 'Films' },
    { type: 'music', label: 'Music' },
    { type: 'software', label: 'Software' },
    { type: 'game', label: 'Games' },
    { type: 'book', label: 'Books' },
    { type: 'asset', label: 'Assets' },
  ];

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '0.5rem' }}>OPEN INDEX</h1>
        <p style={{ color: '#999', fontSize: '12px' }}>A repository of works, resources, and metadata</p>
      </header>

      <section style={{ marginBottom: '3rem' }}>
        <SearchBox />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '14px', marginBottom: '1rem', fontWeight: 'normal' }}>Categories:</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <Link key={cat.type} href={`/browse/${cat.type}`} style={{ color: '#8ab4f8' }}>
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '14px', marginBottom: '1rem', fontWeight: 'normal' }}>Pages:</h2>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/people" style={{ color: '#8ab4f8' }}>People</Link>
          <Link href="/tags" style={{ color: '#8ab4f8' }}>Tags</Link>
          <Link href="/submit" style={{ color: '#8ab4f8' }}>Submit</Link>
          <Link href="/about" style={{ color: '#8ab4f8' }}>About</Link>
        </div>
      </section>
    </main>
  );
}

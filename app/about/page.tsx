import Link from 'next/link';

export default function AboutPage() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#8ab4f8', fontSize: '12px' }}>← home</Link>
      </header>

      <h1 style={{ fontSize: '24px', marginBottom: '2rem' }}>About</h1>

      <section style={{ maxWidth: '600px', lineHeight: '1.7', color: '#ccc' }}>
        <h2 style={{ fontSize: '16px', marginTop: '2rem', marginBottom: '1rem' }}>What is this?</h2>
        <p>
          A catalog of works, resources, and metadata. Built on static generation, Postgres full-text search, and minimal compute.
        </p>

        <h2 style={{ fontSize: '16px', marginTop: '2rem', marginBottom: '1rem' }}>Philosophy</h2>
        <p>
          This catalog prioritizes longevity, efficiency, and accessibility over trendy features. No tracking. No ads. No bloat. Fast pages. Durable infrastructure.
        </p>

        <h2 style={{ fontSize: '16px', marginTop: '2rem', marginBottom: '1rem' }}>How it works</h2>
        <p>
          Works are pre-rendered daily (ISR). Search queries hit Postgres directly. Resources are stored as metadata, not files. Everything is text-first.
        </p>

        <h2 style={{ fontSize: '16px', marginTop: '2rem', marginBottom: '1rem' }}>Contributing</h2>
        <p>
          <Link href="/submit" style={{ color: '#8ab4f8' }}>Submit a work</Link> to expand the catalog. All submissions are reviewed before publication.
        </p>

        <h2 style={{ fontSize: '16px', marginTop: '2rem', marginBottom: '1rem' }}>Technical</h2>
        <p>
          Next.js 16 (App Router) + Supabase Postgres + Vercel Edge. ~13KB CSS. System fonts only. No external frameworks.
        </p>
      </section>
    </main>
  );
}

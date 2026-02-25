import Link from 'next/link';
import { SubmitForm } from '@/components/submit-form';

export default function SubmitPage() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#8ab4f8', fontSize: '12px' }}>← home</Link>
      </header>

      <h1 style={{ fontSize: '24px', marginBottom: '2rem' }}>Submit a Work</h1>

      <p style={{ marginBottom: '2rem', color: '#ccc', lineHeight: '1.6' }}>
        Help expand the catalog by submitting a new work or resource. Fill in the details below.
      </p>

      <SubmitForm />
    </main>
  );
}

import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="max-w-225 mx-auto py-8 px-4">
      <header className="mb-8">
        <Link href="/" className="text-sky-400 text-xs">← home</Link>
      </header>

      <h1 className="text-2xl mb-8">About</h1>

      <section className="max-w-150 leading-7 text-neutral-400">
        <h2 className="text-base mt-8 mb-4">What is this?</h2>
        <p>
          A catalog of works, resources, and metadata. Built with static pages, lightweight search, and minimal infrastructure.
        </p>

        <h2 className="text-base mt-8 mb-4">Philosophy</h2>
        <p>
          This catalog prioritizes longevity, efficiency, and accessibility over trendy features. No tracking. No ads. No bloat. Fast pages and durable infrastructure.
        </p>

        <h2 className="text-base mt-8 mb-4">How it works</h2>
        <p>
          Works are pre-rendered; search queries hit the backend directly. Resources are stored as metadata and presented text‑first.
        </p>

        <h2 className="text-base mt-8 mb-4">Contributing</h2>
        <p>
          <Link href="/submit" className="text-sky-400 hover:underline">Submit a work</Link> to expand the catalog. Submissions are reviewed before publication.
        </p>
      </section>
    </main>
  )
}

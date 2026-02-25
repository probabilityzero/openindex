import Link from 'next/link'
import { SearchBox } from '@/components/search-box'

export default function Home() {
  const categories = [
    { type: 'film', label: 'Films' },
    { type: 'music', label: 'Music' },
    { type: 'software', label: 'Software' },
    { type: 'game', label: 'Games' },
    { type: 'book', label: 'Books' },
    { type: 'asset', label: 'Assets' },
  ]

  return (
    <main className="max-w-[900px] mx-auto py-8 px-4">
      <header className="mb-12">
        <h1 className="text-[28px] mb-2">OPEN INDEX</h1>
        <p className="text-xs">A repository of works, resources, and metadata</p>
      </header>

      <section className="mb-12">
        <SearchBox />
      </section>

      <section className="mb-12">
        <h2 className="text-sm mb-4 font-normal">Categories:</h2>
        <div className="flex gap-4 flex-wrap">
          {categories.map(cat => (
            <Link key={cat.type} href={`/browse/${cat.type}`} className="text-sky-400 hover:underline">
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm mb-4 font-normal">Pages:</h2>
        <div className="flex gap-6 flex-wrap">
          <Link href="/people" className="text-sky-400 hover:underline">People</Link>
          <Link href="/tags" className="text-sky-400 hover:underline">Tags</Link>
          <Link href="/submit" className="text-sky-400 hover:underline">Submit</Link>
          <Link href="/about" className="text-sky-400 hover:underline">About</Link>
        </div>
      </section>
    </main>
  )
}

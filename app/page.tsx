import Link from 'next/link'
import { SearchBox } from '@/components/search-box'
import categories from '@/data/categories'

export default function Home() {
  
    return (
      <main className="max-w-225 mx-auto py-8 px-4">
        <header className="mb-12 justify-center text-center gap-2">
            <img
              src="
              https://static.vecteezy.com/system/resources/thumbnails/051/333/644/small_2x/antique-world-map-with-weathered-edges-vintage-style-cartography-artwork-depicting-continents-and-oceans-in-a-sepia-toned-aged-appearance-png.png
              "
              alt="Treasure map"
              className="w-auto h-30 mx-auto"
            />
            <h1 className="text-[28px] mb-2">openmap.org</h1>
            <p className="text-xs">A repository of works, resources, and metadata</p>
        </header>
  
        <section className="mb-12">
          <SearchBox />
        </section>
  
        <section className="mb-12">
          <h2 className="text-xs mb-4 font-medium">Browse</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3">
            {categories.map(cat => (
              <div key={cat.type} className="space-y-1">
                <Link href={`/browse/${cat.type}`} className="text-sky-400 font-medium hover:underline">
                  {cat.label}
                </Link>
                {cat.sub && (
                  <div className="text-[12px] text-neutral-500 flex flex-wrap gap-2">
                    {cat.sub.map(s => (
                      <Link key={s.id} href={`/browse/${cat.type}/${s.id}`} className="hover:underline">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
  
      </main>
    )
}

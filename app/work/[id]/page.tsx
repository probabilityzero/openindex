import Link from 'next/link'
import { getWorkById, getWorkResources, getWorksByTag } from '@/lib/workSearch'
import localTags from '@/data/tags'
import WorkTabs from '@/components/work-tabs'

export const revalidate = 604800

export default async function WorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let work: any = null
  let resources: any[] = []
  let related: any[] = []

  try {
    work = await getWorkById(id)
    if (work) resources = await getWorkResources(id)
    if (work?.work_tags && work.work_tags.length > 0) { 
      const firstTag = work.work_tags[0].tag_id
      related = await getWorksByTag(firstTag, 6)
    }
  } catch (err) {
    console.error(err)
  }

  if (!work) {
    return (
      <main className="max-w-225 mx-auto p-6">
        <header className="mb-4">
          <Link href="/" className="text-sm">← home</Link>
        </header>
        <h1 className="text-xl mb-2 text-foreground">Work not found</h1>
        <p className="text-sm text-muted-foreground">The requested work could not be found.</p>
      </main>
    )
  }

  return (
    <main className="max-w-275 mx-auto py-6 text-foreground">
      <header className="my-6 px-4 flex items-start gap-6">
        <div className="w-36 h-48 ci-card shrink-0 overflow-hidden border ci-border">
          {work.cover_url ? (
            <img src={work.cover_url} alt={`${work.title} cover`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs ci-muted-foreground">no cover</div>
          )}
        </div>

        <div className="flex-1">
          <div className="text-xl md:text-3xl font-semibold leading-tight">{work.title} {work.year ? <span className="text-base font-normal ci-muted-foreground">({work.year})</span> : null}</div>
          <div className="mt-1 text-sm text-muted-foreground capitalize">{work.type}{work.original_title && work.original_title !== work.title ? ` · ${work.original_title}` : ''}</div>

          <div className="mt-3 text-xs text-muted-foreground flex flex-wrap gap-3">
            {work.language && <div>Language: <span className="text-muted">{work.language}</span></div>}
            {work.runtime && <div>Runtime: <span className="text-muted">{work.runtime}</span></div>}
            {work.country && <div>Country: <span className="text-muted">{work.country}</span></div>}
          </div>
        </div>
      </header>

      <div className="gap-6">
          <WorkTabs work={work} resources={resources} externalIds={work.external_ids || []} />
        </div>

        <aside className='px-3'>
          <h3 className="text-sm font-semibold mb-3 text-foreground">Related works</h3>
          {related.length === 0 && <div className="text-muted-foreground text-sm">No related works found.</div>}
          {related.length > 0 && (
            <ul className="grid grid-cols-1 gap-3 text-sm">
              {related.map((r: any) => (
                <li key={r.id} className="p-2 border ci-border">
                  <Link href={`/work/${r.id}`} className="ci-link">{r.title}</Link>
                  <div className="text-muted-foreground text-xs">{r.year} · {r.type}</div>
                </li>
              ))}
            </ul>
          )}
        </aside>
    </main>
  )
}

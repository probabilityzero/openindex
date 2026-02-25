"use client"

import { useState } from 'react'
import Link from 'next/link'

type Resource = {
  id: string
  type?: string
  language?: string
  format?: string
  source?: string
  locator?: string | null
}

export default function WorkTabs({
  work,
  resources = [],
  externalIds = [],
}: {
  work: any
  resources?: Resource[]
  externalIds?: any[]
}) {
  const tabs = ['Overview', 'Resources', 'Subtitles', 'Reviews', 'External']
  const [active, setActive] = useState<string>(tabs[0])

  return (
    <div className="bg-transparent">
      <nav className="mb-4 flex gap-3 overflow-x-auto no-scrollbar border-b border-muted-foreground px-2">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`text-sm px-3 py-1 rounded-t ${active === t ? 'bg-muted' : 'text-muted-foreground hover:text-foreground'}`}>
            {t}
          </button>
        ))}
      </nav>

      <div className='px-3'>
        {active === 'Overview' && (
          <section className="mb-6">
            {work.summary && <p className="leading-7 text-neutral-300 mb-4">{work.summary}</p>}

            <h4 className="text-sm font-semibold mb-2">Key Facts</h4>
            <table className="w-full text-sm mb-4">
              <tbody>
                <tr>
                  <td className="pr-4 align-top w-32 text-neutral-400">Type</td>
                  <td>{work.type || '—'}</td>
                </tr>
                {work.year && (
                  <tr>
                    <td className="pr-4 align-top text-neutral-400">Year</td>
                    <td>{work.year}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <h4 className="text-sm font-semibold mb-2">Creators</h4>
            <div className="text-sm">
              {(work.work_people || []).map((cp: any, i: number) => (
                <div key={i} className="mb-1">
                  <Link href={`/person/${cp.people?.id}`} className="text-sky-400 mr-2">{cp.people?.name}</Link>
                  <span className="text-neutral-400">{cp.role}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {active === 'Resources' && (
          <section className="mb-6">
            {resources.length === 0 && <div className="text-neutral-500 text-sm">No resources listed.</div>}
            {resources.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-auto">
                  <thead>
                    <tr className="text-neutral-400">
                      <th className="text-left pr-4">Type</th>
                      <th className="text-left pr-4">Lang</th>
                      <th className="text-left pr-4">Format</th>
                      <th className="text-left pr-4">Source</th>
                      <th className="text-left">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map(res => (
                      <tr key={res.id} className="border-t border-neutral-800">
                        <td className="py-2">{res.type}</td>
                        <td className="py-2 text-neutral-400">{res.language}</td>
                        <td className="py-2 text-neutral-400">{res.format}</td>
                        <td className="py-2 text-neutral-400">{res.source}</td>
                        <td className="py-2">{res.locator ? <a href={res.locator} target="_blank" rel="noopener noreferrer" className="text-sky-400">Open</a> : <span className="text-neutral-500">—</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {active === 'Subtitles' && (
          <section className="mb-6 text-sm text-neutral-400">Subtitles and subtitle files will be listed here (placeholder).</section>
        )}

        {active === 'Reviews' && (
          <section className="mb-6 text-sm text-neutral-400">Reviews, ratings, and notes will appear here (placeholder).</section>
        )}

        {active === 'External' && (
          <section className="mb-6 text-sm">
            {externalIds.length === 0 && <div className="text-neutral-500">No external references</div>}
            {externalIds.map((ext: any) => (
              <div key={ext.id} className="mb-1">
                {ext.url ? (
                  <a href={ext.url} target="_blank" rel="noopener noreferrer" className="text-sky-400">{ext.source}</a>
                ) : (
                  <span className="text-neutral-300">{ext.source}: {ext.external_key}</span>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

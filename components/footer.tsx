"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SubmitForm } from './submit-form'
import ThemeToggle from './theme-toggle'

export default function Footer() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <footer className='site-footer px-6 text-foreground/60 text-xs flex items-center justify-between py-2 gap-4 border-t mt-8'>
        <Link href="/" className="hover:underline font-semibold">OPEN INDEX</Link>
        <div className='flex items-center justify-between gap-3'>
          <ThemeToggle />
          <div className='border-l border-foreground/20 h-4'/>
          <button onClick={() => setOpen(true)} className="text-sky-400 hover:underline">Submit</button>
          <Link href="/about" className="text-sky-400 hover:underline">About</Link>
        </div>
      </footer>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
          <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-4xl mt-20 bg-white dark:bg-black border border-color bg-card text-foreground rounded-md shadow-lg overflow-auto" style={{ maxHeight: '80vh' }}>
            <div className="flex items-center justify-between p-4 border-b border-color">
              <div className="text-lg font-semibold">Submit a Work</div>
              <div>
                <button onClick={() => setOpen(false)} className="px-3 py-1">Close</button>
              </div>
            </div>
            <div className="p-6">
              <SubmitForm />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

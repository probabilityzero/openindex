'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const current = theme === 'system' ? systemTheme : theme
  const next = current === 'dark' ? 'light' : 'dark'

  return (
    <button
      onClick={() => setTheme(next)}
      style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textDecoration: 'underline', fontSize: '12px' }}
      aria-label={`Switch to ${next} theme`}
    >
      {current === 'dark' ? 'Switch to light' : 'Switch to dark'}
    </button>
  )
}

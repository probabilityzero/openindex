'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const current = theme === 'system' ? resolvedTheme : theme
  const next = current === 'dark' ? 'light' : 'dark'

  return (
    <button
      onClick={() => setTheme(next)}
      className="theme-toggle"
      aria-label={`Switch to ${next} theme`}
    >
      {current === 'dark' ? 'Switch to light' : 'Switch to dark'}
    </button>
  )
}

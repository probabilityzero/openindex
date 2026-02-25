'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <form onSubmit={handleSearch} className="mb-4 ring-1 focus-within:ring-2 rounded flex items-center gap-2 px-3 font-sm p-2 w-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        autoFocus
        className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0"
      />
    </form>
  );
}

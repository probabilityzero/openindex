'use client';

import { useState } from 'react';
import { submitWork } from '@/app/actions/submit';

export function SubmitForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    original_title: '',
    type: 'film',
    year: new Date().getFullYear(),
    summary: '',
    url: '',
    resource_type: 'main',
    language: 'en',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await submitWork(formData);
      if (result.success) {
        setMessage({ type: 'success', text: 'Work submitted successfully!' });
        setFormData({
          title: '',
          original_title: '',
          type: 'film',
          year: new Date().getFullYear(),
          summary: '',
          url: '',
          resource_type: 'main',
          language: 'en',
        });
      } else {
        setMessage({ type: 'error', text: result.error || 'Submission failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An error occurred' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '12px', fontWeight: '600' }}>
          Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
          placeholder="Work title"
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '12px', fontWeight: '600' }}>
          Original Title
        </label>
        <input
          type="text"
          value={formData.original_title}
          onChange={e => setFormData({ ...formData, original_title: e.target.value })}
          placeholder="Original title (if different)"
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '12px', fontWeight: '600' }}>
          Type *
        </label>
        <select
          value={formData.type}
          onChange={e => setFormData({ ...formData, type: e.target.value })}
          style={{ width: '100%' }}
          required
        >
          <option value="film">Film</option>
          <option value="music">Music</option>
          <option value="software">Software</option>
          <option value="game">Game</option>
          <option value="book">Book</option>
          <option value="asset">Asset</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '12px', fontWeight: '600' }}>
          Year
        </label>
        <input
          type="number"
          value={formData.year}
          onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '12px', fontWeight: '600' }}>
          Summary
        </label>
        <textarea
          value={formData.summary}
          onChange={e => setFormData({ ...formData, summary: e.target.value })}
          placeholder="Brief description"
          rows={4}
          style={{ width: '100%', fontFamily: 'inherit' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '12px', fontWeight: '600' }}>
          Resource URL
        </label>
        <input
          type="url"
          value={formData.url}
          onChange={e => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://..."
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '12px', fontWeight: '600' }}>
          Resource Type
        </label>
        <select
          value={formData.resource_type}
          onChange={e => setFormData({ ...formData, resource_type: e.target.value })}
          style={{ width: '100%' }}
        >
          <option value="main">Main</option>
          <option value="subtitle">Subtitle</option>
          <option value="trailer">Trailer</option>
          <option value="docs">Documentation</option>
          <option value="patch">Patch</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '12px', fontWeight: '600' }}>
          Language
        </label>
        <input
          type="text"
          value={formData.language}
          onChange={e => setFormData({ ...formData, language: e.target.value })}
          placeholder="en"
          style={{ width: '100%' }}
        />
      </div>

      {message && (
        <div style={{ padding: '10px', backgroundColor: message.type === 'success' ? '#1a3a1a' : '#3a1a1a', color: message.type === 'success' ? '#4dff4d' : '#ff6b6b', fontSize: '12px', border: `1px solid ${message.type === 'success' ? '#4dff4d' : '#ff6b6b'}` }}>
          {message.text}
        </div>
      )}

      <button type="submit" disabled={loading} style={{ padding: '10px', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.6 : 1 }}>
        {loading ? 'Submitting...' : 'Submit Work'}
      </button>
    </form>
  );
}

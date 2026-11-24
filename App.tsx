import { useEffect, useState } from 'react';

type Health = { ok: boolean; service: string };

export default function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/health', { credentials: 'same-origin', signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('API health check failed');
        return response.json() as Promise<Health>;
      })
      .then(setHealth)
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name !== 'AbortError') setError(reason.message);
      });
    return () => controller.abort();
  }, []);

  return <main className="shell">
    <header className="topbar"><div className="mark">CB</div><div><strong>Business Console</strong><span>Cloudflare starter</span></div><span className="pill">Foundation</span></header>
    <section className="hero"><p className="eyebrow">REUSABLE BUSINESS PLATFORM</p><h1>One secure foundation.<br />Multiple industries.</h1><p className="intro">A React + TypeScript frontend backed by Cloudflare Workers, D1 and R2.</p></section>
    <section className="panel"><div><h2>API status</h2><p>Frontend-to-Worker connectivity check</p></div><div className="status">{health ? 'Connected' : error ? 'Unavailable' : 'Checking…'}</div></section>
    {error && <p className="error">{error}. Start the Cloudflare development server to test the API.</p>}
    <section className="grid">
      <article><span>01 / Runtime</span><h3>Workers</h3><p>API routes, authorization and server-side validation.</p></article>
      <article><span>02 / Data</span><h3>D1</h3><p>Relational records using parameterized SQL statements.</p></article>
      <article><span>03 / Files</span><h3>R2</h3><p>Private object storage accessed through controlled API routes.</p></article>
    </section>
    <footer>Security is enforced by the server. Browser-side checks are for usability only.</footer>
  </main>;
}

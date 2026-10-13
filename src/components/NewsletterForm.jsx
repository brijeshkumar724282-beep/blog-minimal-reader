import { useState } from 'react'

export default function NewsletterForm({ compact = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(() => {
    try {
      return localStorage.getItem('folio-subscriber') ? 'done' : 'idle'
    } catch {
      return 'idle'
    }
  })
  const [error, setError] = useState('')

  function subscribe(e) {
    e.preventDefault()
    const value = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Please enter a valid email address.')
      return
    }
    try {
      localStorage.setItem('folio-subscriber', JSON.stringify({ email: value, at: new Date().toISOString() }))
    } catch {
      /* storage unavailable, still show success */
    }
    setError('')
    setStatus('done')
  }

  function reset() {
    try {
      localStorage.removeItem('folio-subscriber')
    } catch {
      /* ignore */
    }
    setEmail('')
    setStatus('idle')
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-line bg-paperdeep p-6 dark:border-white/10 dark:bg-white/5" role="status">
        <p className="serif text-xl font-semibold">You are on the list</p>
        <p className="mt-2 text-sm leading-relaxed text-inksoft dark:text-white/65">
          One letter each Sunday morning. Unsubscribe anytime with a single click.
        </p>
        <button onClick={reset} className="mt-4 text-sm font-semibold text-accent hover:underline">
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl bg-ink p-6 text-paper dark:bg-paper dark:text-ink ${compact ? '' : 'sm:p-8'}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">The Sunday Letter</p>
      <p className="serif mt-2 text-2xl font-semibold leading-snug">One essay, one list, one calm link</p>
      <p className="mt-2 text-sm leading-relaxed opacity-75">
        Join 4,200 readers. Free forever, no spam, leave whenever you like.
      </p>
      <form onSubmit={subscribe} className="mt-4" noValidate>
        <label htmlFor={compact ? 'nl-email-side' : 'nl-email-main'} className="sr-only">
          Email address
        </label>
        <input
          id={compact ? 'nl-email-side' : 'nl-email-main'}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-transparent bg-white/10 px-4 py-3 text-sm text-inherit outline-none placeholder:text-current placeholder:opacity-50 focus:border-accent dark:bg-ink/10"
        />
        {error && (
          <p className="mt-2 text-sm font-medium text-[#F2B8A6]" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="mt-3 w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-paper transition hover:bg-accentdeep"
        >
          Subscribe free
        </button>
      </form>
    </div>
  )
}

import { motion } from 'framer-motion'

export default function Header({ dark, onToggleDark, onHome, query, onQuery, onAbout }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur dark:border-white/10 dark:bg-night/95">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-4">
        <button
          onClick={onHome}
          className="flex items-center gap-3 text-left"
          aria-label="Folio home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink font-serif text-lg text-paper dark:bg-paper dark:text-ink">
            F
          </span>
          <span className="leading-tight">
            <span className="serif block text-xl font-semibold tracking-tight">Folio</span>
            <span className="block text-xs text-inksoft dark:text-white/60">A calm reading room</span>
          </span>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="site-search" className="sr-only">
            Search articles
          </label>
          <input
            id="site-search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search articles"
            className="hidden w-44 rounded-full border border-line bg-white px-4 py-2 text-sm outline-none placeholder:text-inksoft/70 focus:border-accent sm:block dark:border-white/15 dark:bg-nightcard dark:placeholder:text-white/40"
          />
          <button
            onClick={onAbout}
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-inksoft hover:text-ink sm:block dark:text-white/70 dark:hover:text-white"
          >
            About
          </button>
          <button
            onClick={onToggleDark}
            aria-pressed={dark}
            aria-label={dark ? 'Switch to light reading mode' : 'Switch to dark reading mode'}
            className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium transition hover:border-ink dark:border-white/15 dark:bg-nightcard dark:hover:border-white"
          >
            {dark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </div>
      <div className="border-t border-line px-5 py-2 sm:hidden dark:border-white/10">
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search articles"
          aria-label="Search articles"
          className="w-full rounded-full border border-line bg-white px-4 py-2 text-sm outline-none focus:border-accent dark:border-white/15 dark:bg-nightcard"
        />
      </div>
    </header>
  )
}

export function PageIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl px-5 pt-12"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Weekly essays</p>
      <h1 className="serif mt-3 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        Reading that respects your attention
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-inksoft dark:text-white/65">
        Long pieces on craft, focus and the quiet web. No noise, no popups, just room to think.
      </p>
    </motion.div>
  )
}

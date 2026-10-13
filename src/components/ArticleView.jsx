import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function ArticleView({ post, onBack, onOpen }) {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [copied, setCopied] = useState(false)
  const articleRef = useRef(null)
  const headingRefs = useRef([])

  const toc = useMemo(() => post.sections.map((s) => ({ id: slugify(s.heading), title: s.heading })), [post])

  useEffect(() => {
    setProgress(0)
    setActiveSection(0)
    setCopied(false)
    window.scrollTo({ top: 0 })
  }, [post.slug])

  useEffect(() => {
    function onScroll() {
      const el = articleRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const read = Math.min(Math.max(-rect.top, 0), Math.max(total, 1))
      setProgress(total > 0 ? Math.min(read / total, 1) : 0)

      let current = 0
      headingRefs.current.forEach((h, i) => {
        if (h && h.getBoundingClientRect().top < window.innerHeight * 0.4) current = i
      })
      setActiveSection(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [post.slug])

  async function share() {
    const url = `${window.location.origin}${window.location.pathname}#/post/${post.slug}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.prompt('Copy this link', url)
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-6xl px-5"
    >
      <div
        className="fixed inset-x-0 top-0 z-50 h-1 bg-line dark:bg-white/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-label="Reading progress"
      >
        <div className="h-full bg-accent transition-[width]" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="pt-8">
        <button
          onClick={onBack}
          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium hover:border-ink dark:border-white/15 dark:bg-nightcard dark:hover:border-white"
        >
          ← All articles
        </button>
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Table of contents" className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-line bg-white p-5 dark:border-white/10 dark:bg-nightcard">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-inksoft dark:text-white/60">
              Contents
            </p>
            <ol className="mt-3 flex flex-col gap-1">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      headingRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className={`toc-link block border-l-2 border-line py-1.5 pl-3 text-sm leading-snug text-inksoft hover:text-ink dark:border-white/15 dark:text-white/65 dark:hover:text-white ${
                      activeSection === i ? 'active font-semibold' : ''
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
            <div className="rule-dots mt-4 pt-4">
              <button
                onClick={share}
                className="w-full rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
              >
                {copied ? 'Link copied' : 'Share: copy link'}
              </button>
            </div>
          </div>
        </nav>

        <article ref={articleRef} className="mx-auto w-full max-w-reader pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{post.category}</p>
          <h1 className="serif mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-inksoft dark:text-white/70">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-line py-4 text-sm text-inksoft sm:hidden dark:border-white/10 dark:text-white/60">
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
            <button
              onClick={share}
              className="ml-auto rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper dark:bg-paper dark:text-ink"
            >
              {copied ? 'Link copied' : 'Share: copy link'}
            </button>
          </div>
          <div className="mt-5 hidden items-center gap-3 text-sm text-inksoft sm:flex dark:text-white/60">
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
            <span aria-hidden="true">·</span>
            <span>By Maya Linden</span>
          </div>

          <span
            className="mt-8 flex h-52 items-center justify-center rounded-2xl sm:h-64"
            style={{ backgroundColor: post.cover }}
            aria-hidden="true"
          >
            <span className="serif text-8xl font-semibold" style={{ color: post.coverInk }}>
              {post.title.charAt(0)}
            </span>
          </span>

          <div className="reader-body mt-10">
            {post.sections.map((section, i) => (
              <section key={section.heading} className="scroll-mt-28">
                <h2
                  id={slugify(section.heading)}
                  ref={(el) => (headingRefs.current[i] = el)}
                  className="serif mb-4 mt-10 text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, j) => (
                  <p key={j} className="text-ink/90 dark:text-white/85">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between rounded-2xl border border-line bg-white p-6 dark:border-white/10 dark:bg-nightcard">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-inksoft dark:text-white/55">
                Enjoyed this piece
              </p>
              <p className="serif mt-1 text-xl font-semibold">Pass it to a thoughtful friend</p>
            </div>
            <button
              onClick={share}
              className="shrink-0 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-paper transition hover:bg-accentdeep"
            >
              {copied ? 'Link copied' : 'Copy link'}
            </button>
          </div>

          <div className="mt-8">
            <button
              onClick={onBack}
              className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-medium hover:border-ink dark:border-white/15 dark:bg-nightcard dark:hover:border-white"
            >
              ← Back to all articles
            </button>
          </div>
        </article>
      </div>
    </motion.main>
  )
}

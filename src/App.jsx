import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header, { PageIntro } from './components/Header.jsx'
import FeaturedPost from './components/FeaturedPost.jsx'
import PostCard from './components/PostCard.jsx'
import Sidebar from './components/Sidebar.jsx'
import TopicsRow, { AuthorCard } from './components/TopicsRow.jsx'
import ArticleView from './components/ArticleView.jsx'
import Footer from './components/Footer.jsx'
import NewsletterForm from './components/NewsletterForm.jsx'
import { categories, getPost, posts } from './data/posts.js'

function routeFromHash() {
  const match = window.location.hash.match(/^#\/post\/([\w-]+)/)
  if (match) return { view: 'post', slug: match[1] }
  return { view: 'home', slug: null }
}

export default function App() {
  const [route, setRoute] = useState(() => (typeof window !== 'undefined' ? routeFromHash() : { view: 'home', slug: null }))
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('folio-theme') === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.body.style.backgroundColor = dark ? '#161310' : '#FAF7F1'
    try {
      localStorage.setItem('folio-theme', dark ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
  }, [dark])

  useEffect(() => {
    function onHash() {
      setRoute(routeFromHash())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  function openPost(slug) {
    window.location.hash = `/post/${slug}`
    setRoute({ view: 'post', slug })
    window.scrollTo({ top: 0 })
  }

  function goHome() {
    window.location.hash = ''
    setRoute({ view: 'home', slug: null })
    window.scrollTo({ top: 0 })
  }

  function goAbout() {
    if (route.view !== 'home') {
      goHome()
      setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 80)
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const activePost = route.view === 'post' ? getPost(route.slug) : null

  const counts = useMemo(() => {
    const c = { All: posts.length }
    for (const cat of categories) {
      if (cat !== 'All') c[cat] = posts.filter((p) => p.category === cat).length
    }
    return c
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts
      .filter((p) => !p.featured)
      .filter((p) => (category === 'All' ? true : p.category === category))
      .filter((p) =>
        q ? (p.title + ' ' + p.excerpt + ' ' + p.category).toLowerCase().includes(q) : true
      )
  }, [category, query])

  const featured = posts.find((p) => p.featured)

  return (
    <div id="top" className="min-h-screen bg-paper text-ink dark:bg-night dark:text-white">
      <Header
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        onHome={goHome}
        query={query}
        onQuery={setQuery}
        onAbout={goAbout}
      />

      <AnimatePresence mode="wait">
        {route.view === 'post' && activePost ? (
          <div key={`post-${activePost.slug}`}>
            <ArticleView post={activePost} onBack={goHome} onOpen={openPost} />
          </div>
        ) : route.view === 'post' ? (
          <main key="missing" className="mx-auto max-w-2xl px-5 py-24 text-center">
            <p className="serif text-3xl font-semibold">That page wandered off</p>
            <p className="mt-3 text-inksoft dark:text-white/65">
              The article you asked for is not here. Back to the reading room.
            </p>
            <button
              onClick={goHome}
              className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper dark:bg-paper dark:text-ink"
            >
              Back home
            </button>
          </main>
        ) : (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PageIntro />
            <FeaturedPost post={featured} onOpen={openPost} />
            <TopicsRow categories={categories} active={category} onSelect={setCategory} counts={counts} />

            <main className="mx-auto mt-8 grid max-w-6xl gap-10 px-5 lg:grid-cols-[minmax(0,1fr)_320px]">
              <section aria-label="Articles">
                <div className="flex items-baseline justify-between">
                  <h2 className="serif text-2xl font-semibold tracking-tight">
                    {category === 'All' ? 'Latest articles' : category}
                  </h2>
                  <p className="text-sm text-inksoft dark:text-white/55" role="status">
                    {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
                  </p>
                </div>
                {filtered.length === 0 ? (
                  <div className="mt-6 rounded-2xl border border-line bg-white p-10 text-center dark:border-white/10 dark:bg-nightcard">
                    <p className="serif text-2xl font-semibold">Nothing matched that search</p>
                    <p className="mt-2 text-sm text-inksoft dark:text-white/60">
                      Try a shorter word, or browse a different topic.
                    </p>
                    <button
                      onClick={() => {
                        setQuery('')
                        setCategory('All')
                      }}
                      className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper dark:bg-paper dark:text-ink"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {filtered.map((post, i) => (
                      <PostCard key={post.slug} post={post} index={i} onOpen={openPost} />
                    ))}
                  </div>
                )}

                <div className="mt-10">
                  <NewsletterForm />
                </div>
              </section>
              <Sidebar onOpen={openPost} />
            </main>

            <AuthorCard />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onHome={goHome} onAbout={goAbout} />
    </div>
  )
}

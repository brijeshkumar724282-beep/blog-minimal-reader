import { trendingPosts } from '../data/posts.js'
import NewsletterForm from './NewsletterForm.jsx'

export default function Sidebar({ onOpen }) {
  const trending = trendingPosts(4)
  return (
    <aside className="flex flex-col gap-6" aria-label="Trending and newsletter">
      <section className="rounded-2xl border border-line bg-white p-6 dark:border-white/10 dark:bg-nightcard">
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-inksoft dark:text-white/60">
          Trending this week
        </h2>
        <ol className="mt-4 flex flex-col">
          {trending.map((post, i) => (
            <li key={post.slug} className={i > 0 ? 'border-t border-line dark:border-white/10' : ''}>
              <button onClick={() => onOpen(post.slug)} className="group flex w-full gap-4 py-4 text-left">
                <span className="serif text-3xl font-semibold text-line transition group-hover:text-accent dark:text-white/20">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                    {post.category}
                  </span>
                  <span className="serif mt-1 block font-semibold leading-snug group-hover:text-accent">
                    {post.title}
                  </span>
                  <span className="mt-1 block text-xs text-inksoft dark:text-white/55">
                    {post.readTime} min read
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>
      <NewsletterForm compact />
    </aside>
  )
}

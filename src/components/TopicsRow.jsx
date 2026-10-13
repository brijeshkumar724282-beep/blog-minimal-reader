import { author } from '../data/posts.js'

export default function TopicsRow({ categories, active, onSelect, counts }) {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-10">
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-inksoft dark:text-white/60">
        Browse by topic
      </h2>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter posts by topic">
        {categories.map((cat) => {
          const isActive = active === cat
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'border-accent bg-accent text-paper'
                  : 'border-line bg-white text-ink hover:border-ink dark:border-white/15 dark:bg-nightcard dark:text-white dark:hover:border-white'
              }`}
            >
              {cat}
              <span className={`ml-2 text-xs ${isActive ? 'opacity-80' : 'text-inksoft dark:text-white/50'}`}>
                {counts[cat] ?? 0}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function AuthorCard() {
  return (
    <section
      id="about"
      aria-label="About the author"
      className="mx-auto mt-14 max-w-6xl scroll-mt-24 px-5"
    >
      <div className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-8 sm:flex-row sm:items-center sm:p-10 dark:border-white/10 dark:bg-nightcard">
        <span
          className="serif flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-moss text-2xl font-semibold text-paper"
          aria-hidden="true"
        >
          {author.initials}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">About the author</p>
          <h2 className="serif mt-1 text-2xl font-semibold tracking-tight">{author.name}</h2>
          <p className="text-sm font-medium text-inksoft dark:text-white/60">
            {author.role} · {author.location}
          </p>
          <p className="mt-3 max-w-2xl leading-relaxed text-inksoft dark:text-white/70">{author.bio}</p>
        </div>
      </div>
    </section>
  )
}

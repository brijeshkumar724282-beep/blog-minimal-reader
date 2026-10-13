import { motion } from 'framer-motion'

export default function FeaturedPost({ post, onOpen }) {
  if (!post) return null
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-8 max-w-6xl px-5"
    >
      <button
        onClick={() => onOpen(post.slug)}
        className="card-lift group grid w-full overflow-hidden rounded-2xl border border-line bg-white text-left sm:grid-cols-2 dark:border-white/10 dark:bg-nightcard"
      >
        <span
          className="flex min-h-[240px] items-center justify-center p-10 sm:min-h-[320px]"
          style={{ backgroundColor: post.cover }}
          aria-hidden="true"
        >
          <span className="serif text-7xl font-semibold sm:text-8xl" style={{ color: post.coverInk }}>
            {post.title.charAt(0)}
          </span>
        </span>
        <span className="flex flex-col justify-center p-8 sm:p-10">
          <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
            <span className="rounded-full bg-accent px-3 py-1 text-paper">Featured</span>
            <span className="text-inksoft dark:text-white/60">{post.category}</span>
          </span>
          <span className="serif mt-4 block text-3xl font-semibold leading-tight tracking-tight group-hover:text-accent sm:text-4xl">
            {post.title}
          </span>
          <span className="mt-3 block leading-relaxed text-inksoft dark:text-white/65">{post.excerpt}</span>
          <span className="mt-5 flex items-center gap-2 text-sm text-inksoft dark:text-white/60">
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
          </span>
          <span className="mt-6 inline-flex w-fit items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper dark:bg-paper dark:text-ink">
            Read the essay
          </span>
        </span>
      </button>
    </motion.article>
  )
}

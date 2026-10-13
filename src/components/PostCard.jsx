import { motion } from 'framer-motion'

export default function PostCard({ post, index, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={() => onOpen(post.slug)}
        className="card-lift group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-left dark:border-white/10 dark:bg-nightcard"
      >
        <span
          className="flex h-36 items-center justify-center"
          style={{ backgroundColor: post.cover }}
          aria-hidden="true"
        >
          <span className="serif text-5xl font-semibold" style={{ color: post.coverInk }}>
            {post.title.charAt(0)}
          </span>
        </span>
        <span className="flex flex-1 flex-col p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{post.category}</span>
          <span className="serif mt-2 block text-xl font-semibold leading-snug tracking-tight group-hover:text-accent">
            {post.title}
          </span>
          <span className="mt-2 block flex-1 text-sm leading-relaxed text-inksoft dark:text-white/65">
            {post.excerpt}
          </span>
          <span className="mt-4 flex items-center gap-2 text-xs text-inksoft dark:text-white/55">
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
          </span>
        </span>
      </button>
    </motion.article>
  )
}

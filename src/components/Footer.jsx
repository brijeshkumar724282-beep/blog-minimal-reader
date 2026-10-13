export default function Footer({ onHome, onAbout }) {
  return (
    <footer className="mt-16 border-t border-line bg-paperdeep/60 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="serif text-2xl font-semibold tracking-tight">Folio</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-inksoft dark:text-white/60">
            A minimal blog template for writers who put reading first. Built with React and Tailwind.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-inksoft dark:text-white/55">
            Explore
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm font-medium">
            <li>
              <button onClick={onHome} className="hover:text-accent">
                Latest articles
              </button>
            </li>
            <li>
              <button onClick={onAbout} className="hover:text-accent">
                About the author
              </button>
            </li>
            <li>
              <a href="#top" className="hover:text-accent">
                Back to top
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-inksoft dark:text-white/55">
            Colophon
          </p>
          <p className="mt-3 text-sm leading-relaxed text-inksoft dark:text-white/60">
            Set in Newsreader and Inter. One accent color, solid fills only. Dark reading mode included.
          </p>
        </div>
      </div>
      <div className="border-t border-line dark:border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-inksoft dark:text-white/50">
          Folio template · Free to adapt for your own blog · 2026
        </p>
      </div>
    </footer>
  )
}

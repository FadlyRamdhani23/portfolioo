import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'portofolio', label: 'Portofolio' },
  { id: 'kontak', label: 'Kontak' },
]

export default function Navbar({ theme, onToggle }) {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4">
      <nav className="mx-auto max-w-6xl rounded-2xl border border-[#2b1b19]/10 bg-white text-[#2b1b19]">
        <div className="flex h-14 items-center justify-between px-3">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2b1b19] font-display text-lg leading-none text-white">
              FR
            </span>
            <span className="hidden font-display text-xl tracking-wide sm:block">
              FADLY RAMDHANI
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`rounded-lg px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                    active === id
                      ? 'bg-[#2b1b19]/10 text-[#2b1b19]'
                      : 'text-[#6b5f5c] hover:text-[#2b1b19]'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggle}
              aria-label="Ganti tema"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2b1b19]/15 transition-colors hover:border-[#2b1b19]/40"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a
              href="#kontak"
              className="hidden rounded-lg border border-[#2b1b19] px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors hover:bg-[#2b1b19] hover:text-white sm:block"
            >
              Hubungi
            </a>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Buka menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2b1b19]/15 md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {open && (
          <ul className="border-t border-[#2b1b19]/10 p-2 md:hidden">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm ${
                    active === id ? 'bg-[#2b1b19]/10' : 'text-[#6b5f5c]'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#kontak"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-lg border border-[#2b1b19] px-4 py-3 text-center text-sm font-medium"
              >
                Hubungi
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}
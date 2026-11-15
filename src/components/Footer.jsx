import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 px-6 py-8 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Dibuat dengan React & Tailwind CSS.
        </p>
        <a href="#home" className="font-medium text-blue-500 hover:text-blue-400">
          Kembali ke atas ↑
        </a>
      </div>
    </footer>
  )
}
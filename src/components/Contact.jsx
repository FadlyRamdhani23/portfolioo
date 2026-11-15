import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { contact } from '../data/profile'

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
)

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

const items = [
  {
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    Icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: 'Fadly Ramdhani',
    href: contact.linkedin,
    Icon: LinkedinIcon,
  },
  {
    label: 'GitHub',
    value: 'FadlyRamdhani23',
    href: contact.github,
    Icon: GithubIcon,
  },
]

export default function Contact() {
  const subject = encodeURIComponent('Halo Fadly, saya tertarik berdiskusi')

  return (
    <section id="kontak" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-blue-500">
          KONTAK
        </span>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">Mari Berkolaborasi</h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">
          Saya terbuka untuk peluang sebagai Junior Software Engineer. Jika ada posisi atau proyek
          yang cocok, silakan hubungi saya.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {items.map(({ label, value, href, Icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:-translate-y-1 hover:border-blue-500/40 dark:border-white/10 dark:bg-white/5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-blue-500" size={24} />
                <ArrowUpRight
                  size={16}
                  className="text-slate-400 transition group-hover:text-blue-500"
                />
              </div>
              <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">{label}</div>
              <div className="mt-0.5 truncate text-sm font-semibold">{value}</div>
            </motion.a>
          ))}
        </div>

        <a
          href={`mailto:${contact.email}?subject=${subject}`}
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
        >
          <Mail size={16} /> Kirim Email
        </a>

        <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <MapPin size={14} /> {contact.location}
        </p>
      </div>
    </section>
  )
}
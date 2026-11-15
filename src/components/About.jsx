import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { aboutText, stats, timeline } from '../data/about'

export default function About() {
  const education = timeline.filter((item) => item.type === 'pendidikan')

  return (
    <section id="tentang" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* judul */}
        <div className="text-center">
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-blue-500">
            TENTANG
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Tentang Saya</h2>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {/* kiri: teks + statistik */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold">Perkenalkan, saya Fadly Ramdhani.</h3>
            {aboutText.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                {p}
              </p>
            ))}

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-white/10 dark:bg-white/5"
                >
                  <div className="text-xl font-bold text-blue-500">{s.value}</div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* kanan: timeline */}
          <div className="relative border-l border-slate-300 pl-8 dark:border-white/10">
            {education.map((item, i) => {
              return (
                <motion.div
                  key={item.title + item.period}
                  className="relative mb-8 last:mb-0"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <span className="absolute -left-[3.15rem] flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/40 bg-white text-blue-500 dark:bg-[#050816]">
                    <GraduationCap size={15} />
                  </span>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                    <span className="text-xs font-semibold text-blue-500">{item.period}</span>
                    <h4 className="mt-1 font-semibold">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.place}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
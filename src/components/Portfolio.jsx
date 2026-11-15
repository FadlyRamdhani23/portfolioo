import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Award, ArrowUpRight, BarChart3, Briefcase, BriefcaseBusiness,
  ChevronLeft, ChevronRight, Code2, ExternalLink,
  Gamepad2, LayoutDashboard, MapPin, PanelsTopLeft, Rocket, Scissors,
  Server, Smartphone, TrendingUp, Truck, Wrench, X,
} from 'lucide-react'
import { tabs, projects, certifications, skills } from '../data/portfolio'
import { timeline } from '../data/about'

const iconMap = {
  chart: TrendingUp,
  dashboard: LayoutDashboard,
  scissors: Scissors,
  truck: Truck,
  map: MapPin,
  server: Server,
  award: Award,
  briefcase: Briefcase,
  program: Rocket,
}

const projectCategoryIcons = {
  web: Code2,
  mobile: Smartphone,
  game: Gamepad2,
  'data-analyst': BarChart3,
}

const projectCategoryLabels = {
  web: 'Web',
  mobile: 'Mobile',
  game: 'Game',
  'data-analyst': 'Data Analyst',
}

function projectHasCategory(project, category) {
  return project.categories?.includes(category) || project.category === category
}

function ProjectVisual({ project, index, compact = false, large = false }) {
  const Icon = iconMap[project.icon]
  const CategoryIcon = projectCategoryIcons[project.category]

  const image = project.coverImage || project.image || project.images?.[0]?.src
  if (image) {
    return (
      <img
        src={image}
        alt={project.coverImageAlt || project.imageAlt || project.images?.[0]?.alt || `Tampilan ${project.title}`}
        className={`w-full ${compact ? 'h-44 object-cover' : `object-contain ${large ? 'h-[55vh] min-h-80 bg-white' : 'h-64 sm:h-80'}`}`}
      />
    )
  }

  return (
    <div className={`relative flex overflow-hidden bg-gradient-to-br from-blue-500/15 via-slate-100 to-emerald-500/10 dark:from-blue-500/20 dark:via-slate-900 dark:to-emerald-500/10 ${compact ? 'h-44' : large ? 'h-[55vh] min-h-80' : 'h-64 sm:h-80'}`}>
      <span className="absolute -right-10 -top-20 size-64 rounded-full border border-blue-500/10" />
      <span className="absolute -right-2 -top-12 size-48 rounded-full border border-blue-500/10" />
      <div className="relative m-auto flex flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-blue-600 shadow-lg shadow-blue-900/5 dark:border-white/10 dark:bg-white/10 dark:text-blue-300">
          <Icon size={compact ? 30 : 36} />
        </span>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {CategoryIcon && <CategoryIcon size={13} />}
          {projectCategoryLabels[project.category] || 'Proyek'}
        </span>
        {!compact && (
          <span className="mt-2 max-w-md px-6 text-lg font-semibold text-slate-700 dark:text-slate-200">
            {project.title}
          </span>
        )}
      </div>
      <span className="absolute bottom-4 right-5 font-display text-4xl text-blue-500/20">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  )
}

function Card({ icon, category, coverImage, coverImageAlt, images, image, imageAlt, badge, title, subtitle, desc, tags = [], link, linkLabel, onClick, index = 0 }) {
  const Icon = iconMap[icon]
  const Wrapper = onClick ? 'button' : 'div'

  return (
    <Wrapper
      {...(onClick ? { type: 'button', onClick } : {})}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left transition hover:-translate-y-1 hover:border-blue-500/40 dark:border-white/10 dark:bg-white/5 ${onClick ? 'w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500' : ''}`}
    >
      {onClick ? (
        <ProjectVisual
          project={{ icon, title, category, coverImage, coverImageAlt, images, image, imageAlt }}
          index={index}
          compact
        />
      ) : (
        <div className="flex h-28 items-center justify-center bg-slate-100 text-blue-500 dark:bg-white/5">
          <Icon size={44} />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {badge && (
          <span className="mb-3 w-fit rounded-md bg-blue-500/10 px-2 py-1 text-[11px] font-semibold text-blue-500">
            {badge}
          </span>
        )}
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        {desc && (
          <p className="mt-2 text-justify text-sm leading-relaxed text-slate-600 dark:text-slate-400">{desc}</p>
        )}

        {link && !onClick && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-blue-500 hover:text-blue-400"
          >
            {linkLabel || 'Lihat Detail'} <ExternalLink size={14} />
          </a>
        )}

        {onClick && (
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition group-hover:gap-2 dark:text-blue-300">
            Lihat detail <ChevronRight size={16} />
          </span>
        )}

        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-slate-200/70 px-2 py-1 text-[11px] text-slate-600 dark:bg-white/10 dark:text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  )
}

function ProjectDetails({ project, index, onClose }) {
  const [activeImage, setActiveImage] = useState(0)
  const [imageDirection, setImageDirection] = useState(1)
  const touchStartX = useRef(null)
  const images = project.images || (project.image ? [{ src: project.image, alt: project.imageAlt || project.title }] : [])
  const hasGallery = images.length > 0

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  function moveImage(direction) {
    setImageDirection(direction)
    setActiveImage((current) => (current + direction + images.length) % images.length)
  }

  function selectImage(nextIndex) {
    setImageDirection(nextIndex >= activeImage ? 1 : -1)
    setActiveImage(nextIndex)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-t-3xl border border-slate-200 bg-paper shadow-2xl dark:border-white/10 sm:rounded-3xl"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          {hasGallery ? (
            <div
              className="relative flex h-[55vh] min-h-80 items-center justify-center bg-white"
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0].clientX
              }}
              onTouchEnd={(event) => {
                if (touchStartX.current === null) return
                const distance = event.changedTouches[0].clientX - touchStartX.current
                if (Math.abs(distance) > 45) moveImage(distance < 0 ? 1 : -1)
                touchStartX.current = null
              }}
            >
              <AnimatePresence mode="wait" initial={false} custom={imageDirection}>
                <motion.div
                  key={images[activeImage].src}
                  custom={imageDirection}
                  initial={{ opacity: 0, x: imageDirection * 48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: imageDirection * -48 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <ProjectVisual
                    project={{
                      ...project,
                      coverImage: undefined,
                      image: images[activeImage].src,
                      imageAlt: images[activeImage].alt,
                      images: undefined,
                    }}
                    index={index}
                    large
                  />
                </motion.div>
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => moveImage(-1)}
                    aria-label="Gambar sebelumnya"
                    className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-slate-950/50 text-white backdrop-blur transition hover:bg-slate-950/70"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(1)}
                    aria-label="Gambar berikutnya"
                    className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-slate-950/50 text-white backdrop-blur transition hover:bg-slate-950/70"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <span className="absolute bottom-3 right-4 rounded-full bg-slate-950/65 px-3 py-1 text-xs font-medium text-white">
                    {activeImage + 1} / {images.length}
                  </span>
                </>
              )}
            </div>
          ) : (
            <ProjectVisual project={project} index={index} />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail proyek"
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/30 bg-slate-950/50 text-white backdrop-blur transition hover:bg-slate-950/70"
          >
            <X size={19} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {images.length > 1 && (
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2" aria-label="Pilih gambar proyek">
              {images.map((image, imageIndex) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => selectImage(imageIndex)}
                  aria-label={`Tampilkan gambar ${imageIndex + 1}: ${image.alt}`}
                  aria-pressed={activeImage === imageIndex}
                  className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    activeImage === imageIndex
                      ? 'border-blue-500'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={image.src} alt="" className="h-14 w-24 object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {project.badge && (
              <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-300">
                {project.badge}
              </span>
            )}
            {(project.categories || [project.category]).map((category) => (
              <span
                key={category}
                className="rounded-md bg-slate-200/70 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300"
              >
                {projectCategoryLabels[category] || 'Proyek'}
              </span>
            ))}
          </div>
          <h3 id="project-detail-title" className="mt-4 text-2xl font-bold sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 text-justify leading-relaxed text-slate-600 dark:text-slate-300">
            {project.desc}
          </p>

          <div className="mt-7">
            <h4 className="text-sm font-semibold">Teknologi yang digunakan</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-sm text-blue-700 dark:text-blue-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              {project.linkLabel || 'Lihat proyek'} <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [tab, setTab] = useState('proyek')
  const [projectCategory, setProjectCategory] = useState('semua')
  const [selectedProject, setSelectedProject] = useState(null)

  const experiences = timeline.filter((t) => t.type !== 'pendidikan')
  const filteredProjects = projectCategory === 'semua'
    ? projects
    : projects.filter((project) => projectHasCategory(project, projectCategory))
  const projectCategories = [
    { id: 'semua', label: 'Semua', count: projects.length },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'game', label: 'Game' },
    { id: 'data-analyst', label: 'Data Analyst' },
  ].map((category) => ({
    ...category,
    count: category.count ?? projects.filter((project) => projectHasCategory(project, category.id)).length,
  }))
  const tabDetails = {
    proyek: { icon: PanelsTopLeft, count: projects.length },
    pengalaman: { icon: BriefcaseBusiness, count: experiences.length },
    sertifikasi: { icon: Award, count: certifications.length },
    skills: { icon: Wrench, count: skills.length },
  }

  return (
    <section id="portofolio" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-blue-500">
            PORTOFOLIO
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Proyek, Skills & Pengalaman</h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {tabs.map((t) => {
            const Icon = tabDetails[t.id].icon
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`group flex min-h-20 items-center gap-3 rounded-xl border p-4 text-left transition ${
                  tab === t.id
                    ? 'border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-300'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                }`}
              >
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                  tab === t.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-200/70 text-slate-600 group-hover:text-blue-500 dark:bg-white/10 dark:text-slate-300'
                }`}>
                  <Icon size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{t.label}</span>
                  <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
                    {tabDetails[t.id].count} item
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* isi tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {tab === 'proyek' && (
              <>
                <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-4 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Jelajahi proyek</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Pilih kategori untuk menyaring karya
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Filter kategori proyek">
                    {projectCategories.map((category) => {
                      const CategoryIcon = projectCategoryIcons[category.id]
                      return (
                        <button
                          key={category.id}
                          type="button"
                          aria-pressed={projectCategory === category.id}
                          onClick={() => setProjectCategory(category.id)}
                          className={`inline-flex items-center gap-1.5 border-b-2 pb-1 text-sm font-medium transition ${
                            projectCategory === category.id
                              ? 'border-blue-500 text-blue-600 dark:text-blue-300'
                              : 'border-transparent text-slate-500 hover:text-blue-500 dark:text-slate-400'
                          }`}
                        >
                          {CategoryIcon && <CategoryIcon size={14} />}
                          {category.label}
                          <span className="text-xs opacity-70">{category.count}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
                {filteredProjects.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((p) => (
                      <Card
                        key={p.title}
                        {...p}
                        index={projects.indexOf(p)}
                        onClick={() => setSelectedProject(p)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="py-12 text-center text-slate-500 dark:text-slate-400">
                    Belum ada proyek untuk kategori ini.
                  </p>
                )}
              </>
            )}

            {tab === 'pengalaman' && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {experiences.map((e) => (
                  <Card
                    key={e.title}
                    icon={e.type === 'program' ? 'program' : 'briefcase'}
                    badge={e.period}
                    title={e.title}
                    subtitle={e.place}
                    desc={e.desc}
                  />
                ))}
              </div>
            )}

            {tab === 'sertifikasi' && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {certifications.map((c) => (
                  <Card
                    key={c.title}
                    icon="award"
                    badge={c.year || undefined}
                    title={c.title}
                    subtitle={c.issuer}
                  />
                ))}
              </div>
            )}

            {tab === 'skills' && (
              <div className="grid gap-6 md:grid-cols-2">
                {skills.map((s) => (
                  <div
                    key={s.group}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5"
                  >
                    <h3 className="font-semibold">{s.group}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.items.map((i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-300"
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetails
            project={selectedProject}
            index={projects.indexOf(selectedProject)}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
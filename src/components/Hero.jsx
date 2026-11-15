import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { profile } from '../data/profile'

const [firstName, ...restName] = profile.name.toUpperCase().split(' ')
const lastName = restName.join(' ')
const ease = [0.22, 1, 0.36, 1]

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

// Gerak marquee: pelan, melaju saat scroll, berbalik saat scroll ke atas.
function useMarqueeX(baseSpeed) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const velocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const v = boost.get()
    if (v < 0) direction.current = -1
    else if (v > 0) direction.current = 1
    const move = direction.current * baseSpeed * (delta / 1000)
    baseX.set(baseX.get() + move + move * Math.abs(v))
  })

  return useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
}

// mode 'base'  : nama depan solid, nama belakang outline
// mode 'fill'  : semuanya terisi warna aksen (hanya terlihat di sekitar kursor)
function NameTrack({ x, mode }) {
  const solid = mode === 'base' ? 'text-ink' : 'text-accent'
  const second = mode === 'base' ? 'text-stroke' : 'text-accent'

  return (
    <motion.div
      style={{ x }}
      className="flex w-max font-display leading-[0.85]"
      aria-hidden="true"
    >
      {[0, 1].map((g) => (
        <div key={g} className="flex shrink-0">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex shrink-0 pr-[0.5em]">
              <span className={solid}>{firstName}</span>
              <span className={`pl-[0.2em] ${second}`}>{lastName}</span>
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const x = useMarqueeX(-1.4)
  const textRef = useRef(null)

  // parallax: foto dan teks bergeser berlawanan mengikuti mouse
  const mouse = useMotionValue(0)
  const smooth = useSpring(mouse, { stiffness: 80, damping: 20 })
  const photoX = useTransform(smooth, [-1, 1], [-14, 14])
  const textShift = useTransform(smooth, [-1, 1], [18, -18])

  const onMove = (e) => {
    if (reduce) return
    const box = e.currentTarget.getBoundingClientRect()
    mouse.set(((e.clientX - box.left) / box.width) * 2 - 1)

    const el = textRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const onLeave = () => {
    mouse.set(0)
    const el = textRef.current
    if (!el) return
    el.style.setProperty('--mx', '-999px')
    el.style.setProperty('--my', '-999px')
  }

  return (
    <section id="home" className="relative h-svh min-h-[560px] border-b border-ink/20">
      <h1 className="sr-only">{profile.name}</h1>

      <div
        className="absolute inset-0 overflow-hidden"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {/* BELAKANG: satu baris nama + senter kursor */}
        <motion.div
          ref={textRef}
          style={{ x: textShift }}
          initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.1, ease }}
          className="absolute -inset-x-8 top-[54%] -translate-y-1/2 select-none overflow-hidden py-4 text-[clamp(10rem,34vw,30rem)]"
        >
          <NameTrack x={x} mode="base" />

          <div className="spotlight absolute inset-0 py-4">
            <NameTrack x={x} mode="fill" />
          </div>
        </motion.div>

        {/* DEPAN: foto cutout */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[90%] -translate-x-1/2">
          <motion.img
            src={profile.photo}
            alt={profile.name}
            className="h-full w-auto max-w-none"
            style={{ x: photoX }}
            initial={reduce ? false : { opacity: 0, y: 80, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.5 }}
          />
        </div>
      </div>
    </section>
  )
}
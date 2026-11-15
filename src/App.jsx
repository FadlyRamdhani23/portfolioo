import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useTheme from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar theme={theme} onToggle={toggle} />

      <main>
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
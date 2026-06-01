import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import Services from './sections/Services'
import About from './sections/About'
import Process from './sections/Process'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <About />
      <Process />
      <Contact />
      <Footer />
    </>
  )
}

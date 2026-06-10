import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './sections/Footer'

// Home page sections
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import Services from './sections/Services'
import About from './sections/About'
import Process from './sections/Process'
import Contact from './sections/Contact'

// Careers page
import Careers from './sections/Careers'

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <About />
      <Process />
      <Contact />
    </>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
      <Footer />
    </>
  )
}
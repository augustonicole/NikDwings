import { LanguageProvider } from './i18n/LanguageContext.jsx'
import StarBackground from './components/StarField.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <LanguageProvider>
      <StarBackground />
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Skills />
      </main>
      <Contact />
      <Footer />
    </LanguageProvider>
  )
}

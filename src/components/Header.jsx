import { useState } from 'react';
import LanguageSwitch from './LanguageSwitch.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { t } = useLang()

  // Restaurado o uso do t() do primeiro código para manter a internacionalização ativa
  const links = [
    { href: '#trabalhos', label: t.nav.work },
    { href: '#sobre', label: t.nav.about },
    { href: '#habilidades', label: t.nav.skills },
    { href: '#contato', label: t.nav.contact },
  ]

  // Array auxiliar para renderizar as 3 estrelas sem repetir código
  const starsArray = Array.from({ length: 3 });

  return (
    <header>
      <nav className="wrap">
        <a href="#top" className="logo">
          Nicole {/*<span> ⋆ </span> */} Augusto
        </a>

        {/* Grupo da direita para alinhar o Switch de idioma e o botão do Menu */}
        <div className="nav-right">
          
          <LanguageSwitch />

          <button 
            className={`nav-toggle ${open ? 'open' : ''}`} 
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu} 
            aria-expanded={open} 
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                className="nav-star-link" 
                onClick={() => setOpen(false)} // Fecha o menu ao clicar em um link
              >
                <span className="nav-text">{link.label}</span>
                
                {starsArray.map((_, index) => (
                  <svg 
                    key={index} 
                    className={`nav-star-svg nav-star-${index + 1}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#FFD700" />
                  </svg>
                ))}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

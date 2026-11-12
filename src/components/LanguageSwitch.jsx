import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import './language-switch.css'

// Nomes sempre no próprio idioma, para o visitante reconhecer o dele.
const LANGUAGES = [
  { code: 'pt', short: 'PT', name: 'Português' },
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'es', short: 'ES', name: 'Español' },
]

export default function LanguageSwitch() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  const openMenu = () => {
    setActive(Math.max(0, LANGUAGES.findIndex((l) => l.code === lang)))
    setOpen(true)
  }
  const closeMenu = (refocus = true) => {
    setOpen(false)
    if (refocus) buttonRef.current?.focus()
  }
  const choose = (code) => {
    setLang(code)
    closeMenu()
  }

  // Fecha ao clicar/tocar fora.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // Ao abrir, o foco vai para a lista (navegação por teclado).
  useEffect(() => {
    if (open) listRef.current?.focus()
  }, [open])

  const last = LANGUAGES.length - 1

  const onListKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActive((i) => (i === last ? 0 : i + 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActive((i) => (i === 0 ? last : i - 1))
        break
      case 'Home':
        e.preventDefault()
        setActive(0)
        break
      case 'End':
        e.preventDefault()
        setActive(last)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        choose(LANGUAGES[active].code)
        break
      case 'Escape':
        e.preventDefault()
        closeMenu()
        break
      case 'Tab':
        setOpen(false)
        break
      default:
    }
  }

  const onButtonKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      openMenu()
    }
  }

  return (
    <div className="lang-switch" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="lang-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.lang.label}: ${current.name}`}
        onClick={() => (open ? closeMenu(false) : openMenu())}
        onKeyDown={onButtonKeyDown}
      >
        <svg className="lang-globe" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3z" />
        </svg>
        <span className="lang-short">{current.short}</span>
        <span className="lang-caret" aria-hidden="true" />
      </button>

      {open && (
        <ul
          ref={listRef}
          className="lang-menu"
          role="listbox"
          tabIndex={-1}
          aria-label={t.lang.label}
          aria-activedescendant={`lang-option-${LANGUAGES[active].code}`}
          onKeyDown={onListKeyDown}
        >
          {LANGUAGES.map((l, i) => (
            <li
              key={l.code}
              id={`lang-option-${l.code}`}
              role="option"
              lang={l.code}
              aria-selected={l.code === lang}
              className={i === active ? 'is-active' : undefined}
              onClick={() => choose(l.code)}
              onMouseEnter={() => setActive(i)}
            >
              <span className="lang-code">{l.short}</span>
              <span className="lang-name">{l.name}</span>
              {l.code === lang && (
                <span className="lang-check" aria-hidden="true">✓</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

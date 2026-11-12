import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations.js'

const STORAGE_KEY = 'lang'
const SUPPORTED = Object.keys(translations)

// 1) idioma salvo pelo visitante, 2) idioma do navegador, 3) português
function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED.includes(saved)) return saved
  } catch {
    /* localStorage indisponível: segue para o idioma do navegador */
  }
  const browser = (navigator.language || 'pt').slice(0, 2).toLowerCase()
  return SUPPORTED.includes(browser) ? browser : 'pt'
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignora */
    }
  }, [lang])

  const value = useMemo(() => {
    // Traduz textos que vêm dos arquivos de dados (data/*.js).
    // Aceita string simples ("Ilustrações") ou objeto ({ pt: '...', en: '...' }).
    const tr = (v) =>
      v && typeof v === 'object' && !Array.isArray(v)
        ? v[lang] ?? v.pt ?? Object.values(v)[0]
        : v
    return { lang, setLang, t: translations[lang], tr }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang precisa estar dentro de <LanguageProvider>')
  return ctx
}

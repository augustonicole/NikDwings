import { useLang } from '../i18n/LanguageContext.jsx'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="hero wrap" id="top">
      <p className="eyebrow">{t.hero.eyebrow}</p>
      <h1>
        {t.hero.titleBefore}
        <em> {t.hero.titleEm}</em> {t.hero.titleAfter}
      </h1>
      <p>
        {t.hero.line1}
        <br />
        {t.hero.line2}
      </p>
      <div className="hero-actions">
        <a href="#trabalhos" className="btn-primary">
          {t.hero.ctaWork}
        </a>
        <a href="#contato" className="btn-ghost">
          {t.hero.ctaContact}
        </a>
      </div>
    </section>
  )
}

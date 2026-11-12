import { useReveal } from '../hooks/useReveal'
import ProfileCard from './HolographicCard.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function About() {
  const textRef = useReveal()
  const { t } = useLang()

  return (
    <section className="section wrap" id="sobre">
      <div className="about">
        <ProfileCard />
        <div className="about-text reveal" ref={textRef}>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <div className="about-stats">
            {t.about.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

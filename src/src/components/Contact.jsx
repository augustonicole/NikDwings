import { useReveal } from '../hooks/useReveal'
import { useReward } from 'partycles';
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Contact() {
  const ref = useReveal()
  const { t } = useLang()
  const { reward, isAnimating } = useReward('rewardId', 'stars', {
  particleCount: 50,
  spread: 100,
  elementSize: 15,
  colors: ["#FFD700","#fff9da"]
  });

  return (
    <section className="section wrap contact reveal" id="contato" ref={ref}>
      <p className="eyebrow">{t.contact.eyebrow}</p>
      <h2>
        {t.contact.titleBefore} <em>{t.contact.titleEm}</em> {t.contact.titleAfter}
      </h2>
      <p>{t.contact.text}</p>
      <button id="rewardId" onClick={reward}>
      <a href="mailto:augusto.nicole@gmail.com" className="btn-primary">
        Contato
      </a>
    </button>
    </section>
  )
}

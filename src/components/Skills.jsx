import { useReveal } from '../hooks/useReveal'
import SkillBar from './SkillBar.jsx'
import { skills } from '../data/skills.js'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Skills() {
  const headRef = useReveal()
  const { t, tr } = useLang()

  return (
    <section className="section wrap" id="habilidades">
      <div className="section-head reveal" ref={headRef}>
        <div>
          <p className="eyebrow">{t.skills.eyebrow}</p>
          <h2>{t.skills.title}</h2>
        </div>
        <p>{t.skills.intro}</p>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <SkillBar key={skill.id} {...skill} name={tr(skill.name)} />
        ))}
      </div>
    </section>
  )
}

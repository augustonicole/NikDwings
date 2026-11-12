import { useReveal } from '../hooks/useReveal'

export default function SkillBar({ name, percent, icon, color, dark }) {
  const ref = useReveal()
  

  return (
    <div className="skill-item reveal" ref={ref} style={{ '--target': `${percent}%` }}>
      <div className="skill-top">
        <span
          className="skill-icon"
          style={{ '--icon-bg': color, color: dark ? '#191106' : '#fff' }}
        >
          {icon}
        </span>
        <span className="skill-name">{name}</span>
        <span className="skill-percent">{percent}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" />
      </div>
    </div>
  )
}
       
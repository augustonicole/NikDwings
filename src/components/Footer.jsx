import { useLang } from '../i18n/LanguageContext.jsx'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  const social = [
    { label: 'Instagram', href: 'https://www.instagram.com/nikdwings?srtk=dnBrMzU3bnFsd2hq' },
    //{ label: 'Behance', href: '#' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nicole-augusto-b6a5093b2?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  ]

  return (
    <footer>
      <div className="wrap">
        <span className="footer-note">
          {t.footer.rights(year)}
          <h5>Now all I need, is my star to come</h5>
        </span>
        <ul className="footer-links">
          {social.map((s) => (
            <li key={s.label}>
              <a href={s.href}>{s.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

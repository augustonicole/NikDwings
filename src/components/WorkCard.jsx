import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function WorkCard({
  id,
  title,
  tag,
  gradient,
  cover,
  images = [],
  isOpen,
  onToggle,
}) {
  const ref = useReveal()
  const { t } = useLang()
  const [coverFailed, setCoverFailed] = useState(false)

  // Capa: `cover`, senão a miniatura (ou poster do vídeo, ou a própria imagem) da 1ª mídia
  const previewOf = (m) => (m.type === 'video' ? m.poster : m.thumb ?? m.src)
  const firstMedia = images.find((i) => previewOf(i))
  const coverSrc = cover ?? (firstMedia && previewOf(firstMedia))
  const count = images.length


  return (
    <button
      type="button"
      id={`work-card-${id}`}
      className="work-card reveal"
      ref={ref}
      style={{ '--thumb-grad': gradient }}
      aria-expanded={isOpen}
      aria-controls={isOpen ? `gallery-${id}` : undefined}
      onClick={() => onToggle(id)}
    >
      <span className="work-thumb">
        <span className="tex" />
        {coverSrc && !coverFailed && (
          <img
            key={coverSrc}
            className="work-cover"
            src={coverSrc}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setCoverFailed(true)}
          />
        )}
        {count > 0 && (
          <span className="work-count">
            {t.work.count(count)}
          </span>
        )}
      </span>
      <span className="work-meta">
        <span>
          <span className="work-title">{title}</span>
          <span className="tag">{tag}</span>
        </span>
        <span className="arrow" aria-hidden="true">⋆</span>
      </span>
    </button>
  )
}

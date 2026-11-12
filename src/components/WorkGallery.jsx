import { useEffect, useRef } from 'react'
import GalleryImage from './GalleryImage.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

/**
 * Sub-galeria que se expande abaixo da linha do card clicado.
 * Ocupa a largura toda do grid (grid-column: 1 / -1).
 */
export default function WorkGallery({ item, onClose, onOpenImage }) {
  const ref = useRef(null)
  const { t } = useLang()
  const { id, title, description, link, gradient, images = [] } = item

  // O card clicado some ao abrir, então o foco vai para o painel.
  // Depois da animação de abertura, garante que ele esteja visível.
  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(
      () => ref.current?.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'nearest',
      }),
      reduced ? 0 : 320
    )
    return () => clearTimeout(t)
  }, [id])

  return (
    <div
      className="gallery-panel"
      id={`gallery-${id}`}
      ref={ref}
      role="region"
      tabIndex={-1}
      aria-label={t.work.galleryLabel(title)}
      style={{ '--thumb-grad': gradient }}
    >
      <div className="gallery-panel-inner">
        <div className="gallery-box">
          <div className="gallery-head">
            <div>
              <h3>{title}</h3>
              {description && <p>{description}</p>}
            </div>
            <div className="gallery-actions">
              {link && (
                <a
                  className="btn-ghost"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.work.viewProject} ↗
                </a>
              )}
              <button
                type="button"
                className="gallery-close"
                onClick={() => onClose(id)}
                aria-label={t.work.closeGallery(title)}
              >
                ✕
              </button>
            </div>
          </div>

          {images.length === 0 ? (
            <p className="gallery-empty">{t.work.empty}</p>
          ) : (
            <ul className="gallery-grid">
              {images.map((image, i) => (
                <li key={image.src ?? i} style={{ '--i': i }}>
                  <button
                    type="button"
                    className="gallery-thumb"
                    onClick={() => onOpenImage(id, i)}
                    aria-label={t.work.enlarge(image.alt || t.work.imageN(i + 1))}
                  >
                    <GalleryImage
                      src={image.thumb ?? image.src}
                      alt={image.alt || ''}
                      type={image.type}       // <-- Obrigatório passar!
                      poster={image.poster}   // <-- Obrigatório passar!
                      index={i}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

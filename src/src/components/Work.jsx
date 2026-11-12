import { Fragment, useEffect, useMemo, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useReveal } from '../hooks/useReveal'
import WorkCard from './WorkCard.jsx'
import WorkGallery from './WorkGallery.jsx'
import Lightbox from './Lightbox.jsx'
import { workItems } from '../data/work.js'

// Mesmo breakpoint do CSS (.work-grid vira 1 coluna em 860px).
// Precisamos saber o nº de colunas para abrir a galeria ao final da linha do card.
function useColumns() {
  const query = '(max-width: 860px)'
  const [cols, setCols] = useState(() =>
    window.matchMedia(query).matches ? 1 : 2
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setCols(mq.matches ? 1 : 2)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return cols
}

export default function Work() {
  const headRef = useReveal()
  const { t, tr } = useLang()

  // Traduz os textos de data/work.js (aceita string ou { pt, en }).
  const items = useMemo(
    () =>
      workItems.map((item) => ({
        ...item,
        title: tr(item.title),
        tag: tr(item.tag),
        description: tr(item.description),
        images: (item.images ?? []).map((img) => ({ ...img, alt: tr(img.alt) })),
      })),
    [tr]
  )
  const cols = useColumns()
  const [openId, setOpenId] = useState(null)
  const [lightbox, setLightbox] = useState(null) // { id, index }

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  const close = (id) => {
    setOpenId(null)
    requestAnimationFrame(() =>
      document.getElementById(`work-card-${id}`)?.focus()
    )
  }

  // A sub-galeria ocupa o lugar do card aberto: ela entra no início da linha
  // dele (largura total) e o card some enquanto ela está aberta.
  const openIndex = items.findIndex((i) => i.id === openId)
  const panelBefore = openIndex < 0 ? -1 : openIndex - (openIndex % cols)

  const lightboxTheme = lightbox && items.find((i) => i.id === lightbox.id)

  return (
    <section className="section wrap" id="trabalhos">
      <div className="section-head reveal" ref={headRef}>
        <div>
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2>{t.work.title}</h2>
        </div>
        <p>{t.work.intro}</p>
      </div>

      <div className="work-grid">
        {items.map((item, idx) => (
          <Fragment key={item.id}>
            {idx === panelBefore && (
              <WorkGallery
                key={`gallery-${openId}`}
                item={items[openIndex]}
                onClose={close}
                onOpenImage={(id, index) => setLightbox({ id, index })}
              />
            )}
            {item.id !== openId && (
              <WorkCard {...item} isOpen={false} onToggle={toggle} />
            )}
          </Fragment>
        ))}
      </div>

      {lightboxTheme && lightboxTheme.images.length > 0 && (
        <Lightbox
          theme={lightboxTheme}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onChange={(index) => setLightbox({ id: lightbox.id, index })}
        />
      )}
    </section>
  )
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import GalleryImage from './GalleryImage.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

const clamp01 = (n) => Math.min(1, Math.max(0, n))

/**
 * Imagem com zoom dentro do visualizador.
 *  - Botões − / % / + (o % volta para "ajustar à tela")
 *  - Clique duplo (ou toque duplo) amplia / volta
 *  - Arrastar com o mouse (ou rolar/deslizar) para percorrer a imagem ampliada
 *  - Ctrl + roda do mouse (ou pinça no trackpad) dá zoom no ponto do cursor
 *  - Teclado: + − 0, e as setas percorrem a imagem quando ela está ampliada
 * O primeiro passo do zoom vai para a "largura da tela", ideal para capturas
 * de tela longas (rolar para ler); depois amplia até 150% do tamanho original.
 */
function ZoomableImage({ image, index, apiRef, zoomedRef }) {
  const { t } = useLang()
  const stageRef = useRef(null)
  const pendingRef = useRef(null)
  const dragRef = useRef(null)
  const tapRef = useRef({ time: 0, x: 0, y: 0 })
  const latest = useRef({})
  const [meta, setMeta] = useState(null) // { nw: largura original, fitW: largura ajustada à tela }
  const [zoomW, setZoomW] = useState(null) // largura exibida em px; null = ajustada à tela

  const zoomed = zoomW != null
  const maxW = meta ? meta.nw * 1.5 : 0
  const canZoom = !!meta && maxW > meta.fitW * 1.15
  const curW = zoomW ?? meta?.fitW ?? 0

  const measure = () => {
    const img = stageRef.current?.querySelector('img')
    if (img && img.naturalWidth) {
      setMeta({ nw: img.naturalWidth, fitW: img.getBoundingClientRect().width })
    }
  }

  // Largura disponível para a imagem ampliada (menos a barra de rolagem).
  const availW = () => {
    const dlg = stageRef.current?.closest('.lightbox')
    if (!dlg) return 900
    const cs = getComputedStyle(dlg)
    const inner = dlg.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
    return Math.min(1100, inner) - 17
  }

  // Aplica uma nova largura mantendo parado o ponto da imagem sob o `anchor`.
  const applyWidth = (next, anchor) => {
    const stage = stageRef.current
    const img = stage?.querySelector('img')
    if (!stage || !img || !meta) return
    const rect = img.getBoundingClientRect()
    const srect = stage.getBoundingClientRect()
    const ax = anchor ? anchor.x : srect.left + srect.width / 2
    const ay = anchor ? anchor.y : srect.top + srect.height / 2
    pendingRef.current = {
      fx: clamp01((ax - rect.left) / rect.width),
      fy: clamp01((ay - rect.top) / rect.height),
      // já ampliada: o ponto fica sob o cursor; vindo do "ajustada": vai para o centro
      px: zoomed && anchor ? ax - srect.left : null,
      py: zoomed && anchor ? ay - srect.top : null,
    }
    setZoomW(Math.round(next))
  }

  useLayoutEffect(() => {
    const p = pendingRef.current
    const stage = stageRef.current
    const img = stage?.querySelector('img')
    if (!p || !stage || !img || zoomW == null) return
    pendingRef.current = null
    const rect = img.getBoundingClientRect()
    const srect = stage.getBoundingClientRect()
    const px = p.px ?? stage.clientWidth / 2
    const py = p.py ?? stage.clientHeight / 2
    stage.scrollLeft += rect.left + p.fx * rect.width - srect.left - px
    stage.scrollTop += rect.top + p.fy * rect.height - srect.top - py
  }, [zoomW])

  const reset = () => {
    pendingRef.current = null
    setZoomW(null)
  }

  const zoomIn = (anchor) => {
    if (!canZoom || curW >= maxW * 0.99) return
    const fitWidth = Math.min(availW(), maxW)
    // 1º passo: largura da tela (se ela for bem maior que a imagem ajustada)
    const next =
      curW < fitWidth * 0.98 && fitWidth > meta.fitW * 1.15 ? fitWidth : curW * 1.5
    applyWidth(Math.min(next, maxW), anchor)
  }

  const zoomOut = (anchor) => {
    if (!zoomed) return
    const fitWidth = Math.min(availW(), maxW)
    let next = curW / 1.5
    if (curW > fitWidth * 1.02 && next < fitWidth && fitWidth > meta.fitW * 1.15) next = fitWidth
    if (next <= meta.fitW * 1.05) return reset()
    applyWidth(next, anchor)
  }

  const zoomBy = (factor, anchor) => {
    if (!canZoom) return
    const next = Math.min(maxW, curW * factor)
    if (next <= meta.fitW * 1.05) return zoomed ? reset() : undefined
    applyWidth(next, anchor)
  }

  latest.current = { zoomBy }

  // Expõe os controles para o teclado do visualizador.
  apiRef.current = {
    zoomed,
    zoomIn: () => zoomIn(),
    zoomOut: () => zoomOut(),
    reset,
    pan: (dx, dy) => stageRef.current?.scrollBy({ left: dx, top: dy }),
  }
  useLayoutEffect(() => {
    zoomedRef.current = zoomed
  }, [zoomed, zoomedRef])
  useEffect(
    () => () => {
      apiRef.current = null
      zoomedRef.current = false
    },
    [apiRef, zoomedRef]
  )

  // Ctrl + roda / pinça do trackpad (precisa de listener não-passivo).
  useEffect(() => {
    const el = stageRef.current
    const onWheel = (e) => {
      if (!e.ctrlKey) return
      e.preventDefault()
      latest.current.zoomBy(Math.exp(-e.deltaY * 0.01), { x: e.clientX, y: e.clientY })
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Se a janela mudar de tamanho, volta ao ajuste e mede de novo.
  useEffect(() => {
    const onResize = () => {
      setZoomW(null)
      requestAnimationFrame(measure)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onPointerDown = (e) => {
    if (!zoomed || e.pointerType !== 'mouse' || e.button !== 0) return
    const s = stageRef.current
    dragRef.current = { x: e.clientX, y: e.clientY, sl: s.scrollLeft, st: s.scrollTop, moved: false }
    s.setPointerCapture(e.pointerId)
    s.classList.add('is-dragging')
  }

  const onPointerMove = (e) => {
    const d = dragRef.current
    if (!d) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true
    stageRef.current.scrollLeft = d.sl - dx
    stageRef.current.scrollTop = d.st - dy
  }

  const onPointerUp = (e) => {
    const d = dragRef.current
    dragRef.current = null
    stageRef.current?.classList.remove('is-dragging')
    if (d?.moved || !canZoom) return
    // clique duplo (mouse) ou toque duplo (celular)
    const tap = tapRef.current
    const isDouble =
      e.timeStamp - tap.time < 320 && Math.hypot(e.clientX - tap.x, e.clientY - tap.y) < 30
    tapRef.current = isDouble ? { time: 0, x: 0, y: 0 } : { time: e.timeStamp, x: e.clientX, y: e.clientY }
    if (!isDouble) return
    if (zoomed) reset()
    else zoomIn({ x: e.clientX, y: e.clientY })
  }

  const onPointerCancel = () => {
    dragRef.current = null
    stageRef.current?.classList.remove('is-dragging')
  }

  return (
    <div className="lightbox-zoomwrap">
      <div
        ref={stageRef}
        className={`lightbox-stage${zoomed ? ' is-zoomed' : ''}${canZoom ? ' can-zoom' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <GalleryImage
          className="lightbox-img"
          src={image.src}
          alt={image.alt || ''}
          index={index}
          loading="eager"
          draggable={false}
          onLoad={measure}
          style={zoomed ? { width: zoomW } : undefined}
        />
      </div>

      {canZoom && (
        <div className="lightbox-tools" role="group" aria-label="Zoom">
          <button type="button" onClick={() => zoomOut()} disabled={!zoomed} aria-label={t.work.zoomOut}>
            −
          </button>
          <button
            type="button"
            className="lightbox-zoom-level"
            onClick={reset}
            disabled={!zoomed}
            aria-label={t.work.zoomReset}
          >
            {Math.round((curW / meta.nw) * 100)}%
          </button>
          <button
            type="button"
            onClick={() => zoomIn()}
            disabled={curW >= maxW * 0.99}
            aria-label={t.work.zoomIn}
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}

/**
 * Visualizador em tela cheia para as imagens de um tema.
 * Teclado: ← → navegam, Esc fecha (ou sai do zoom). No celular: deslize para os lados.
 * Renderizado em um portal para ficar acima do header/estrelas.
 */
export default function Lightbox({ theme, index, onClose, onChange }) {
  const { images, gradient, title } = theme
  const { t } = useLang()
  const total = images.length
  const current = images[index]
  const isVideo = current.type === 'video'
  const dialogRef = useRef(null)
  const touchX = useRef(null)
  const zoomApiRef = useRef(null)
  const zoomedRef = useRef(false)

  const go = (dir) => onChange((index + dir + total) % total)

  // Trava o scroll da página e devolve o foco ao fechar.
  useEffect(() => {
    const previous = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector('.lightbox-close')?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      previous?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      const api = zoomApiRef.current
      const plain = !e.ctrlKey && !e.metaKey && !e.altKey

      if (e.key === 'Escape') return api?.zoomed ? api.reset() : onClose()
      if (api && plain && (e.key === '+' || e.key === '=')) {
        e.preventDefault()
        return api.zoomIn()
      }
      if (api && plain && (e.key === '-' || e.key === '_')) {
        e.preventDefault()
        return api.zoomOut()
      }
      if (api && plain && e.key === '0') {
        e.preventDefault()
        return api.reset()
      }
      // Ampliada: as setas percorrem a imagem em vez de trocar de foto.
      if (api?.zoomed && e.key.startsWith('Arrow')) {
        e.preventDefault()
        const step = 90
        const dx = e.key === 'ArrowRight' ? step : e.key === 'ArrowLeft' ? -step : 0
        const dy = e.key === 'ArrowDown' ? step : e.key === 'ArrowUp' ? -step : 0
        return api.pan(dx, dy)
      }
      if (total > 1 && e.key === 'ArrowRight') return go(1)
      if (total > 1 && e.key === 'ArrowLeft') return go(-1)
      if (e.key === 'Tab') {
        const f = dialogRef.current?.querySelectorAll('button:not(:disabled)')
        if (!f?.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const onTouchStart = (e) => {
    touchX.current = e.touches.length === 1 ? e.touches[0].clientX : null
  }

  const onTouchEnd = (e) => {
    // Com zoom, deslizar serve para percorrer a imagem, não para trocar de foto.
    if (zoomedRef.current || touchX.current == null || total < 2) {
      touchX.current = null
      return
    }
    const dx = touchX.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 50) go(dx > 0 ? 1 : -1)
    touchX.current = null
  }

  return createPortal(
    <div
      className="lightbox"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.work.lightboxLabel(title, index + 1, total)}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        className="lightbox-btn lightbox-close"
        onClick={onClose}
        aria-label={t.work.close}
      >
        ✕
      </button>

      {total > 1 && (
        <button
          type="button"
          className="lightbox-btn lightbox-prev"
          onClick={() => go(-1)}
          aria-label={t.work.prev}
        >
          ‹
        </button>
      )}

      <figure
        className="lightbox-figure"
        style={{ '--thumb-grad': gradient }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {isVideo ? (
          <GalleryImage
            key={index}
            src={current.src}
            alt={current.alt || ''}
            type={current.type}
            poster={current.poster}
            controls
            index={index}
            loading="eager"
          />
        ) : (
          <ZoomableImage
            key={index}
            image={current}
            index={index}
            apiRef={zoomApiRef}
            zoomedRef={zoomedRef}
          />
        )}
        <figcaption>
          <span>{current.alt || title}</span>
          <small>{index + 1} / {total}</small>
        </figcaption>
      </figure>

      {total > 1 && (
        <button
          type="button"
          className="lightbox-btn lightbox-next"
          onClick={() => go(1)}
          aria-label={t.work.next}
        >
          ›
        </button>
      )}
    </div>,
    document.body
  )
}

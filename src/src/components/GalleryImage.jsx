import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'

/**
 * Imagem da galeria com fallback: se não houver `src` (ou o arquivo falhar ao
 * carregar), mostra um placeholder com o gradiente do tema.
 * Use `key={src}` ao trocar a imagem na mesma instância.
 */
  export default function GalleryImage({ 
  src,
  alt,
  type,
  poster,
  index = 0, 
  className = '', 
  ...rest 
}) {
  const [failed, setFailed] = useState(false)
  const { t } = useLang()

  if (!src || failed) {
    return <div className="ph" style={{ '--i': index }} role="img" aria-label={alt} />
  }

    // Renderiza o vídeo se o type for 'video'
  if (type === 'video') {
    return (
      <video
        className={className}
        src={src}
        poster={poster}
        aria-label={alt}
        muted
        loop
        autoPlay
        playsInline
        onError={() => setFailed(true)}
        {...rest}
      />
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}

import { useEffect, useRef } from 'react';
import '../ProfileCard.css';

// --- Funções Utilitárias de Matemática ---

const round = (value, precision = 3) => parseFloat(value.toFixed(precision));

const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);

const adjust = (value, fromMin, fromMax, toMin, toMax) => {
  return round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
};

function ease(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easedFunc(durationMs, onProgress, onComplete) {
  let startTime = performance.now();
  let canceled = false;

  function loop() {
    if (canceled) return;
    const currentTime = performance.now();
    const progress = (currentTime - startTime) / durationMs;
    const easedProgress = ease(clamp(progress, 0, 1));
    
    onProgress(easedProgress);
    
    if (progress < 1) {
      requestAnimationFrame(loop);
    } else if (onComplete) {
      onComplete();
    }
  }

  loop();

  return {
    cancel: () => { canceled = true; }
  };
}

export default function ProfileCard() {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const easerRef = useRef(null);

  // Atualiza as variáveis CSS baseadas na posição do mouse/toque
  const cardUpdate = (offsetX, offsetY) => {
    const $wrap = wrapRef.current;
    const $card = cardRef.current;
    if (!$wrap || !$card) return;

    const dimensions = $card.getBoundingClientRect();
    const h = dimensions.height;
    const w = dimensions.width;
    
    const px = clamp(Math.abs((100 / w) * offsetX), 0, 100);
    const py = clamp(Math.abs((100 / h) * offsetY), 0, 100);
    const cx = px - 50;
    const cy = py - 50;

    // Aplica os estilos diretamente via propriedades personalizadas do CSS (Variáveis CSS)
    $wrap.style.setProperty('--pointer-x', `${px}%`);
    $wrap.style.setProperty('--pointer-y', `${py}%`);
    $wrap.style.setProperty('--background-x', `${adjust(px, 0, 100, 35, 65)}%`);
    $wrap.style.setProperty('--background-y', `${adjust(py, 0, 100, 35, 65)}%`);
    $wrap.style.setProperty('--pointer-from-center', clamp(Math.sqrt(cy * cy + cx * cx) / 50, 0, 1));
    $wrap.style.setProperty('--pointer-from-top', py / 100);
    $wrap.style.setProperty('--pointer-from-left', px / 100);
    $wrap.style.setProperty('--rotate-x', `${round(-(cx / 5))}deg`);
    $wrap.style.setProperty('--rotate-y', `${round(cy / 4)}deg`);
  };

  const handlePointerMove = (e) => {
    if (e.pointerType === "touch") e.preventDefault();
    // Usamos nativeEvent para pegar a posição correta dentro do elemento do evento
    cardUpdate(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handlePointerEnter = () => {
    if (easerRef.current) easerRef.current.cancel();
    cardRef.current?.classList.add('active');
    wrapRef.current?.classList.add('active');
  };

  const handlePointerOut = (e) => {
    const $wrap = wrapRef.current;
    const $card = cardRef.current;
    if (!$wrap || !$card) return;

    const halfW = $wrap.clientWidth / 2;
    const halfH = $wrap.clientHeight / 2;
    const startX = e.nativeEvent.offsetX;
    const startY = e.nativeEvent.offsetY;

    if (easerRef.current) easerRef.current.cancel();

    easerRef.current = easedFunc(
      1000,
      (p) => {
        let x = adjust(p, 0, 1, startX, halfW);
        let y = adjust(p, 0, 1, startY, halfH);
        cardUpdate(x, y);
      },
      () => {
        $card.classList.remove("active");
        $wrap.classList.remove("active");
      }
    );
  };

  // Efeito de introdução idêntico ao do seu script original
  useEffect(() => {
    const $wrap = wrapRef.current;
    if (!$wrap) return;

    const halfW = $wrap.clientWidth / 2;
    const halfH = $wrap.clientHeight / 2;
    const startX = $wrap.clientWidth - 70;
    const startY = 60;

    // Estado inicial forçado
    cardUpdate(startX, startY);

    const timeoutId = setTimeout(() => {
      easerRef.current = easedFunc(
        3000,
        (p) => {
          let x = adjust(p, 0, 1, startX, halfW);
          let y = adjust(p, 0, 1, startY, halfH);
          cardUpdate(x, y);
        },
        () => {
          cardRef.current?.classList.remove("active");
          wrapRef.current?.classList.remove("active");
        }
      );
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (easerRef.current) easerRef.current.cancel();
    };
  }, []);

  return (
    <main id="app">
      <div ref={wrapRef} className="card-wrapper active">
        <section
          ref={cardRef}
          id="card"
          className="active"
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerOut={handlePointerOut}
        >
          <div className="inside">
            <div className="card__shine"></div>
            <div className="card__glare"></div>
            <div className="card__content avatar__content">
              {/* Imagem do avatar atualizada para corresponder à enviada */}
              <img 
                className="avatar" 
                url="../image/Avatar1.webp" // Link temporário simulando a arte do anime
              />
            </div>
            <div className="card__content">
              <div className="card__details">
                <h3>@nikDwings </h3>
                <p>Junior</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

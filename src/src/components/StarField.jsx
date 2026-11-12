"use client"; 
import React, { useMemo } from 'react';
import './stars.css'

function StarBackground({ starCount = 220, meteorCount = 7 }) {
  // Memoriza as estrelas fixas
  const stars = useMemo(() => {
    return Array.from({ length: starCount }).map((_, i) => ({ 
      id: Math.random(),
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: `${Math.random() * 1.5 + 0.5}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
    })); 
  }, [starCount]); 

  // Memoriza os meteoros (estrelas cadentes)
  const meteors = useMemo(() => {
    return Array.from({ length: meteorCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * -20}vh`, // Começa acima da tela
      left: `${Math.random() * 100}vw`, // Posição horizontal aleatória
      duration: `${Math.random() * 2 + 2}s`, // Velocidade do rastro
      delay: `${Math.random() * 10}s`, // Tempo entre aparições
    }));
  }, [meteorCount]);

  return ( 
    <div className="star-container"> 
      {/* Estrelas de fundo */}
      {stars.map((star) => ( 
        <div 
          key={`star-${star.id}`} 
          className="star" 
          style={{ 
            width: star.size, 
            height: star.size, 
            top: star.top, 
            left: star.left, 
            '--duration': star.duration, 
            animationDelay: star.delay, 
          }} 
        /> 
      ))} 

      {/* Meteoros */}
      {meteors.map((meteor) => (
        <div
          key={`meteor-${meteor.id}`}
          className="meteor"
          style={{
            top: meteor.top,
            left: meteor.left,
            '--duration': meteor.duration,
            animationDelay: meteor.delay,
          }}
        />
      ))}
    </div> 
  ); 
} 

export default StarBackground;

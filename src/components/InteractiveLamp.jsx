import React, { useState, useEffect, useRef } from 'react';

export default function InteractiveLamp({ isOn, onToggle }) {
  const [cordOffset, setCordOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const animRef = useRef(null);
  const physicsState = useRef({ y: 0, vy: 0 });
  const startYRef = useRef(0);
  const hasTriggeredRef = useRef(false);

  // Physics loop for cord rebound
  useEffect(() => {
    let lastTime = performance.now();

    const updatePhysics = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      if (!isDragging) {
        const k = 250; // stiffness
        const c = 9;   // damping
        const restY = 0;

        const fy = -k * (physicsState.current.y - restY) - c * physicsState.current.vy;
        physicsState.current.vy += fy * dt;
        physicsState.current.y += physicsState.current.vy * dt;

        setCordOffset(physicsState.current.y);

        if (Math.abs(physicsState.current.y) < 0.1 && Math.abs(physicsState.current.vy) < 0.1) {
          physicsState.current.y = 0;
          physicsState.current.vy = 0;
          setCordOffset(0);
          return;
        }
      }

      animRef.current = requestAnimationFrame(updatePhysics);
    };

    animRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    startYRef.current = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    hasTriggeredRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaY = Math.max(0, Math.min(45, currentY - startYRef.current));
    
    physicsState.current.y = deltaY;
    setCordOffset(deltaY);

    if (deltaY > 22 && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      if (onToggle) onToggle();
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Give initial spring kick velocity on release
    physicsState.current.vy = -120;
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleCordClick = () => {
    if (!isDragging && !hasTriggeredRef.current) {
      physicsState.current.y = 25;
      physicsState.current.vy = -180;
      if (onToggle) onToggle();
    }
  };

  return (
    <div className="lamp-container" style={{ position: 'relative', width: '260px', height: '320px', margin: '0 auto' }}>
      {/* Light Cone Glow when ON */}
      <div
        className="lamp-light-cone"
        style={{
          position: 'absolute',
          top: '110px',
          left: '-40px',
          width: '340px',
          height: '240px',
          background: 'radial-gradient(ellipse at top, rgba(254, 240, 138, 0.45) 0%, rgba(251, 191, 36, 0.2) 40%, rgba(0,0,0,0) 75%)',
          opacity: isOn ? 1 : 0,
          transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(8px)'
        }}
      />

      {/* SVG Lamp Artwork */}
      <svg
        width="260"
        height="320"
        viewBox="0 0 260 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}
      >
        {/* Lamp Base & Stem */}
        <ellipse cx="130" cy="295" rx="42" ry="12" fill="#E2E8F0" opacity="0.9" />
        <ellipse cx="130" cy="293" rx="36" ry="9" fill="#CBD5E1" />
        <path d="M130 293 L130 160" stroke="#94A3B8" strokeWidth="10" strokeLinecap="round" />
        <path d="M130 160 L142 125" stroke="#64748B" strokeWidth="8" strokeLinecap="round" />

        {/* Lamp Head (Tilts when turned ON) */}
        <g
          className="lamp-head"
          style={{
            transformOrigin: '142px 125px',
            transform: isOn ? 'rotate(0deg)' : 'rotate(-10deg)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {/* Lampshade Outer */}
          <path
            d="M102 70 L182 70 L205 135 L79 135 Z"
            fill={isOn ? '#FEF08A' : '#F1F5F9'}
            stroke="#CBD5E1"
            strokeWidth="3"
            style={{ transition: 'fill 0.2s ease' }}
          />

          {/* Lampshade Warm Inner Glow */}
          <ellipse cx="142" cy="135" rx="63" ry="14" fill={isOn ? '#FDE047' : '#E2E8F0'} />

          {/* Cute Smiling Face on Lampshade */}
          <circle cx="125" cy="100" r="3.5" fill="#334155" />
          <circle cx="159" cy="100" r="3.5" fill="#334155" />
          {/* Cute Rosy Cheeks */}
          <ellipse cx="118" cy="106" rx="4" ry="2.5" fill="#FCA5A5" opacity={isOn ? 0.9 : 0.4} />
          <ellipse cx="166" cy="106" rx="4" ry="2.5" fill="#FCA5A5" opacity={isOn ? 0.9 : 0.4} />
          {/* Smile Mouth */}
          <path d="M136 104 Q142 110 148 104" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Pull Cord & Switch Bead */}
        <g
          className="lamp-pull-cord"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onClick={handleCordClick}
          style={{ cursor: 'pointer' }}
        >
          {/* Cord String */}
          <path
            d={`M105 135 Q 105 ${175 + cordOffset * 0.4}, 105 ${195 + cordOffset}`}
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeDasharray={isDragging ? '4 2' : 'none'}
            fill="none"
          />
          {/* Small Beads */}
          <circle cx="105" cy={165 + cordOffset * 0.5} r="2.5" fill="#FBBF24" />
          <circle cx="105" cy={180 + cordOffset * 0.75} r="3" fill="#FBBF24" />

          {/* Bottom Pull Ring / Wooden Knob */}
          <circle
            cx="105"
            cy={197 + cordOffset}
            r="8"
            fill={isOn ? '#F59E0B' : '#D97706'}
            stroke="#FEF3C7"
            strokeWidth="2"
            style={{
              filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))',
              transform: `scale(${isDragging ? 1.25 : 1})`,
              transformOrigin: `105px ${197 + cordOffset}px`,
              transition: 'transform 0.15s ease'
            }}
          />
        </g>
      </svg>

      {/* Pull me hint tag */}
      <div
        style={{
          position: 'absolute',
          top: '190px',
          left: '25px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: isOn ? '#FBBF24' : '#94A3B8',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'color 0.3s ease'
        }}
      >
        Pull cord 💡
      </div>
    </div>
  );
}

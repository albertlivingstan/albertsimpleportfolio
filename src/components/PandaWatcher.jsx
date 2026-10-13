import React, { useState, useEffect } from 'react';

export default function PandaWatcher({ activeField, isRoomLit, isTyping, hasError }) {
  const [blink, setBlink] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Random natural eye blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Calculate eye pupil direction based on active input field
  useEffect(() => {
    switch (activeField) {
      case 'name':
        setEyeOffset({ x: -4, y: 3 });
        break;
      case 'email':
        setEyeOffset({ x: -2, y: 4 });
        break;
      case 'phone':
        setEyeOffset({ x: 2, y: 4 });
        break;
      case 'message':
        setEyeOffset({ x: 0, y: 6 });
        break;
      default:
        setEyeOffset({ x: 0, y: 0 });
        break;
    }
  }, [activeField]);

  return (
    <div
      className={`panda-watcher-container ${hasError ? 'panda-sad' : ''}`}
      style={{
        position: 'absolute',
        top: '-72px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '130px',
        height: '95px',
        zIndex: 10,
        pointerEvents: 'none',
        userSelect: 'none'
      }}
    >
      <svg
        width="130"
        height="95"
        viewBox="0 0 130 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Panda Ears */}
        <circle cx="28" cy="24" r="15" fill="#1E293B" />
        <circle cx="28" cy="24" r="9" fill="#0F172A" />
        <circle cx="102" cy="24" r="15" fill="#1E293B" />
        <circle cx="102" cy="24" r="9" fill="#0F172A" />

        {/* Panda Head Base */}
        <ellipse cx="65" cy="48" rx="42" ry="34" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

        {/* Black Eye Patches */}
        <ellipse cx="48" cy="46" rx="13" ry="15" fill="#1E293B" transform="rotate(-10 48 46)" />
        <ellipse cx="82" cy="46" rx="13" ry="15" fill="#1E293B" transform="rotate(10 82 46)" />

        {/* White Eyes & Pupils */}
        {hasError ? (
          <>
            {/* Sad Eyes when validation fails */}
            <path d="M40 48 Q48 40 56 48" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M74 48 Q82 40 90 48" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Tear Drop */}
            <path d="M42 56 Q39 63 42 66 Q45 63 42 56 Z" fill="#38BDF8" />
          </>
        ) : blink ? (
          <>
            {/* Closed Eyes / Blinking */}
            <path d="M40 46 Q48 52 56 46" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M74 46 Q82 52 90 46" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            {/* Eyeballs */}
            <circle cx="48" cy="46" r="7" fill="#FFFFFF" />
            <circle cx="82" cy="46" r="7" fill="#FFFFFF" />

            {/* Moving Pupils */}
            <circle
              cx={48 + eyeOffset.x}
              cy={46 + eyeOffset.y}
              r="4"
              fill="#0F172A"
              style={{ transition: 'all 0.15s ease' }}
            />
            <circle
              cx={82 + eyeOffset.x}
              cy={46 + eyeOffset.y}
              r="4"
              fill="#0F172A"
              style={{ transition: 'all 0.15s ease' }}
            />

            {/* Cute Eye Shine Sparkles */}
            <circle cx={46 + eyeOffset.x} cy={44 + eyeOffset.y} r="1.5" fill="#FFFFFF" />
            <circle cx={80 + eyeOffset.x} cy={44 + eyeOffset.y} r="1.5" fill="#FFFFFF" />
          </>
        )}

        {/* Cute Nose */}
        <ellipse cx="65" cy="58" rx="5" ry="3.5" fill="#1E293B" />

        {/* Mouth */}
        <path
          d={hasError ? "M60 67 Q65 61 70 67" : isTyping ? "M60 63 Q65 70 70 63" : "M61 63 Q65 67 69 63"}
          stroke="#1E293B"
          strokeWidth="2"
          strokeLinecap="round"
          fill={hasError ? "none" : isTyping ? "#F43F5E" : "none"}
        />

        {/* Rosy Blush Cheeks */}
        <ellipse cx="36" cy="56" rx="6" ry="4" fill="#FB7185" opacity={isRoomLit ? 0.75 : 0.4} />
        <ellipse cx="94" cy="56" rx="6" ry="4" fill="#FB7185" opacity={isRoomLit ? 0.75 : 0.4} />

        {/* Cute Paws Hugging Card Edge or Covering Face when Sad */}
        <g
          className="panda-paws"
          style={{
            transform: hasError ? 'translateY(-24px) scale(1.15)' : 'translateY(0)',
            transformOrigin: '65px 60px',
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          <ellipse cx="38" cy="80" rx="10" ry="7" fill="#1E293B" stroke="#FFFFFF" strokeWidth="1.5" />
          <ellipse cx="92" cy="80" rx="10" ry="7" fill="#1E293B" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Paw Pads */}
          <ellipse cx="38" cy="81" rx="4" ry="2.5" fill="#475569" />
          <ellipse cx="92" cy="81" rx="4" ry="2.5" fill="#475569" />
        </g>
      </svg>
    </div>
  );
}

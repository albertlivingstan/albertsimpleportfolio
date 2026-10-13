import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaCheck, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';
import './GetInTouchButton.css';

export default function GetInTouchButton({
  label = 'Send Message',
  type = 'submit',
  avatarUrl = '/passport.png',
  idleText = 'Get in touch',
  hoverText = "Don't be shy",
  isError = false,
  errorMessage = 'Please fill name & message! 😢',
  autoResetMs = 2200,
  className = '',
  style = {},
  disabled = false,
  onClick
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, rot: 0 });
  const [state, setState] = useState('idle'); // 'idle' | 'folding' | 'flying' | 'sent' | 'crashing'
  const resetTimerRef = useRef(null);

  const handlePointerEnter = (e) => {
    if (state !== 'idle') return;
    setIsHovered(true);
    poke(e, 1);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0, rot: 0 });
  };

  const handlePointerMove = (e) => {
    if (!isHovered || state !== 'idle') return;
    poke(e, 0.4);
  };

  const poke = (e, factor) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const nx = x / (rect.width / 2);
    const ny = y / (rect.height / 2);

    setTilt({
      rx: Math.max(-5, Math.min(5, -ny * 7 * factor)),
      ry: Math.max(-5, Math.min(5, nx * 7 * factor)),
      rot: Math.max(-3, Math.min(3, nx * ny * 4 * factor))
    });
  };

  const triggerAnimation = (hasErr) => {
    if (hasErr) {
      setState('crashing');
      resetTimerRef.current = setTimeout(() => {
        setState('idle');
      }, 2500);
    } else {
      setState('folding');

      setTimeout(() => {
        setState('flying');
      }, 600);

      setTimeout(() => {
        setState('sent');

        resetTimerRef.current = setTimeout(() => {
          setState('idle');
        }, autoResetMs);
      }, 1250);
    }
  };

  const handleClick = (e) => {
    if (state !== 'idle' || disabled) return;

    if (onClick) {
      const customResult = onClick(e);
      if (customResult === false || isError) {
        triggerAnimation(true);
        return;
      }
    }

    if (isError) {
      triggerAnimation(true);
    } else {
      triggerAnimation(false);
    }
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const isFolding = state === 'folding';
  const isFlying = state === 'flying';
  const isSent = state === 'sent';
  const isCrashing = state === 'crashing';

  return (
    <div className="nudge-container-wrapper" style={{ position: 'relative', display: 'inline-block', width: style?.width || 'auto' }}>
      <button
        type={type}
        className={`nudge-pill-button ${isHovered ? 'data-in' : 'data-idle'} ${state} ${className}`}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        disabled={state !== 'idle' || disabled}
        style={{
          transform: `perspective(600px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotate(${tilt.rot}deg)`,
          ...style
        }}
      >
        {/* Lime Green Animated Liquid Flood Background Track */}
        <div className="nudge-flood" />

        {/* Button Content */}
        <div className="nudge-body">
          {state === 'idle' && (
            <>
              <div className="nudge-labels">
                <span className={`nudge-label idle-label ${isHovered ? 'hide' : 'show'}`}>
                  {label || idleText}
                </span>
                <span className={`nudge-label hover-label ${isHovered ? 'show' : 'hide'}`}>
                  {hoverText}
                </span>
              </div>

              <div className="nudge-arrow-disc">
                <FaArrowRight className="nudge-arrow-icon" />
              </div>
            </>
          )}

          {(isFolding || isFlying || isCrashing) && (
            <div className={`paper-plane-wrapper ${isFolding ? 'folding' : ''} ${isFlying ? 'flying' : ''} ${isCrashing ? 'crashing' : ''}`}>
              {isFlying && (
                <div className="wind-lines">
                  <span className="wind-line l1" />
                  <span className="wind-line l2" />
                  <span className="wind-line l3" />
                </div>
              )}

              {isCrashing && (
                <div className="smoke-lines">
                  <span className="smoke-puff p1">💨</span>
                  <span className="smoke-puff p2">💨</span>
                </div>
              )}

              <svg
                className="paper-plane-svg"
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  className="plane-facet facet-left"
                  points="50,15 15,85 50,70"
                  fill={isCrashing ? "#ef4444" : "#ffffff"}
                />
                <polygon
                  className="plane-facet facet-right"
                  points="50,15 85,85 50,70"
                  fill={isCrashing ? "#dc2626" : "#cbd5e1"}
                />
                <polygon
                  className="plane-facet facet-shadow"
                  points="50,15 50,70 38,82"
                  fill={isCrashing ? "#991b1b" : "#94a3b8"}
                />
              </svg>
            </div>
          )}

          {isSent && (
            <span className="send-btn-sent">
              Sent! <FaCheck className="check-icon-sent" />
            </span>
          )}

          {isCrashing && (
            <span className="send-btn-error-text">
              Failed! <FaExclamationTriangle />
            </span>
          )}
        </div>
      </button>

      {/* Floating Avatar Speech Bubble Popover saying "Hi!" */}
      <div className={`nudge-hi-badge ${isHovered && state === 'idle' ? 'visible' : ''}`}>
        <img
          src={avatarUrl}
          alt="Albert"
          className="nudge-avatar-img"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <span className="nudge-hi-text">Hi! 👋</span>
      </div>

      {/* Sad Emoji Validation Popover */}
      {isCrashing && (
        <div className="sad-emoji-popover">
          <span className="sad-emoji">😢</span>
          <span className="sad-msg">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

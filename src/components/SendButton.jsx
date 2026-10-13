import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import './SendButton.css';

export default function SendButton({
  label = 'Send Message',
  type = 'submit',
  autoResetMs = 1800,
  className = '',
  style = {},
  disabled = false,
  isError = false,
  errorMessage = 'Please fill name & message! 😢',
  onClick
}) {
  const [state, setState] = useState('idle'); // 'idle' | 'folding' | 'flying' | 'sent' | 'crashing'
  const resetTimerRef = useRef(null);

  const triggerAnimation = (hasErr) => {
    if (hasErr) {
      // Begin crash sequence
      setState('crashing');

      resetTimerRef.current = setTimeout(() => {
        setState('idle');
      }, 2500);
    } else {
      // Begin launch sequence
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
      // Allow custom validation handler to return true/false or set isError
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
    <div className="send-button-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type={type}
        className={`send-button-animated ${state} ${className}`}
        onClick={handleClick}
        disabled={state !== 'idle' || disabled}
        style={style}
      >
        {/* Background Fill Container */}
        <div className="send-btn-bg" />

        {/* Button Content */}
        <div className="send-btn-content">
          {state === 'idle' && (
            <span className="send-btn-label">
              {label}
              <FaPaperPlane className="send-icon-idle" />
            </span>
          )}

          {(isFolding || isFlying || isCrashing) && (
            <div className={`paper-plane-wrapper ${isFolding ? 'folding' : ''} ${isFlying ? 'flying' : ''} ${isCrashing ? 'crashing' : ''}`}>
              {/* Wind / Smoke lines */}
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

              {/* SVG Paper Plane */}
              <svg
                className="paper-plane-svg"
                width="44"
                height="44"
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

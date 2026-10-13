import React, { useState, useEffect, useRef } from 'react';
import { FaDownload, FaArrowRight, FaCheck } from 'react-icons/fa';
import './DownloadButton.css';

const TRANSITIONS = {
  idle: { start: 'downloading' },
  downloading: { finish: 'done', cancel: 'idle' },
  done: { reset: 'idle' },
};

export function formatPercent(p) {
  const percent = p === 1 ? 100 : Math.min(99, Math.floor(p * 100));
  return `${percent}%`;
}

export default function DownloadButton({
  fileUrl = '/Albert_Livingstan_G_Resume.pdf',
  fileName = 'Albert_Livingstan_G_Resume.pdf',
  label = 'Resume',
  simulateMs = 2600,
  autoResetMs = 2200,
  className = '',
  style = {},
  onClick
}) {
  const [state, setState] = useState('idle'); // 'idle' | 'downloading' | 'done'
  const [progress, setProgress] = useState(0); // 0 to 1
  const animationRef = useRef(null);
  const resetTimerRef = useRef(null);

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (state !== 'idle') return;

    if (onClick) onClick(e);

    // Transition to downloading
    setState(TRANSITIONS.idle.start);
    setProgress(0);

    const startTime = performance.now();

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / simulateMs);
      setProgress(p);

      if (p < 1) {
        animationRef.current = requestAnimationFrame(updateProgress);
      } else {
        // Finished downloading
        setState('done');
        triggerDownload();

        // Auto reset
        resetTimerRef.current = setTimeout(() => {
          setState('idle');
          setProgress(0);
        }, autoResetMs);
      }
    };

    animationRef.current = requestAnimationFrame(updateProgress);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const isDownloading = state === 'downloading';
  const isDone = state === 'done';

  return (
    <button
      type="button"
      className={`download-btn-pill ${state} ${className}`}
      onClick={handleClick}
      disabled={state !== 'idle'}
      style={style}
      aria-label={label}
    >
      {/* Background Fill Track */}
      <div
        className="download-btn-fill"
        style={{
          width: isDownloading ? `${Math.max(8, progress * 100)}%` : isDone ? '100%' : '0%'
        }}
      />

      {/* Button Content */}
      <div className="download-btn-content">
        <span className="download-btn-label">
          {state === 'idle' && (
            <>
              <span>{label}</span>
              <FaDownload className="download-icon-idle" />
            </>
          )}
          {isDownloading && (
            <span className="download-percent-text">{formatPercent(progress)}</span>
          )}
          {isDone && (
            <span className="download-done-text">Downloaded!</span>
          )}
        </span>

        {/* Circular Right Disc */}
        <div className="download-btn-disc">
          {state === 'idle' && <FaArrowRight className="disc-icon" />}
          {isDownloading && <FaArrowRight className="disc-icon spinning" />}
          {isDone && <FaCheck className="disc-icon check" />}
        </div>
      </div>
    </button>
  );
}

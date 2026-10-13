import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring configuration for the halo
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleInteractableEnter = (e) => {
      setIsHovering(true);
      
      const target = e.target.closest('[data-cursor-text]');
      if (target) {
        setHoverText(target.getAttribute('data-cursor-text') || '');
      } else if (e.target.closest('a, button, input, textarea, select, .project-card, .skill-card')) {
        setHoverText('');
      }
    };

    const handleInteractableLeave = () => {
      setIsHovering(false);
      setHoverText('');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    
    // Use delegation for hover interactions
    document.addEventListener('mouseover', handleInteractableEnter);
    document.addEventListener('mouseout', handleInteractableLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleInteractableEnter);
      document.removeEventListener('mouseout', handleInteractableLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Dot (Instant) */}
      <motion.div
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--accent-color)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      
      {/* Blurred Halo (Delayed with Lerp/Spring) */}
      <motion.div
        className="cursor-halo"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%'
        }}
        animate={{
          width: isHovering ? (hoverText ? '80px' : '50px') : '32px',
          height: isHovering ? (hoverText ? '80px' : '50px') : '32px',
          backgroundColor: isHovering 
            ? (hoverText ? 'rgba(6, 182, 212, 0.9)' : 'rgba(6, 182, 212, 0.2)') 
            : 'transparent',
          border: isHovering ? '1px solid transparent' : '1px solid rgba(6, 182, 212, 0.5)',
          backdropFilter: isHovering && hoverText ? 'blur(4px)' : 'none',
        }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <motion.div
          animate={{ opacity: isHovering && hoverText ? 1 : 0 }}
          style={{
            color: '#000',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '1px',
            textAlign: 'center',
          }}
        >
          {hoverText}
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;

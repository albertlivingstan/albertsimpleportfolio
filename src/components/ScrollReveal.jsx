import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrollReveal = ({ children, delay = 0, yOffset = 50, duration = 0.8, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        y: prefersReducedMotion ? 0 : yOffset, 
        filter: prefersReducedMotion ? 'blur(0px)' : 'blur(4px)' 
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)' 
      } : {}}
      transition={{ 
        duration: prefersReducedMotion ? 0 : duration, 
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

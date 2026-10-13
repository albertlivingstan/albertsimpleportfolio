import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // 0-300ms: Logo appears
    const timer1 = setTimeout(() => setStage(1), 300);
    // 300-700ms: Loading line expands
    const timer2 = setTimeout(() => setStage(2), 700);
    // 700-1000ms: Page reveals
    const timer3 = setTimeout(() => setStage(3), 1000);
    // 1200ms: Complete and unmount
    const timer4 = setTimeout(() => onComplete(), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05070A]"
          exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#05070A'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
          >
            <img src="/logo.png" alt="Logo" style={{ height: '60px', filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.5))' }} />
          </motion.div>
          
          {/* Loading Line */}
          <div style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden', borderRadius: '2px' }}>
            <motion.div 
              initial={{ x: '-100%' }}
              animate={stage >= 1 ? { x: '0%' } : { x: '-100%' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{ width: '100%', height: '100%', background: 'var(--accent-color)', boxShadow: '0 0 10px var(--accent-glow)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

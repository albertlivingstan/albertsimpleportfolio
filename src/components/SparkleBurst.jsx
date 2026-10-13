import React from 'react';
import { motion } from 'framer-motion';

const SparkleBurst = () => {
  const particles = Array.from({ length: 28 });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 9999,
      }}
    >
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const radius = 120 + Math.random() * 200;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        const size = 4 + Math.random() * 8;
        const colors = ['#38bdf8', '#2dd4bf', '#fbbf24', '#e879f9', '#ffffff', '#60a5fa'];
        const color = colors[i % colors.length];

        return (
          <motion.div
            key={i}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 0.2,
            }}
            animate={{
              x: x,
              y: y + 40, // slight gravity drop
              opacity: [1, 1, 0],
              scale: [0.2, 1.2, 0],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 0.9 + Math.random() * 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: i % 2 === 0 ? '50%' : '2px',
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};

export default SparkleBurst;

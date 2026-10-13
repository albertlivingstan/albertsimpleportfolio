import React from 'react';
import { motion } from 'framer-motion';

const marqueeVariants = {
  animate: {
    x: [0, -1035],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 15,
        ease: "linear",
      },
    },
  },
};

const Marquee = ({ text }) => {
  return (
    <div className="marquee-container" style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '1.5rem 0', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)', margin: '4rem 0', background: 'rgba(255,255,255,0.01)' }}>
      <motion.div
        className="marquee-content"
        variants={marqueeVariants}
        animate="animate"
        style={{ display: 'inline-block', fontSize: '3rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '4px' }}
      >
        <span style={{ marginRight: '50px' }}>{text}</span>
        <span style={{ marginRight: '50px' }}>{text}</span>
        <span style={{ marginRight: '50px' }}>{text}</span>
        <span style={{ marginRight: '50px' }}>{text}</span>
        <span style={{ marginRight: '50px' }}>{text}</span>
      </motion.div>
    </div>
  );
};

export default Marquee;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBriefcase, FaTimes, FaDownload, FaEnvelope, FaLinkedin, FaGithub,
  FaCheckCircle, FaAward, FaCode, FaRocket, FaCopy, FaCheck, FaPhoneAlt
} from 'react-icons/fa';
import SparkleBurst from './SparkleBurst';
import DownloadButton from './DownloadButton';

const RecruiterModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  const email = "albertlivingstan@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setShowSparkle(true);
    setTimeout(() => setCopied(false), 2500);
    setTimeout(() => setShowSparkle(false), 1200);
  };

  const handleDownload = () => {
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(0, 0, 0, 0.88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {showSparkle && <SparkleBurst />}

          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '24px',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '88vh',
              overflowY: 'auto',
              padding: '2rem',
              boxShadow: '0 25px 80px rgba(56, 189, 248, 0.25)',
              position: 'relative',
              color: '#fff',
            }}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, background: 'var(--accent-color)', color: '#000' }}
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.2rem',
                right: '1.2rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <FaTimes />
            </motion.button>

            {/* Header Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
              <span className="open-to-work-pill">
                <span className="pulse-dot"></span> OPEN FOR RECRUITMENT & HIRING
              </span>
              <span className="recruiter-badge">
                <FaCheckCircle /> Candidate Verified
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.4rem', color: '#fff' }}>
              Executive Summary for <span style={{ color: 'var(--accent-color)' }}>Recruiters & HR</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.8rem', lineHeight: 1.5 }}>
              Quick snapshot of qualifications, enterprise certifications, technical proficiencies, and direct candidate contact.
            </p>

            {/* Candidate Highlights Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1.8rem',
              }}
            >
              <div
                style={{
                  padding: '1.2rem',
                  borderRadius: '16px',
                  background: 'rgba(56, 189, 248, 0.06)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                }}
              >
                <div style={{ color: 'var(--accent-color)', fontSize: '1.3rem', marginBottom: '0.4rem' }}>
                  <FaAward />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>37+ Certifications</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Microsoft Azure, AWS Cloud, IBM, Deloitte, Cisco, Infosys, Google.
                </p>
              </div>

              <div
                style={{
                  padding: '1.2rem',
                  borderRadius: '16px',
                  background: 'rgba(45, 212, 191, 0.06)',
                  border: '1px solid rgba(45, 212, 191, 0.2)',
                }}
              >
                <div style={{ color: '#2dd4bf', fontSize: '1.3rem', marginBottom: '0.4rem' }}>
                  <FaCode />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>270+ Coding Solved</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  150+ LeetCode, 120+ GeeksforGeeks, HackerRank Certified.
                </p>
              </div>

              <div
                style={{
                  padding: '1.2rem',
                  borderRadius: '16px',
                  background: 'rgba(232, 121, 249, 0.06)',
                  border: '1px solid rgba(232, 121, 249, 0.2)',
                }}
              >
                <div style={{ color: '#e879f9', fontSize: '1.3rem', marginBottom: '0.4rem' }}>
                  <FaRocket />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>Full Stack & AI</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  React, Node.js, Python, Firebase, Gemini AI, MongoDB, DevOps.
                </p>
              </div>
            </div>

            {/* Target Roles */}
            <div style={{ marginBottom: '1.8rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.6rem' }}>
                Primary Target Roles
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Full-Stack Developer', 'Software Development Engineer (SDE)', 'AI / ML Engineer', 'Cloud Solutions Developer', 'Frontend / React Specialist'].map((role) => (
                  <span
                    key={role}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: '20px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    ⚡ {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions for HR */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Direct Recruiter Actions
              </h4>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <DownloadButton
                  label="Download Resume (PDF)"
                  fileUrl="/Albert_Livingstan_G_Resume.pdf"
                  fileName="Albert_Livingstan_G_Resume.pdf"
                  onClick={handleDownload}
                  style={{ flex: 1, minWidth: '200px' }}
                />

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopyEmail}
                  className="btn btn-secondary"
                  style={{ flex: 1, minWidth: '200px', justifyContent: 'center', padding: '0.9rem' }}
                >
                  {copied ? <FaCheck style={{ color: '#10b981' }} /> : <FaCopy />}
                  {copied ? 'Email Copied!' : 'Copy Email Address'}
                </motion.button>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <a href="https://linkedin.com/in/albertlivingstan" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  <FaLinkedin size={18} color="#0a66c2" /> LinkedIn Profile
                </a>
                <a href="https://github.com/albertlivingstan" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  <FaGithub size={18} /> GitHub Code
                </a>
                <a href={`mailto:${email}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  <FaEnvelope size={18} color="var(--accent-color)" /> Send Email
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecruiterModal;

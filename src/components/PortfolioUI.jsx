import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Download } from 'lucide-react';
export const resume = '/Albert_Livingstan_G_Resume.pdf';
export function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: .6, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { pathname } = useLocation();
  const toggle = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: '-20% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    const escape = e => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    if (open) window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [open]);
  return <><a href="#main" className="skip-link">Skip to content</a><header className="site-header"><nav className="nav-shell" aria-label="Main navigation"><Link to="/" className="wordmark" onClick={() => setOpen(false)}>albert<span>.</span><span className="wordmark-suffix"> / developer</span></Link><button ref={toggle} className="icon-button menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><div id="nav-links" className={`nav-links ${open ? 'is-open' : ''}`}>{[['projects','Work'],['about','About'],['skills','Expertise']].map(([id,label]) => <a key={id} href={`/#${id}`} onClick={() => setOpen(false)} className={pathname === '/' && active === id ? 'active' : ''}>{label}</a>)}<Link to="/certificates" className={pathname === '/certificates' ? 'active' : ''} onClick={() => setOpen(false)}>Credentials</Link><a className="nav-contact" href="/#contact" onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={15} /></a></div></nav></header></>;
}
export function Footer() { return <footer className="footer"><Link to="/" className="wordmark">albert<span>.</span></Link><span>© {new Date().getFullYear()} Albert Livingstan G</span><div><a href="https://github.com/albertlivingstan" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="https://www.linkedin.com/in/albert-livingstan-g" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href={resume} download>Résumé <Download size={15} /></a></div></footer>; }
export function Dialog({ children, title, onClose, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    const previous = document.activeElement;
    node.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { node.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} aria-label={title} className={`portfolio-dialog ${className}`} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}><div className="dialog-inner"><button autoFocus className="icon-button dialog-close" onClick={onClose} aria-label="Close dialog"><X /></button>{children}</div></dialog>;
}

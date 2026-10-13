import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Home from './pages/Home';
import './App.css';
const CertificatesPage = lazy(() => import('./pages/CertificatesPage'));
export default function App() {
  return <MotionConfig reducedMotion="user"><Suspense fallback={<div className="page-loading" role="status">Loading portfolio…</div>}><Routes><Route path="/" element={<Home />} /><Route path="/certificates" element={<CertificatesPage />} /><Route path="*" element={<main className="section"><h1>Page not found.</h1><a className="button" href="/">Back to portfolio</a></main>} /></Routes></Suspense></MotionConfig>;
}

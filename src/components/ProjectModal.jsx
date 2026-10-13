import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Dialog } from './PortfolioUI';
export default function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const [video, setVideo] = useState(false);
  const images = project.images || [];
  return <Dialog title={project.title} onClose={onClose}><p className="eyebrow">Project overview</p><h2>{project.title}</h2><p>{project.desc}</p><div className="tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div><div className="button-row"><a className="button small" href={project.github} target="_blank" rel="noreferrer"><Github size={16} /> Source code</a>{project.liveDemo && <a className="button small primary" href={project.liveDemo} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={16} /></a>}</div>{images.length > 0 && <div className="project-gallery"><img src={`/${images[index]}`} alt={`${project.title} screenshot ${index + 1}`} /><div className="gallery-controls"><button className="icon-button" aria-label="Previous screenshot" onClick={() => setIndex((index - 1 + images.length) % images.length)}><ChevronLeft /></button><span aria-live="polite">{index + 1} / {images.length}</span><button className="icon-button" aria-label="Next screenshot" onClick={() => setIndex((index + 1) % images.length)}><ChevronRight /></button></div></div>}{project.video && (video ? <iframe className="video" title={`${project.title} walkthrough`} src={`https://player.vimeo.com/video/${project.video}`} allow="fullscreen; picture-in-picture" allowFullScreen /> : <button className="button" onClick={() => setVideo(true)}><Play size={17} /> Watch project walkthrough</button>)}</Dialog>;
}

import React, { useState, useRef } from 'react';
import InteractiveLamp from './InteractiveLamp';
import PandaWatcher from './PandaWatcher';
import Magnetic from './Magnetic';
import GetInTouchButton from './GetInTouchButton';
import './ContactRoom.css';

export default function ContactRoom({
  t,
  formData,
  setFormData,
  errors,
  setErrors,
  onSubmit
}) {
  const [isRoomLit, setIsRoomLit] = useState(true);
  const [activeField, setActiveField] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [hasErrorState, setHasErrorState] = useState(false);
  const typingTimerRef = useRef(null);

  const handleToggleLamp = () => {
    setIsRoomLit((prev) => !prev);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
    setHasErrorState(false);

    setIsTyping(true);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 600);
  };

  const handleFormSubmit = (e) => {
    if (!formData.name?.trim() || !formData.message?.trim()) {
      setHasErrorState(true);
      setTimeout(() => setHasErrorState(false), 2600);
      if (onSubmit) onSubmit(e);
      return false; // Triggers plane crash animation
    }
    setHasErrorState(false);
    if (onSubmit) onSubmit(e);
    return true; // Triggers paper plane launch flight animation
  };

  return (
    <div className={`contact-room-section ${isRoomLit ? 'room-lit' : 'room-dark'}`}>
      <div className="contact-room-layout">
        {/* Left Side: Interactive Desk Lamp with Cord Pull */}
        <div className="contact-room-lamp-wrapper">
          <InteractiveLamp isOn={isRoomLit} onToggle={handleToggleLamp} />
        </div>

        {/* Right Side: Contact Form Card with Panda Watcher on top */}
        <div className="contact-room-card-wrapper">
          {/* Animated Panda Peeking over the top border */}
          <PandaWatcher
            activeField={activeField}
            isRoomLit={isRoomLit}
            isTyping={isTyping}
            hasError={hasErrorState}
          />

          <div className="contact-room-card">
            <div className="contact-card-header">
              <h3 className="contact-card-title">
                {t?.contact?.title || 'Get In'} <span style={{ color: isRoomLit ? '#F59E0B' : 'var(--accent-color)', transition: 'color 0.3s ease' }}>{t?.contact?.titleSpan || 'Touch'}</span>
              </h3>
              <p className="contact-card-subtitle">
                {t?.contact?.desc || 'Feel free to reach out. Our panda is watching!'}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ width: '100%', textAlign: 'left' }}>
                <input
                  type="text"
                  placeholder={t?.contact?.namePlaceholder || 'Your Name'}
                  value={formData.name}
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`contact-room-input ${errors.name || hasErrorState ? 'error' : ''}`}
                />
                {errors.name && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div style={{ width: '100%', textAlign: 'left' }}>
                <input
                  type="email"
                  placeholder={t?.contact?.emailPlaceholder || 'Your Email'}
                  value={formData.email}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`contact-room-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div style={{ width: '100%', textAlign: 'left' }}>
                <input
                  type="tel"
                  placeholder={t?.contact?.phonePlaceholder || 'Your Phone (optional)'}
                  value={formData.phone}
                  onFocus={() => setActiveField('phone')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`contact-room-input ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                    {errors.phone}
                  </span>
                )}
              </div>

              <div style={{ width: '100%', textAlign: 'left' }}>
                <textarea
                  placeholder={t?.contact?.messagePlaceholder || 'Your Message'}
                  value={formData.message}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={`contact-room-textarea ${errors.message || hasErrorState ? 'error' : ''}`}
                  rows="4"
                ></textarea>
                {errors.message && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Get In Touch Submit Button with Lime Flood & Paper Plane Flight */}
              <Magnetic>
                <GetInTouchButton
                  label={t?.contact?.submitButton || 'Send Message'}
                  idleText="Get in touch"
                  hoverText="Don't be shy"
                  type="submit"
                  isError={hasErrorState}
                  errorMessage="Please enter name & message! 😢"
                  onClick={handleFormSubmit}
                  style={{
                    width: '100%',
                    justify: 'center'
                  }}
                />
              </Magnetic>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

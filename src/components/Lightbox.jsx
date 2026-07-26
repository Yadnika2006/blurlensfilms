import React, { useEffect } from 'react';

export default function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onNext, onPrev, onClose]);

  const photo = photos[currentIndex];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 18, right: 22,
          background: 'none', border: 'none',
          color: '#fff', fontSize: '2rem',
          cursor: 'pointer', opacity: 0.7,
        }}
      >&times;</button>

      {/* Image */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: 'calc(100vh - 120px)', width: '100%' }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Controls */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px 0 8px' }}
      >
        <button onClick={onPrev} style={btnStyle}>&#8592;</button>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>
          {currentIndex + 1} / {photos.length}
        </span>
        <button onClick={onNext} style={btnStyle}>&#8594;</button>
      </div>
    </div>
  );
}

const btnStyle = {
  background: 'none',
  border: '1px solid rgba(255,255,255,0.3)',
  color: '#fff',
  width: 48, height: 48,
  borderRadius: '50%',
  fontSize: '1.3rem',
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
import React from 'react';

export default function Gallery({ photos, onPhotoClick }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '4px',
      padding: '4px',
    }}>
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          onClick={() => onPhotoClick(index)}
          style={{
            overflow: 'hidden',
            cursor: 'pointer',
            aspectRatio: '3/2',
            background: '#111',
          }}
        >
          {photo.type === 'video' ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <video
                src={photo.src}
                poster={photo.poster}
                muted
                loop
                playsInline
                preload="metadata"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04)';
                  e.currentTarget.play().catch(() => {});
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
              <span style={{ position: 'absolute', left: '12px', bottom: '12px', padding: '5px 10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', borderRadius: '2px', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                MOV
              </span>
            </div>
          ) : (
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.5s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          )}
        </div>
      ))}
    </div>
  );
}
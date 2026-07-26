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
        </div>
      ))}
    </div>
  );
}
import React, { useState } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import photos from './data/photos';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeView, setActiveView] = useState('portfolio');
  const [isAboutImageHovered, setIsAboutImageHovered] = useState(false);
  const total = photos.length;
  const aboutPhotoSrc = '/images/logo.jpg?v=20260726';
  const contactPhotoSrc = '/images/logo.jpg?v=20260726';

  React.useEffect(() => {
    const handler = () => setActiveView('contact');
    window.addEventListener('navigate-contact', handler);
    return () => window.removeEventListener('navigate-contact', handler);
  }, []);

  return (
    <>
      <Header
        activeView={activeView}
        onAboutClick={() => setActiveView('about')}
        onPortfolioClick={() => setActiveView('portfolio')}
      />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 48px' }}>
        {activeView === 'about' ? (
          <section
            id="about"
            style={{
              maxWidth: '1000px',
              margin: '0 auto',
              paddingTop: '16px',
            }}
          >
            <p style={{ textAlign: 'center', color: '#1a1a1a', fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, marginBottom: '22px' }}>
              About Me
            </p>
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 'min(100%, 760px)', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 18px 45px rgba(0, 0, 0, 0.12)' }}>
                <img
                  src={aboutPhotoSrc}
                  alt="Portrait of blurlensfilms creator"
                  onMouseEnter={() => setIsAboutImageHovered(true)}
                  onMouseLeave={() => setIsAboutImageHovered(false)}
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transform: isAboutImageHovered ? 'scale(1.03)' : 'scale(1)',
                    transition: 'transform 260ms ease, filter 260ms ease',
                    filter: isAboutImageHovered ? 'brightness(1.04) contrast(1.02)' : 'none',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
            <div style={{ maxWidth: '520px', margin: '34px auto 0', textAlign: 'left' }}>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '10px', color: '#222' }}>
                Hey there, I&apos;m blurlensfilms.
              </p>
              <p style={{ lineHeight: 1.9, color: '#666', fontSize: '0.95rem' }}>
                I make cinematic, clean, and natural-looking production work with a focus on strong light, honest emotion, and simple storytelling.
                My style is built for portraits, events, and brand visuals that feel polished but still personal.
              </p>
            </div>
          </section>
        ) : activeView === 'contact' ? (
          <section
            id="contact"
            style={{
              maxWidth: '1000px',
              margin: '0 auto',
              paddingTop: '16px',
            }}
          >
            <p style={{ textAlign: 'center', color: '#1a1a1a', fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, marginBottom: '22px' }}>
              Contact
            </p>
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 'min(100%, 760px)', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 18px 45px rgba(0, 0, 0, 0.12)' }}>
                <img
                  src={contactPhotoSrc}
                  alt="blurlensfilms contact visual"
                  style={{ width: '100%', aspectRatio: '16 / 9', display: 'block', objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </div>
            <div style={{ maxWidth: '760px', margin: '28px auto 0' }}>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: '#222' }}>
                Let&apos;s Chat!
              </p>
              <form style={{ marginTop: '14px' }} onSubmit={(event) => event.preventDefault()}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '0.72rem', marginBottom: '6px', color: '#666' }}>First Name</span>
                    <input type="text" name="firstName" style={fieldStyle} />
                  </label>
                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '0.72rem', marginBottom: '6px', color: '#666' }}>Last Name</span>
                    <input type="text" name="lastName" style={fieldStyle} />
                  </label>
                </div>
                <label style={{ display: 'block', marginTop: '12px' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', marginBottom: '6px', color: '#666' }}>Email *</span>
                  <input type="email" name="email" style={fieldStyle} />
                </label>
                <label style={{ display: 'block', marginTop: '12px' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', marginBottom: '6px', color: '#666' }}>Subject *</span>
                  <input type="text" name="subject" style={fieldStyle} />
                </label>
                <label style={{ display: 'block', marginTop: '12px' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', marginBottom: '6px', color: '#666' }}>Message *</span>
                  <textarea name="message" rows="5" style={{ ...fieldStyle, resize: 'vertical', minHeight: '140px' }} />
                </label>
                <button
                  type="submit"
                  style={{
                    marginTop: '16px',
                    padding: '11px 22px',
                    background: '#1a1a1a',
                    color: '#fff',
                    border: 'none',
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </section>
        ) : (
          <>
            <Gallery
              photos={photos}
              onPhotoClick={(index) => setActiveIndex(index)}
            />
          </>
        )}
      </main>
      {activeIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onPrev={() => setActiveIndex((activeIndex - 1 + total) % total)}
          onNext={() => setActiveIndex((activeIndex + 1) % total)}
        />
      )}
      <footer style={{ textAlign: 'center', padding: '40px 24px', fontSize: '0.72rem', color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        &copy; 2026 blurlensfilms — All Rights Reserved
      </footer>
    </>
  );
}

const fieldStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #d9d3c8',
  background: '#fff',
  font: 'inherit',
  fontSize: '0.92rem',
  color: '#1a1a1a',
  outline: 'none',
};
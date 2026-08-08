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
  const aboutPhotoSrc = '/images/1.png';
  const contactPhotoSrc = '/images/logo.jpg?v=20260726';

  React.useEffect(() => {
    const handler = () => setActiveView('contact');
    window.addEventListener('navigate-contact', handler);
    return () => window.removeEventListener('navigate-contact', handler);
  }, []);

  const mainMaxWidth = activeView === 'portfolio' ? '1500px' : '1200px';

  return (
    <>
      <Header
        activeView={activeView}
        onAboutClick={() => setActiveView('about')}
        onPortfolioClick={() => setActiveView('portfolio')}
      />
      <main style={{ maxWidth: mainMaxWidth, margin: '0 auto', padding: '0 24px 48px' }}>
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
              About BlurLensFilms
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
            <div style={{ maxWidth: '680px', margin: '34px auto 0', textAlign: 'center' }}>
              <p style={{ fontSize: '1.05rem', fontWeight: 500, marginBottom: '24px', color: '#7a6a4d', fontStyle: 'italic', letterSpacing: '0.02em' }}>
                We don’t just capture moments — we turn them into stories.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', lineHeight: 1.85, color: '#444', fontSize: '0.95rem' }}>
                <p>
                  Welcome to BlurLensFilms, a creative video and photography studio dedicated to capturing moments that deserve to be remembered.
                </p>
                <p>
                  From weddings and special celebrations to fashion, events, brands and personal stories, we believe every frame has a story to tell. Our approach combines cinematic visuals, creative storytelling, authentic emotions and attention to detail to create photographs and films that feel as special years later as they did in the moment.
                </p>
                <p>
                  At BlurLensFilms, we focus on more than just cameras and beautiful shots. We take the time to understand you, your vision and the story behind every project, so the final result feels personal and meaningful.
                </p>
              </div>

              <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid #eae5dc', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 400, color: '#1a1a1a', marginBottom: '14px' }}>
                  Our Vision
                </h3>
                <p style={{ fontSize: '1.02rem', fontStyle: 'italic', color: '#222', marginBottom: '16px', lineHeight: 1.6 }}>
                  &ldquo;To create visuals that don&apos;t just look beautiful, but make you feel something.&rdquo;
                </p>
                <p style={{ lineHeight: 1.85, color: '#555', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
                  Whether it&apos;s a once-in-a-lifetime celebration, a growing brand, or a simple moment worth remembering, BlurLensFilms is here to turn your moments into timeless frames.
                </p>
              </div>
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
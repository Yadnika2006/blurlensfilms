import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import photos from './data/photos';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeView, setActiveView] = useState('portfolio');
  const [isAboutImageHovered, setIsAboutImageHovered] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const formRef = useRef();

  const total = photos.length;
  const aboutPhotoSrc = '/images/1.png';
  const contactPhotoSrc = '/images/logo.jpg?v=20260726';

  React.useEffect(() => {
    const handler = () => setActiveView('contact');
    window.addEventListener('navigate-contact', handler);
    return () => window.removeEventListener('navigate-contact', handler);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check compulsory selection for video_type checkboxes
    if (formRef.current) {
      const checkedVideoTypes = formRef.current.querySelectorAll('input[name="video_type"]:checked');
      if (checkedVideoTypes.length === 0) {
        setStatusMessage({
          type: 'error',
          text: 'Please select at least one type of final video.',
        });
        return;
      }
    }

    setIsSending(true);
    setStatusMessage(null);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsSending(false);
          setStatusMessage({
            type: 'success',
            text: "Message sent! I'll get back to you soon.",
          });
          if (formRef.current) {
            formRef.current.reset();
          }
        },
        (error) => {
          console.error('EmailJS submit error:', error);
          setIsSending(false);
          setStatusMessage({
            type: 'error',
            text: "Something went wrong. Please try again.",
          });
        }
      );
  };

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
            <p style={{ textAlign: 'center', color: '#1a1a1a', fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 500, letterSpacing: '-0.01em', marginBottom: '22px' }}>
              About BlurLensFilms
            </p>
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 'min(100%, 760px)', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 18px 45px rgba(0, 0, 0, 0.1)' }}>
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
            <div style={{ maxWidth: '680px', margin: '36px auto 0', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 500, marginBottom: '28px', color: '#8c7b60', fontStyle: 'italic', letterSpacing: '0.01em' }}>
                &ldquo;We don’t just capture moments — we turn them into stories.&rdquo;
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'left', lineHeight: 1.9, color: '#3d3d3d', fontSize: '0.94rem' }}>
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

              <div style={{ marginTop: '44px', paddingTop: '32px', borderTop: '1px solid #eeeeee', textAlign: 'center' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 500, color: '#1a1a1a', marginBottom: '14px', letterSpacing: '0.02em' }}>
                  Our Vision
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontStyle: 'italic', color: '#222', marginBottom: '16px', lineHeight: 1.6 }}>
                  &ldquo;To create visuals that don&apos;t just look beautiful, but make you feel something.&rdquo;
                </p>
                <p style={{ lineHeight: 1.9, color: '#555', fontSize: '0.94rem', maxWidth: '600px', margin: '0 auto' }}>
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
            <p style={{ textAlign: 'center', color: '#1a1a1a', fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 500, letterSpacing: '-0.01em', marginBottom: '8px' }}>
              Contact Us
            </p>
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 'fit-content', maxWidth: '100%', borderRadius: '4px', overflow: 'hidden' }}>
                <img
                  src={contactPhotoSrc}
                  alt="blurlensfilms contact visual"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '360px',
                    width: 'auto',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            </div>
            <div style={{ maxWidth: '640px', margin: '36px auto 0' }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.76rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', color: '#8c7b60', textAlign: 'center' }}>
                Let&apos;s Create Together
              </p>
              <p style={{ textAlign: 'center', fontSize: '0.92rem', color: '#666', marginBottom: '36px' }}>
                Tell us about your project vision so we can bring your story to life.
              </p>
              <form ref={formRef} style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '22px' }} onSubmit={handleSubmit}>
                
                {/* 1. Full Name */}
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', color: '#444' }}>Full Name *</span>
                  <input type="text" name="from_name" required placeholder="Enter your full name" style={fieldStyle} />
                </label>

                {/* 2. Phone Number */}
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', color: '#444' }}>Phone Number *</span>
                  <input type="tel" name="phone" required placeholder="Enter your phone number" style={fieldStyle} />
                </label>

                {/* 3. Email Address */}
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', color: '#444' }}>Email Address *</span>
                  <input type="email" name="from_email" required placeholder="Enter your email address" style={fieldStyle} />
                </label>

                {/* 4. Subject */}
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', color: '#444' }}>Subject *</span>
                  <input type="text" name="subject" required placeholder="Enter subject (e.g. Wedding Videography Inquiry)" style={fieldStyle} />
                </label>

                {/* 5. Type of Project */}
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', color: '#444' }}>Type of Project *</span>
                  <select name="project_type" required style={selectStyle}>
                    <option value="">Select Type of Project</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Pre-wedding">Pre-wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Product">Product</option>
                    <option value="Music Video">Music Video</option>
                    <option value="YouTube/Content Creation">YouTube / Content Creation</option>
                    <option value="Event">Event</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Short Film">Short Film</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                {/* 6. Main Purpose of Video */}
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', color: '#444' }}>What is the main purpose of the video? *</span>
                  <select name="video_purpose" required style={selectStyle}>
                    <option value="">Select Main Purpose</option>
                    <option value="Social Media">Social Media</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Personal Memories">Personal Memories</option>
                    <option value="Corporate Presentation">Corporate Presentation</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                {/* 7. Type of Final Video */}
                <div style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px', color: '#444' }}>
                    What type of final video do you need? *
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '4px 0' }}>
                    {[
                      'Short Reel',
                      'Highlight Video',
                      'Full-Length Video',
                      'Cinematic Film',
                      'Documentary Style',
                      'Promotional Video',
                      'Other',
                    ].map((option) => (
                      <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#333', cursor: 'pointer', userSelect: 'none' }}>
                        <input
                          type="checkbox"
                          name="video_type"
                          value={option}
                          style={{ accentColor: '#1a1a1a', width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 8. Require Photos along with Videography */}
                <div style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px', color: '#444' }}>
                    Do you require photos along with videography? *
                  </span>
                  <div style={{ display: 'flex', gap: '32px', alignItems: 'center', height: '38px', paddingLeft: '4px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#333', cursor: 'pointer' }}>
                      <input type="radio" name="require_photos" value="yes" required style={{ accentColor: '#1a1a1a', width: '17px', height: '17px', cursor: 'pointer' }} />
                      Yes
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#333', cursor: 'pointer' }}>
                      <input type="radio" name="require_photos" value="no" style={{ accentColor: '#1a1a1a', width: '17px', height: '17px', cursor: 'pointer' }} />
                      No
                    </label>
                  </div>
                </div>

                {/* 9. Message / Additional Requirements (Optional) */}
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', color: '#444' }}>
                    Message / Special Requirements (Optional)
                  </span>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Provide any details about dates, locations, or special requests..."
                    style={{ ...fieldStyle, resize: 'vertical', minHeight: '110px' }}
                  />
                </label>

                {/* 10. Submit Button */}
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <button
                    type="submit"
                    disabled={isSending}
                    style={{
                      padding: '15px 44px',
                      background: '#1a1a1a',
                      color: '#fff',
                      border: 'none',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      cursor: isSending ? 'not-allowed' : 'pointer',
                      opacity: isSending ? 0.6 : 1,
                      borderRadius: '1px',
                      transition: 'background 0.2s ease, transform 0.2s ease, opacity 0.2s ease',
                      width: '100%',
                      maxWidth: '320px',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSending) e.currentTarget.style.background = '#333';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSending) e.currentTarget.style.background = '#1a1a1a';
                    }}
                  >
                    {isSending ? 'Sending...' : 'Submit Inquiry'}
                  </button>
                  {statusMessage && (
                    <p
                      style={{
                        marginTop: '16px',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        textAlign: 'center',
                        color: statusMessage.type === 'success' ? '#15803d' : '#b91c1c',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {statusMessage.text}
                    </p>
                  )}
                </div>
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
      <footer style={{ textAlign: 'center', padding: '48px 24px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.7rem', color: '#8c8c8c', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        &copy; 2024 blurlensfilms — All Rights Reserved
      </footer>
    </>
  );
}

const fieldStyle = {
  width: '100%',
  padding: '11px 14px',
  border: '1px solid #e2e2e2',
  borderRadius: '2px',
  background: '#ffffff',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: '0.88rem',
  color: '#1a1a1a',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};

const selectStyle = {
  ...fieldStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 14px center',
  backgroundSize: '10px auto',
  paddingRight: '38px',
  cursor: 'pointer',
};
import React from 'react';

const styles = {
  header: { textAlign: 'center', padding: '52px 24px 28px' },
  logo: {
    fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
    fontSize: 'clamp(2.4rem, 6.5vw, 3.8rem)',
    fontStyle: 'italic',
    fontWeight: 500,
    letterSpacing: '-0.02em',
    color: '#1a1a1a',
    textDecoration: 'none',
    display: 'inline-block',
  },
  tagline: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.74rem',
    fontWeight: 500,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: '#8c7b60',
    marginTop: '6px',
    marginBottom: '32px',
  },
  nav: { display: 'flex', justifyContent: 'center', gap: '38px' },
  link: {
    background: 'none',
    border: 'none',
    padding: '4px 0',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.74rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: '#888',
    cursor: 'pointer',
    transition: 'color 0.2s ease, border-color 0.2s ease',
    borderBottom: '1.5px solid transparent',
  },
  activeLink: {
    color: '#1a1a1a',
    fontWeight: 600,
    borderBottom: '1.5px solid #1a1a1a',
  },
};

export default function Header({ onAboutClick, onPortfolioClick, activeView }) {
  return (
    <header style={styles.header}>
      <a href="/" style={styles.logo}>blurlensfilms</a>
      <p style={styles.tagline}>Editorial stories in light and color</p>
      <nav style={styles.nav}>
        <button type="button" onClick={onAboutClick} style={{ ...styles.link, ...(activeView === 'about' ? styles.activeLink : null) }}>
          About Us
        </button>
        {/* Portfolio tab temporarily hidden — uncomment to re-enable:
        <button type="button" onClick={onPortfolioClick} style={{ ...styles.link, ...(activeView === 'portfolio' ? styles.activeLink : null) }}>
          Portfolio
        </button>
        */}
        <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('navigate-contact'))} style={{ ...styles.link, ...(activeView === 'contact' ? styles.activeLink : null) }}>
          Contact
        </button>
      </nav>
    </header>
  );
}
import React from 'react';

const styles = {
  header: { textAlign: 'center', padding: '48px 24px 24px' },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 6vw, 3.2rem)',
    fontStyle: 'italic',
    fontWeight: 400,
    letterSpacing: '-1px',
    color: '#1a1a1a',
    textDecoration: 'none',
    display: 'inline-block',
  },
  tagline: {
    fontSize: '0.82rem',
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    color: '#7a6a4d',
    marginBottom: '24px',
  },
  nav: { display: 'flex', justifyContent: 'center', gap: '40px' },
  link: {
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: '0.78rem',
    fontWeight: 400,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: '#888',
    cursor: 'pointer',
  },
  activeLink: { color: '#1a1a1a' },
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
        <button type="button" onClick={onPortfolioClick} style={{ ...styles.link, ...(activeView === 'portfolio' ? styles.activeLink : null) }}>
          Portfolio
        </button>
        <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('navigate-contact'))} style={{ ...styles.link, ...(activeView === 'contact' ? styles.activeLink : null) }}>
          Contact
        </button>
      </nav>
    </header>
  );
}
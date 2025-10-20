import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/menu.css';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  
  // Use React Router's useLocation hook to get current path
  const location = useLocation();
  const currentPage = location.pathname;

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
      setIsAnimating(true);
    } else {
      closeMenu();
    }
  };

  const closeMenu = () => {
    setIsAnimating(false);
    setTimeout(() => setMenuOpen(false), 400);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target) && 
        overlayRef.current && overlayRef.current.contains(e.target)) {
      closeMenu();
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') closeMenu();
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const menuItems = [
    { label: 'Home', href: '/', icon: 'home', color: '#4285f4' },
    { label: 'About', href: '/about', icon: 'info', color: '#34a853' },
    { label: 'Contact Us', href: '/contact', icon: 'contact_mail', color: '#ea4335' },
    { label: 'Frank AI', href: '/chat', icon: 'smart_toy', color: '#fbbc05'},
    { label: 'Projects', href: '/projects', icon: 'folder_open', color: '#8e44ad' },
  ];

  const isAIPage = (href) => href === '/chat';

  return (
    <>
      {/* Animated Background Particles */}
      {menuOpen && (
        <div className="menu-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Desktop Fixed Icon */}
      {!isMobile && (
        <div className="desktop-menu-icon">
          <div 
            className={`desktop-toggle ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            tabIndex={0}
          >
            <div className="desktop-hamburger">
              <span className="desktop-line line-1"></span>
              <span className="desktop-line line-2"></span>
              <span className="desktop-line line-3"></span>
            </div>
            <div className="desktop-glow"></div>
          </div>
        </div>
      )}

      {/* Mobile Chip Menu */}
      {isMobile && (
        <div className="mobile-chip-menu">
          <div 
            className={`chip-toggle ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            tabIndex={0}
          >
            <div className="chip-icon">
              <span className="chip-dot"></span>
              <span className="chip-dot"></span>
              <span className="chip-dot"></span>
            </div>
            <span className="chip-text">menu</span>
            <div className="chip-glow"></div>
          </div>
        </div>
      )}

      {/* Enhanced Overlay */}
      {menuOpen && (
        <div 
          className={`menu-overlay ${isAnimating ? 'entering' : 'exiting'}`}
          ref={overlayRef}
        >
          <div className="overlay-glow"></div>
        </div>
      )}

      {/* Side Menu */}
      <nav
        className={`side-menu ${menuOpen ? 'open' : ''} ${isAnimating ? 'entering' : 'exiting'}`}
        ref={menuRef}
        aria-hidden={!menuOpen}
      >
        {/* Menu Header with Enhanced Design */}
        <div className="menu-header">
          <div className="menu-logo">
            <div className="logo-orb">
              <span className="logo-icon">⚡</span>
              <div className="logo-glow"></div>
            </div>
            <div className="logo-text-container">
              <span className="logo-text">Frank AI</span>
              <span className="logo-subtitle">Developer & AI Specialist</span>
            </div>
          </div>
          <button 
            className="menu-close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span className="close-icon">
              <span className="close-line"></span>
              <span className="close-line"></span>
            </span>
            <div className="close-glow"></div>
          </button>
        </div>

        {/* Enhanced Menu Content */}
        <div className="menu-content">
          <div className="menu-background">
            <div className="menu-wave wave-1"></div>
            <div className="menu-wave wave-2"></div>
          </div>

          <ul className="menu-list">
            {menuItems.map((item, index) => (
              <li 
                key={item.label} 
                className={`menu-item ${isAIPage(item.href) ? 'ai-highlighted' : ''} ${currentPage === item.href ? 'current-page' : ''}`}
              >
                <Link
                  to={item.href}
                  className="menu-link"
                  onClick={closeMenu}
                  style={{ 
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={() => setActiveHover(item.label)}
                  onMouseLeave={() => setActiveHover(null)}
                >
                  <div className="menu-item-background"></div>
                  <div className="menu-item-content">
                    <span 
                      className="material-icons menu-item-icon"
                      style={{ color: item.color }}
                    >
                      {item.icon}
                    </span>
                    <span className="menu-item-text">{item.label}</span>
                  </div>
                  <div className="menu-link-hover"></div>
                  <div className="menu-item-arrow">→</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Enhanced Menu Footer */}
        <div className="menu-footer">
          <div className="status-indicator">
            <div className="status-orb">
              <div className="status-glow"></div>
            </div>
            <div className="status-info">
              <span className="status-text">System Online</span>
              <span className="status-subtext">Ready to create</span>
            </div>
          </div>
          <div className="menu-decoration">
            <div className="decoration-dot"></div>
            <div className="decoration-dot"></div>
            <div className="decoration-dot"></div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
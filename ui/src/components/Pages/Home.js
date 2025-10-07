import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight, FaCode, FaRobot, FaGlobeAfrica } from 'react-icons/fa';
import './styles/home.css'; // Make sure this file exists

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const homeRef = useRef(null);

  const words = ['JavaScript Developer', 'AI/ML Engineer', 'Python Specialist', 'Problem Solver'];
  const stats = [
    { number: '6+', label: 'Projects Completed' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '∞', label: 'Passion for AI' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startTypingAnimation();
        }
      },
      { threshold: 0.1 } // Reduced threshold for better detection
    );

    if (homeRef.current) {
      observer.observe(homeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startTypingAnimation = () => {
    if (words.length === 0) return;
    
    let currentWord = words[currentWordIndex];
    let i = 0;
    
    const typeWriter = () => {
      if (i < currentWord.length) {
        setTypedText(currentWord.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          setTypedText('');
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    };
    
    typeWriter();
  };

  // Rest of your component remains the same...
  const quickLinks = [
    { 
      title: 'About Me', 
      href: '/about', 
      icon: '👤',
      description: 'Learn about my journey and skills',
      color: '#4285f4'
    },
    { 
      title: 'My Projects', 
      href: '/projects', 
      icon: '💻',
      description: 'Explore my AI and web projects',
      color: '#34a853'
    },
    { 
      title: 'Contact Me', 
      href: '/contact', 
      icon: '📬',
      description: 'Get in touch for collaborations',
      color: '#ea4335'
    }
  ];

  const technologies = [
    { name: 'JavaScript', icon: '⚡' },
    { name: 'Python', icon: '🐍' },
    { name: 'React', icon: '⚛️' },
    { name: 'AI/ML', icon: '🤖' },
    { name: 'NLP', icon: '💬' },
    { name: 'TensorFlow', icon: '🔢' }
  ];

  return (
    <div 
      className={`home-container ${isVisible ? 'visible' : ''}`}
      ref={homeRef}
    >
      {/* Animated Background Elements */}
      <div className="home-bg-orb orb-1"></div>
      <div className="home-bg-orb orb-2"></div>
      <div className="home-bg-orb orb-3"></div>
      
      <div className="home-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-badge">
            <FaGlobeAfrica className="badge-icon" />
            Based in Dowa, Malawi
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Hello, I'm Frank</span>
            <span className="title-accent">
              <span className="typed-text">{typedText}</span>
              <span className="typing-cursor">|</span>
            </span>
          </h1>
          
          <p className="hero-description">
            I'm a passionate <strong>JavaScript web developer</strong> and experienced{' '}
            <strong>Python AI/ML engineer</strong> creating intelligent solutions that 
            bridge technology and real-world challenges.
          </p>

          {/* Quick Stats */}
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="stat-item"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <Link to="/projects" className="cta-button primary">
              <span>View My Work</span>
              <FaArrowRight className="button-icon" />
            </Link>
            <Link to="/contact" className="cta-button secondary">
              <span>Get In Touch</span>
            </Link>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="tech-section">
          <h3 className="section-title">
            <FaCode className="title-icon" />
            Technologies I Work With
          </h3>
          <div className="tech-grid">
            {technologies.map((tech, index) => (
              <div 
                key={tech.name}
                className="tech-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="links-section">
          <h3 className="section-title">
            Explore My Portfolio
          </h3>
          <div className="links-grid">
            {quickLinks.map((link, index) => (
              <Link
                key={link.title}
                to={link.href}
                className="link-card"
                style={{ 
                  animationDelay: `${index * 0.15}s`
                }}
              >
                <div className="link-header">
                  <span className="link-icon">{link.icon}</span>
                  <h4 className="link-title">{link.title}</h4>
                </div>
                <p className="link-description">{link.description}</p>
                <div className="link-arrow">→</div>
                <div className="link-hover-effect"></div>
              </Link>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="social-section">
          <div className="social-content">
            <p className="social-text">
              Check out my open-source work and community contributions
            </p>
            <div className="social-links">
              <a href="https://github.com/frvnk900" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaGithub className="social-icon" />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/frank-kwizigira-22a79537a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_apple" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="social-icon" />
                <span>LinkedIn</span>
              </a>
              <a href="https://x.com/frvnk900k?t=2tUwvVIxDWoKNTXAg857nA&s=09" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="social-icon" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
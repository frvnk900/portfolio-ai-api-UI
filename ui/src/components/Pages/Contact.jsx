import React, { useState, useEffect } from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaEnvelope,
  FaPaperPlane
} from 'react-icons/fa';
import './styles/contact.css';

const email = 'frvnkkwizigira@gmail.com';

const openGmailCompose = () => {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=Hello%20Frank&body=I%20would%20like%20to%20get%20in%20touch...`;
  window.open(gmailUrl, '_blank');
};

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const socialLinks = [
    { icon: FaInstagram, href: "https://www.instagram.com/frvnk009?igsh=YzljYTk1ODg3Zg==", color: "#E4405F", label: "Instagram" },
    { icon: FaFacebookF, href: "https://www.facebook.com/share/15ZpCZ3ZTv/", color: "#1877F2", label: "Facebook" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/frank-kwizigira-22a79537a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", color: "#0A66C2", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/frvnk900", color: "#181717", label: "GitHub" },
    { icon: FaTwitter, href: "https://x.com/frvnk900k?t=2tUwwVlxDWokNTXAg857nA&s=09", color: "#1DA1F2", label: "Twitter" },
  ];

  return (
    <div className={`contact-container ${isVisible ? 'visible' : ''}`}>
      {/* Animated Background Elements */}
      <div className="background-orb orb-1"></div>
      <div className="background-orb orb-2"></div>
      <div className="background-orb orb-3"></div>
      
      <div className="contact-content">
        {/* Header Section */}
        <div className="contact-header">
          <div className="contact-badge">
            <span className="badge-dot"></span>
            Available for projects
          </div>
          <h2 className="contact-title">
            Let's Create Something 
            <span className="title-accent"> Amazing</span>
            <div className="title-underline"></div>
          </h2>
          <p className="contact-subtitle">
            Get in touch and let's discuss how we can bring your ideas to life
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="social-grid">
          {socialLinks.map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-card ${hoveredIcon === social.label ? 'hovered' : ''}`}
              aria-label={social.label}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredIcon(social.label)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div 
                className="social-icon-wrapper"
                style={{ '--hover-color': social.color }}
              >
                <social.icon className="social-icon" />
              </div>
              <span className="social-label">{social.label}</span>
              <div className="social-hover-effect"></div>
            </a>
          ))}
        </div>

        {/* Email CTA Section */}
        <div 
          className="email-cta"
          onClick={openGmailCompose}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === 'Enter') openGmailCompose(); }}
        >
          <div className="email-orb">
            <FaEnvelope className="email-orb-icon" />
            <div className="email-orb-glow"></div>
          </div>
          
          <div className="email-content">
            <h3 className="email-title">Ready to Start a Project?</h3>
            <p className="email-subtitle">Let's discuss your ideas and make them reality</p>
            <div className="email-button">
              <span>Send Message</span>
              <FaPaperPlane className="send-icon" />
            </div>
          </div>

          <div className="email-decoration">
            <div className="decoration-dot dot-1"></div>
            <div className="decoration-dot dot-2"></div>
            <div className="decoration-dot dot-3"></div>
          </div>
        </div>

        {/* Contact Info Footer */}
        <div className="contact-footer">
          <div className="contact-info">
            <div className="info-item">
              <span className="info-label">Response Time</span>
              <span className="info-value">Within 24 hours</span>
            </div>
            <div className="info-item">
              <span className="info-label">Availability</span>
              <span className="info-value status-available">Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
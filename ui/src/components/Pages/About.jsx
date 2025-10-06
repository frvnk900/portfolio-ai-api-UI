import React, { useState, useEffect, useRef } from 'react';
import './styles/about.css';
import profileImg from '../images/profile.jpg';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const aboutRef = useRef(null);

  const fullText = "About Me";
  const description = `I am a passionate Python ai software and JavaScript web developer with extensive experience in building dynamic, user-centric web applications. Over the years, I have cultivated strong expertise in Natural Language Processing (NLP), Machine Learning (ML), Convolutional Neural Networks (CNN), and Artificial Intelligence (AI), enabling me to create innovative and intelligent solutions that drive business growth and improve user experiences.

In addition to my frontend and AI expertise, I am a skilled Python software developer specializing in data analysis and software engineering. My Python proficiency allows me to develop robust data-driven applications and analytical tools that transform raw data into actionable insights.

Based in Dowa, Malawi, I bring a global perspective combined with a deep understanding of local challenges and opportunities. I am committed to continuous learning and leveraging cutting-edge technologies to solve complex problems, optimize processes, and deliver high-impact results.

Whether working independently or collaborating within diverse teams, I prioritize clear communication, agile methodologies, and a user-first approach. I am always eager to connect with like-minded professionals and organizations to explore new projects, share knowledge, and contribute to the advancement of technology.`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          let i = 0;
          const typeWriter = () => {
            if (i < fullText.length) {
              setAnimatedText(fullText.substring(0, i + 1));
              i++;
              setTimeout(typeWriter, 100);
            }
          };
          typeWriter();
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
   
    { name: 'Python', level: 90, color: '#3776ab' },
    { name: 'React', level: 88, color: '#61dafb' },
    { name: 'AI/ML', level: 85, color: '#ff6b6b' },
    { name: 'NLP', level: 82, color: '#4ecdc4' },
    { name: 'Data Analysis', level: 88, color: '#45b7d1' },
     { name: 'JavaScript', level: 67, color: '#f7df1e' }
  ];

  return (
    <div 
      className={`about-container ${isVisible ? 'visible' : ''}`}
      ref={aboutRef}
    >
      {/* Animated Background Elements */}
      <div className="about-bg-orb orb-1"></div>
      <div className="about-bg-orb orb-2"></div>
      <div className="about-bg-orb orb-3"></div>

      <div className="about-content">
        {/* Profile Image Section */}
        <div className="profile-section">
          <div className="profile-image-wrapper">
            <div className="image-glow"></div>
            <img 
              src={profileImg} 
              alt="Frank Kwizigira - Web Developer & AI Specialist" 
              className="profile-image" 
            />
            <div className="profile-badge">
              <div className="badge-pulse"></div>
              <span>Available for Projects</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
 
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* About Text Section */}
        <div className="about-text-section">
          <div className="section-header">
            <h1 className="about-title">
              {animatedText}
              <span className="typing-cursor">|</span>
              <div className="title-underline"></div>
            </h1>
            <div className="location-tag">
              <span className="location-icon">📍</span>
              Dowa, Malawi
            </div>
          </div>

          <div className="about-description">
            {description.split('\n').map((paragraph, index) => (
              <p 
                key={index} 
                className="description-paragraph"
                style={{ animationDelay: `${0.5 + index * 0.2}s` }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Skills Progress */}
          <div className="skills-section">
            <h3 className="skills-title">Core Competencies</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="skill-item"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress"
                      style={{ 
                        width: `${skill.level}%`,
                        backgroundColor: skill.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="about-cta">
            <div className="cta-content">
              <h4>Ready to Bring Your Ideas to Life?</h4>
              <p>Let's collaborate on your next project</p>
              <button className="cta-button">
                <span>Start a Project</span>
                <div className="button-arrow">→</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
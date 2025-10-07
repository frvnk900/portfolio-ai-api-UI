import React, { useState, useEffect, useRef } from 'react';
import './projects.css';

// Simple icons fallback - using emojis if react-icons fails
const IconWrapper = ({ children, fallback }) => {
  return <span className="icon">{children || fallback}</span>;
};

const projects = [
  {
    title: 'AI Maize Disease Predictor',
    description: 'A KivyMD-based desktop AI application that predicts maize diseases using images. Powered by Python backend, LangChain, and ML.',
    github: 'https://github.com/frvnk900/AGRICULTURE_CORN_LEAF-ai-assitant.git',
    tech: ['Python', 'LangChain', 'KivyMD', 'CNN'],
    impact: 'Improves crop yields and food security by empowering farmers with accessible AI tools.',
    category: 'AI/ML',
    status: 'Completed',
    featured: true
  },
  {
    title: 'Flower Classifier (CNN)',
    description: 'A CNN-powered deep learning model that classifies flower species from images with high accuracy.',
    github: 'https://github.com/frvnk900/FlowerClassifier.git',
    tech: ['Python', 'TensorFlow', 'CNN', 'Deep Learning'],
    impact: 'Can be used in botanical studies and educational tools for identifying plant species.',
    category: 'Computer Vision',
    status: 'Completed'
  },
  {
    title: 'Skill & Organisation Matcher AI',
    description: 'An AI matching system that recommends ideal roles and organisations based on user skills and preferences.',
    github: 'https://github.com/frvnk900/Opportune.git',
    tech: ['LangChain', 'ReactJS', 'Flask', 'AI'],
    impact: 'Connects skilled individuals with the right opportunities, boosting employment outcomes.',
    category: 'AI Matching',
    status: 'In Progress',
    featured: true
  }
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(true); // Start visible for testing
  const [filter, setFilter] = useState('all');
  const projectsRef = useRef(null);

  const categories = ['all', 'AI/ML', 'Computer Vision', 'AI Matching'];

  // Simple visibility trigger - remove intersection observer for now
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10b981';
      case 'In Progress': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'AI/ML': return '🤖';
      case 'Computer Vision': return '👁️';
      case 'AI Matching': return '🔗';
      default: return '🚀';
    }
  };

  return (
    <div 
      className="projects-container"
      ref={projectsRef}
      style={{ 
        display: 'block',
        opacity: 1,
        transform: 'none'
      }}
    >
      {/* Simple background */}
      <div className="projects-bg"></div>

      <div className="projects-content">
        {/* Header Section */}
        <div className="projects-header">
          <div className="header-badge">
            <IconWrapper fallback="💻">💻</IconWrapper>
            Portfolio Showcase
          </div>
          <h2 className="projects-title">
            AI & Machine Learning
            <span className="title-accent"> Projects</span>
          </h2>
          <p className="projects-subtitle">
            Exploring the intersection of artificial intelligence and real-world problem solving
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="projects-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              <span className="filter-icon">
                {getCategoryIcon(category)}
              </span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card ${project.featured ? 'featured' : ''}`}
            >
              {project.featured && (
                <div className="featured-badge">⭐ Featured</div>
              )}

              <div className="project-header">
                <div className="project-category">
                  <span className="category-icon">
                    {getCategoryIcon(project.category)}
                  </span>
                  <span className="category-text">{project.category}</span>
                </div>
                <div 
                  className="project-status"
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status}
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  <h4 className="tech-title">
                    <IconWrapper fallback="🛠">🛠</IconWrapper>
                    Technologies
                  </h4>
                  <div className="tech-tags">
                    {project.tech.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="project-impact">
                  <h4 className="impact-title">
                    <IconWrapper fallback="💡">💡</IconWrapper>
                    Impact
                  </h4>
                  <p className="impact-text">{project.impact}</p>
                </div>
              </div>

              <div className="project-footer">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link github-link"
                >
                  <IconWrapper fallback="📁">📁</IconWrapper>
                  <span>View Code</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="projects-stats">
          <div className="stat-item">
            <div className="stat-number">{projects.length}+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5+</div>
            <div className="stat-label">Technologies</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Open Source</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
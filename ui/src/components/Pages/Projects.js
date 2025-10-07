import React, { useState, useEffect, useRef } from 'react';
import './styles/projects.css';
import { FaGithub, FaExternalLinkAlt, FaCode, FaLightbulb, FaChartLine } from 'react-icons/fa';

const projects = [
  {
    title: 'AI Maize Disease Predictor',
    description: 'A KivyMD-based desktop AI application that predicts maize diseases using images. Powered by Python backend, LangChain, and ML. Designed for local farmers and agriculture officers to diagnose crop issues and take action early.',
    github: 'https://github.com/frvnk900/AGRICULTURE_CORN_LEAF-ai-assitant.git',
    tech: ['Python', 'LangChain', 'KivyMD', 'CNN'],
    impact: 'Improves crop yields and food security by empowering farmers with accessible AI tools.',
    category: 'AI/ML',
    status: 'Completed',
    featured: true
  },
  {
    title: 'Flower Classifier (CNN)',
    description: 'A CNN-powered deep learning model that classifies flower species from images with high accuracy. Built to demonstrate practical CNN usage in botany and agriculture.',
    github: 'https://github.com/frvnk900/FlowerClassifier.git',
    tech: ['Python', 'TensorFlow', 'CNN', 'Deep Learning'],
    impact: 'Can be used in botanical studies and educational tools for identifying plant species.',
    category: 'Computer Vision',
    status: 'Completed'
  },
  {
    title: 'KivyMD Chatbot with Security',
    description: 'An intelligent chatbot built with KivyMD and Python, featuring secure message handling. Ideal for small-scale enterprise or personal assistant systems.',
    github: 'https://github.com/frvnk900/KIVYMD-CHAT_BOT-AI.git',
    tech: ['Python', 'KivyMD', 'Security', 'AI'],
    impact: 'Promotes safe AI-human communication with a focus on offline environments.',
    category: 'AI Chat',
    status: 'In Progress'
  },
  {
    title: 'AI Company Data Manager',
    description: 'AI system to manage company data and automate email communications between departments and clients. Focused on streamlining communication pipelines.',
    github: 'https://github.com/frvnk900/urban-engine-ai-assistant-company-manager.git',
    tech: ['Python', 'Email API', 'AI Workflow'],
    impact: 'Reduces human effort and improves data communication reliability in businesses.',
    category: 'Automation',
    status: 'Completed'
  },
  {
    title: 'Auto Email Responder & Sender',
    description: 'A smart system that reads incoming emails, understands the intent, and sends automated responses. Uses rule-based and ML-based models for decision-making.',
    github: 'https://github.com/frvnk900/AI-Emailer.git',
    tech: ['Python', 'NLP', 'Email API', 'ML'],
    impact: 'Speeds up customer support and automates follow-ups for busy professionals or companies.',
    category: 'NLP',
    status: 'Completed'
  },
  {
    title: 'Skill & Organisation Matcher AI',
    description: 'An AI matching system that recommends ideal roles and organisations based on user skills and preferences. Built using LangChain, React, and Flask.',
    github: 'https://github.com/frvnk900/Opportune.git',
    tech: ['LangChain', 'ReactJS', 'Flask', 'AI'],
    impact: 'Connects skilled individuals with the right opportunities, boosting employment outcomes.',
    category: 'AI Matching',
    status: 'In Progress',
    featured: true
  },
  {
    title: 'Rainfall Prediction using Scikit-learn',
    description: 'A machine learning model that predicts rainfall using historical weather data. Great for environmental forecasting and planning.',
    github: 'https://github.com/takenolab/MLStudents-Projects/tree/447771f70437d1eb05829af9c96fe13d22ae147c/Frank/rainfall%20logistic%20predictor',
    tech: ['Scikit-learn', 'Python', 'ML', 'Data Science'],
    impact: 'Helps farmers and planners prepare for climate conditions and prevent agricultural loss.',
    category: 'Data Science',
    status: 'Completed'
  }
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const projectsRef = useRef(null);

  const categories = ['all', 'AI/ML', 'Computer Vision', 'NLP', 'Automation', 'Data Science', 'AI Chat', 'AI Matching'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10b981';
      case 'In Progress': return '#f59e0b';
      case 'Planning': return '#6366f1';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'AI/ML': return '🤖';
      case 'Computer Vision': return '👁️';
      case 'NLP': return '💬';
      case 'Automation': return '⚡';
      case 'Data Science': return '📊';
      case 'AI Chat': return '💭';
      case 'AI Matching': return '🔗';
      default: return '🚀';
    }
  };

  return (
    <div 
      className={`projects-container ${isVisible ? 'visible' : ''}`}
      ref={projectsRef}
    >
      <div className="projects-content">
        {/* Header Section */}
        <div className="projects-header">
          <div className="header-badge">
            <FaCode className="badge-icon" />
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
                    <FaCode className="tech-icon" />
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
                    <FaLightbulb className="impact-icon" />
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
                  <FaGithub className="link-icon" />
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
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">7+</div>
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
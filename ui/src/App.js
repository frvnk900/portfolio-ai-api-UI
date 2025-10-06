import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Menu from './components/ui_compoents/menu';
 

import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Projects from './components/Pages/Projects';
import Home from './components/Pages/Home';
import ChatBot from './components/Pages/AIchatBot';

function App() {
  return (
    <Router>
      <div className="app">
        <Menu />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/chat" element={<ChatBot />} />
 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

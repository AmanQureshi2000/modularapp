import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Education from './Education';
import Achievements from './Achievements';
import Contact from './Contact';
import FractalTree from './FractalTree';
import Footer from './Footer';
import './styles/App.css';

function Portfolio() {
  return (
    <div style={{ background: 'black' }}>
      <Navbar />
      {/* Add paddingTop to account for fixed navbar height */}
      <div style={{ paddingTop: '80px' }}>
        <FractalTree />
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default Portfolio;

import React from 'react';
import resumeData from './data/resumeData';
import './styles/Hero.css'; 

export default function Hero() {
  const { name, contact } = resumeData;
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-gradient"></div>
      <div className="hero-content">
        <img
          src="https://ui-avatars.com/api/?name=Aman+Qureshi&background=0D8ABC&color=fff&size=128"
          alt="Profile"
          className="hero-profile-img"
        />
        <h1 className="hero-title">{name}</h1>
        <p className="hero-subtitle">Full Stack Engineer | Problem Solver | Rapid App Builder</p>
      </div>
    </section>
  );
}

import React from 'react';
import resumeData from './data/resumeData';
import './styles/Skills.css'; 

const categoryIcons = {
  frontend: 'bi bi-code-slash',
  backend: 'bi bi-hdd-network',
  databases: 'bi bi-database',
  versionControl: 'bi bi-git',
  other: 'bi bi-tools',
};

export default function Skills() {
  const { skills } = resumeData;
  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-title">Technical Skills</h2>
      <div className="skills-grid">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skills-category">
            <h4>
              <i className={categoryIcons[category] || 'bi bi-star'}></i> {category.charAt(0).toUpperCase() + category.slice(1)}
            </h4>
            <div className="skills-list">
              {items.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

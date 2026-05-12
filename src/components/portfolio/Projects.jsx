import React from 'react';
import resumeData from './data/resumeData';

export default function Projects() {
  const { projects } = resumeData;
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="project-list">
        {projects.map((proj, idx) => (
          <div key={idx} className="project-card">
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <div className="project-tags">
              {proj.technologies?.map((tech, i) => (
                <span key={i} className="tag">{tech}</span>
              ))}
            </div>
            {proj.url && proj.url !== '#' && (
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

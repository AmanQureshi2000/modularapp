import React from 'react';
import resumeData from './data/resumeData';

export default function Experience() {
  const { experience } = resumeData;
  return (
    <section id="experience">
      <h2>Experience</h2>
      {experience.map((exp, idx) => (
        <div key={idx} className="exp-card">
          <h3>{exp.role} – {exp.company}</h3>
          <p><em>{exp.duration}</em></p>
          <ul>
            {exp.achievements.map((point, i) => <li key={i}>{point}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}

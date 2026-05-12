import React from 'react';
import resumeData from './data/resumeData';

export default function Education() {
  const { education, certifications } = resumeData;
  return (
    <section id="education">
      <h2><i className="bi bi-mortarboard"></i> Education & Certifications</h2>
      <div className="education-list">
        {education.map((edu, idx) => (
          <div key={idx} className="education-card">
            <h3>{edu.degree}</h3>
            <p className="school">{edu.school}, {edu.location}</p>
            <p className="year"><em>{edu.year}</em></p>
          </div>
        ))}
      </div>
      <div className="certifications-list">
        <h4><i className="bi bi-patch-check"></i> Certifications</h4>
        <div className="certification-items">
          {certifications.map((cert, i) => <div key={i} className="certification-item">{cert}</div>)}
        </div>
      </div>
    </section>
  );
}

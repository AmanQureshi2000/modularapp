import React from 'react';
import resumeData from './data/resumeData.js';

export default function Achievements() {
  const { achievements } = resumeData;
  return (
    <section id="achievements">
      <h2><i className="bi bi-trophy"></i> Achievements</h2>
      <div className="achievements-list">
        {achievements.map((val, i) => (
          <div key={i} className="achievement-item">
            <i className="bi bi-award"></i>
            <span>{val}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

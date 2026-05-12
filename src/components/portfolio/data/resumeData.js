const resumeData = {
  name: "Aman Qureshi",
  contact: {
    phone: "9602408915",
    email: "amanq2000@gmail.com",
    linkedin: "https://linkedin.com/in/aman-qureshi-2319601b4",
  },
  education: [{
    degree: "B.Tech, Computer Science",
    school: "Dr. B.R. Ambedkar NIT Jalandhar",
    location: "Jalandhar, India",
    year: "2022"
  }],
  skills: {
    frontend: ["JavaScript (ES6+)", "React.js", "HTML5", "CSS3", "Bootstrap"],
    backend: ["Node.js", "PHP (Yii Framework)"],
    databases: ["MongoDB", "PostgreSQL"],
    versionControl: ["Git", "GitLab", "SCM"],
    other: ["VSCode", "GitBash", "Postman", "Appsmith"]
  },
  experience: [{
    role: "Engineer",
    company: "IndiaMART InterMESH Limited",
    duration: "May 2022 - Jan 2025",
    achievements: [
      "Developed full-stack apps with React.js, Node.js, PHP; improved system efficiency by 30%",
      "Designed 20+ UI components; increased user engagement by 25%",
      "Optimized PostgreSQL queries; 40% better performance",
      "Led debugging that reduced production issues by 30%",
      "Built 70+ low-code apps via Appsmith",
    ],
  }],
  projects: [
    {
      title: "CRM (Internal Ticketing System)",
      description: "Built core features, optimized UI, implemented IMAP cron jobs for auto ticketing.",
      technologies: ["React.js", "Node.js", "PHP", "IMAP"],
      url: "#"
    },
    {
      title: "Appsmith (Low Code Development)",
      description: "Dashboards with JS/SQL, CRUD apps with APIs, SMTP email reports.",
      technologies: ["Appsmith", "JavaScript", "SQL", "SMTP"],
      url: "#"
    },
    {
      title: "Standard Product Module",
      description: "Data dashboard for user metrics, filtered, with dynamic charts.",
      technologies: ["React.js", "PHP", "PostgreSQL", "Chart.js"],
      url: "#"
    },
    {
      title: "Youtuber Data App",
      description: "Data dashboard for youtube channels, showing subscribers, views and other data",
      technologies: ["React.js", "Node.js", "YouTube API"],
      url: "https://youtubeapp-nb35.onrender.com/"
    }
  ],
  achievements: ["‘Pillar of Success of the Month’ at IndiaMART, Aug 2023"],
  certifications: ["MERN Stack Development – Angela Yu, Udemy"]
};

export default resumeData;

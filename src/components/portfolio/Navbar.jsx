import React,{useState,useEffect} from 'react';
import { MdEmail } from 'react-icons/md';
import { FaLinkedin } from "react-icons/fa";
import { FaMedium } from "react-icons/fa";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null; // Hide on mobile
  return (
    <nav style={{
    textAlign: 'center',
    color: '#000000e2',
    position: 'fixed',
    width: '100%',
    top: 0,
    backgroundColor: 'black',
    zIndex: 1000, // Add this to stay above other content
    fontWeight: 'bold',
  }}>
      <div>
          <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#achievements">Achievements</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <a href="mailto:amanq2000@gmail.com"
              target="_blank" 
              rel="noopener noreferrer" 
              title=""
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <MdEmail size={20} />
            </a>
          </li>
          <li>
            <a 
              href="https://www.linkedin.com/in/aman-qureshi-2319601b4/" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Visit my LinkedIn"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
            >
              <FaLinkedin size={20} />
            </a>
          </li>
          <li>
            <a 
              href="https://medium.com/@amanq2000"
              target="_blank" 
              rel="noopener noreferrer" 
              title="Visit my Medium"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
            >
              <FaMedium size={20} />
            </a>
          </li>
        </ul>
      </div> 
    </nav>
  );
}

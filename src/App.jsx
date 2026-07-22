import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import foregroundImg from './assets/Gemini_Generated_Image_qm97ngqm97ngqm97-removebg-preview.png';
import github from './assets/github.png';
import insta from './assets/instagram.png';
import docker from './assets/social.png'
import react from './assets/programing.png';
import microservices from './assets/R.png';
import aws from './assets/amazon-web-services-logo-d111.png';
import cursor from './assets/Cursor-Ai-Logo-PNG-SVG-Vector.png';
import leetcode from './assets/leetcode-logo_brandlogos.net_c4kgx.png';
import ai from './assets/robot-ai.png';
import Achievements from './Achievements';
import Portfolio from './Portfolio';
import Connect from './Connect';
import TypingText from './TypingText';

function Home() {
  return (
    <div>
      <div className="banner">
        <TypingText />
        <div className="ring ring-outer"></div>
        <div className="ring ring-inner"></div>

        {/* Outer Orbit - 3 Images */}
        <img src={github} alt="outer-orbit-1" className="orbit-icon icon-outer" style={{ filter: 'invert(1)', animationDelay: '0s' }} />
        <img src={insta} alt="outer-orbit-2" className="orbit-icon icon-outer" style={{ animationDelay: '-2s' }} />
        <img src={docker} alt="outer-orbit-3" className="orbit-icon icon-outer" style={{ animationDelay: '-4s' }} />
        <img src={react} alt="outer-orbit-4" className="orbit-icon icon-outer" style={{ animationDelay: '-6s' }} />
        <img src={microservices} alt="outer-orbit-5" className="orbit-icon icon-outer" style={{ filter: 'invert(1)', width: '40px', height: '40px', animationDelay: '-8s' }} />

        {/* Inner Orbit - 3 Images */}
        <img src={aws} alt="inner-orbit-1" className="orbit-icon icon-inner" style={{ animationDelay: '0s' }} />
        <img src={cursor} alt="inner-orbit-2" className="orbit-icon icon-inner" style={{ animationDelay: '-2s' }} />
        <img src={leetcode} alt="inner-orbit-3" className="orbit-icon icon-inner" style={{ animationDelay: '-4s' }} />
        <img src={ai} alt="inner-orbit-4" className="orbit-icon icon-inner" style={{ animationDelay: '-6s' }} />

        {/* Foreground Image */}
        <img src={foregroundImg} alt="foreground" className="bottom-right-image" />
      </div>
    </div>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <BrowserRouter>
      <header className="header-container">
        <div className="home-logo">
          <Link to="/">Home</Link>
        </div>
        
        <div className={`hamburger ${isSidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <nav className={`nav-bar ${isSidebarOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/portfolio" onClick={closeSidebar}>Portfolio</Link></li>
            <li><Link to="/about" onClick={closeSidebar}>About</Link></li>
            <li><Link to="/connect" onClick={closeSidebar}>Connect</Link></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<Achievements />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

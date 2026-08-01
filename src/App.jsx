import { useState, useEffect } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SocialFAB from './SocialFAB';
import './index.css';
import foregroundImg from './assets/Gemini_Generated_Image_qm97ngqm97ngqm97-removebg-preview.png';
import GithubIcon from './icons/GithubIcon';
import InstagramIcon from './icons/InstagramIcon';
import DockerIcon from './icons/DockerIcon';
import ReactIcon from './icons/ReactIcon';
import AwsIcon from './icons/AwsIcon';
import CursorAI from './icons/CursorAI';
import LeetCodeIcon from './icons/LeetCodeIcon';
import microservices from './assets/R.png';
import ai from './assets/robot-ai.png';
import About from './About';
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

        {/* Outer Orbit - 5 Images */}
        <div className="orbit-icon icon-outer flex items-center justify-center" style={{ animationDelay: '0s' }}>
          <GithubIcon size={35} className="text-white" />
        </div>
        <div className="orbit-icon icon-outer flex items-center justify-center" style={{ animationDelay: '-2s' }}>
          <InstagramIcon size={35} />
        </div>
        <div className="orbit-icon icon-outer flex items-center justify-center" style={{ animationDelay: '-4s' }}>
          <DockerIcon size={35} />
        </div>
        <div className="orbit-icon icon-outer flex items-center justify-center" style={{ animationDelay: '-6s' }}>
          <ReactIcon size={35} />
        </div>
        <img src={microservices} alt="outer-orbit-5" className="orbit-icon icon-outer" style={{ filter: 'invert(1)', width: '40px', height: '40px', animationDelay: '-8s' }} />

        {/* Inner Orbit - 4 Images */}
        <div className="orbit-icon icon-inner flex items-center justify-center" style={{ animationDelay: '0s' }}>
          <AwsIcon size={35} />
        </div>
        <div className="orbit-icon icon-inner flex items-center justify-center" style={{ animationDelay: '-2s', filter: 'invert(1)' }}>
          <CursorAI size={35} />
        </div>
        <div className="orbit-icon icon-inner flex items-center justify-center" style={{ animationDelay: '-4s' }}>
          <LeetCodeIcon size={35} />
        </div>
        <img src={ai} alt="inner-orbit-4" className="orbit-icon icon-inner" style={{ animationDelay: '-6s' }} />

        {/* Foreground Image */}
        <img src={foregroundImg} alt="foreground" className="bottom-right-image" />
      </div>
      <SocialFAB />
    </div>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // if (prefersReducedMotion) {
    //   document.body.classList.add('reduce-motion');
    // } else {
    //   document.body.classList.remove('reduce-motion');
    // }
  }, [prefersReducedMotion]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <BrowserRouter>
      <header className="header-container">
        <div className="home-logo bg-white/10 backdrop-blur-md border border-solid border-white/20 rounded-[50px] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <Link to="/">Home</Link>
        </div>

        <div
          className="flex lg:hidden flex-col justify-center items-center gap-[6px] w-[50px] h-[50px] z-[1001] cursor-pointer bg-white/10 backdrop-blur-md rounded-full border border-solid border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300"
          onClick={toggleSidebar}
        >
          <span className={`w-[25px] h-[3px] bg-white rounded-sm transition-all duration-300 ${isSidebarOpen ? 'translate-y-[9px] rotate-45' : ''}`}></span>
          <span className={`w-[25px] h-[3px] bg-white rounded-sm transition-all duration-300 ${isSidebarOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-[25px] h-[3px] bg-white rounded-sm transition-all duration-300 ${isSidebarOpen ? '-translate-y-[9px] -rotate-45' : ''}`}></span>
        </div>

        <nav
          className={`nav-bar fixed lg:static top-0 transition-[right] duration-300 ease-in-out z-[1000] lg:z-auto flex-col lg:flex-row justify-center items-center h-screen lg:h-auto !w-[250px] lg:!w-[60%] !bg-black/70 backdrop-blur-md lg:!bg-white/10 !rounded-none lg:!rounded-[50px] !border-none lg:!border-solid lg:!border lg:!border-white/20 ${isSidebarOpen ? 'right-0' : '-right-full'} lg:right-auto`}
        >
          <ul className="nav-links !flex-col lg:!flex-row !justify-center lg:!justify-evenly items-center gap-10 lg:gap-0 h-full lg:h-auto w-full">
            <li><Link to="/portfolio" onClick={closeSidebar}>Portfolio</Link></li>
            <li><Link to="/about" onClick={closeSidebar}>About</Link></li>
            <li><Link to="/connect" onClick={closeSidebar}>Connect</Link></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

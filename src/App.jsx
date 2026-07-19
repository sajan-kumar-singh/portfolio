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

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Portfolio</a></li>
          <li><a href="/">Contact</a></li>
        </ul>
      </nav>
      <div className="banner">
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

export default App;

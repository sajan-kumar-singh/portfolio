import './index.css';

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
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="outer-orbit-1" className="orbit-icon icon-outer" style={{ filter: 'invert(1)', animationDelay: '0s' }} />
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="outer-orbit-2" className="orbit-icon icon-outer" style={{ filter: 'invert(1)', animationDelay: '-1s' }} />
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="outer-orbit-3" className="orbit-icon icon-outer" style={{ filter: 'invert(1)', animationDelay: '-2s' }} />
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="outer-orbit-4" className="orbit-icon icon-outer" style={{ filter: 'invert(1)', animationDelay: '-3s' }} />
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="outer-orbit-4" className="orbit-icon icon-outer" style={{ filter: 'invert(1)', animationDelay: '-4s' }} />

        {/* Inner Orbit - 3 Images */}
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="inner-orbit-1" className="orbit-icon icon-inner" style={{ filter: 'invert(1)', animationDelay: '0s' }} />
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="inner-orbit-2" className="orbit-icon icon-inner" style={{ filter: 'invert(1)', animationDelay: '-1s' }} />
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="inner-orbit-3" className="orbit-icon icon-inner" style={{ filter: 'invert(1)', animationDelay: '-2s' }} />
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="inner-orbit-4" className="orbit-icon icon-inner" style={{ filter: 'invert(1)', animationDelay: '-3s' }} />
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './index.css';

// Using existing images as placeholders so your app doesn't crash. 
// You can rename these imports to your actual image files!
import img1 from './assets/full stack architect.png';
import img2 from './assets/Entrepreneur.png';
import img3 from './assets/Trader.png';
import img4 from './assets/Gamer.png';

const aboutData = [
  {
    id: 1,
    img: img1,
    text: "I am full stack architect who build whole system.",
    details: "This is a detailed paragraph about my journey as a full stack architect. I have built entire systems from the ground up, focusing on scalability, clean architecture, and modern best practices to deliver top-tier products.",
  },
  {
    id: 2,
    img: img2,
    text: "I am an entrepreneur who will bring green revolution 2.0.",
    details: "Being an entrepreneur means constantly looking for ways to innovate. My vision for the green revolution 2.0 involves leveraging technology to create sustainable, eco-friendly solutions that will have a lasting positive impact on our planet.",
  },
  {
    id: 3,
    img: img3,
    text: "I am a trader who pull profit from stock market.",
    details: "Trading is an art that requires patience, discipline, and a deep understanding of market mechanics. Over the years, I have developed strategies to navigate volatility and consistently pull profit from the stock market.",
  },
  {
    id: 4,
    img: img4,
    text: "I am a gamer who plays for idendity not fun.",
    details: "Gaming is more than just entertainment to me; it's a way to build identity, community, and strategy. I approach gaming with a competitive mindset, constantly analyzing mechanics to master every challenge.",
  }
];

const DetailComponent = ({ text }) => {
  return (
    <div className="detail-text-container">
      <p>{text}</p>
    </div>
  );
};

const ExpandableCard = ({ data, isExpanded, onToggle, slideDirection }) => {
  return (
    <div className={`about-card ${isExpanded ? 'expanded' : ''} ${!isExpanded && slideDirection ? 'animate-' + slideDirection : ''}`}>
      {/* Back Button (only visible when expanded) */}
      {isExpanded && (
        <button className="back-btn" onClick={onToggle} aria-label="Go back">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      )}

      {/* Image */}
      <img
        src={data.img}
        alt="About visual"
        className={`about-card-img ${!isExpanded ? 'cursor-pointer' : ''}`}
        onClick={!isExpanded ? onToggle : undefined}
      />

      {/* Default List View Text Section */}
      {!isExpanded && (
        <div 
          className="about-card-text-container cursor-pointer"
          onClick={onToggle}
        >
          <div className="about-card-text">
            <p>{data.text}</p>
          </div>
          <button
            className="about-card-btn"
            aria-label="Read more"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Detail Component */}
      {isExpanded && <DetailComponent text={data.details} />}
    </div>
  );
};

export default function About() {
  const [selectedId, setSelectedId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');

  const handleNext = () => {
    setSlideDirection('slide-left');
    setCurrentIndex((prev) => (prev === aboutData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setSlideDirection('slide-right');
    setCurrentIndex((prev) => (prev === 0 ? aboutData.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (slideDirection) {
      const timer = setTimeout(() => setSlideDirection(''), 500);
      return () => clearTimeout(timer);
    }
  }, [slideDirection]);

  const currentItem = aboutData[currentIndex];

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-12 overflow-x-hidden" style={{ marginTop: '100px' }}>
      
      <div className="flex items-center justify-between w-full mx-auto px-2 lg:px-6">
        
        {/* Left Arrow */}
        <div className={`w-12 lg:w-20 flex-shrink-0 flex justify-center transition-opacity duration-300 ${selectedId ? 'invisible opacity-0' : 'opacity-100'}`}>
          <button 
            onClick={handlePrev} 
            className="p-2 lg:p-3 bg-gray-800/90 rounded-full hover:bg-gray-700 transition outline-none cursor-pointer"
            aria-label="Previous image"
            disabled={!!selectedId}
          >
            <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Center Card Wrapper */}
        <div className="flex-grow overflow-hidden relative" key={currentItem.id}>
          <ExpandableCard 
            data={currentItem} 
            isExpanded={selectedId === currentItem.id}
            onToggle={() => setSelectedId(selectedId === currentItem.id ? null : currentItem.id)}
            slideDirection={slideDirection}
          />
        </div>

        {/* Right Arrow */}
        <div className={`w-12 lg:w-20 flex-shrink-0 flex justify-center transition-opacity duration-300 ${selectedId ? 'invisible opacity-0' : 'opacity-100'}`}>
          <button 
            onClick={handleNext} 
            className="p-2 lg:p-3 bg-gray-800/90 rounded-full hover:bg-gray-700 transition outline-none cursor-pointer"
            aria-label="Next image"
            disabled={!!selectedId}
          >
            <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}

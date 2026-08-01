import React, { useState, useEffect } from 'react';
import './index.css';

import SkillsOverview from './SkillsOverview';
import Experience from './Experience';
import Recommendations from './Recommendations';

import aboutData from './data.json';



const ContentCard = ({ data, slideDirection, handlePrev, handleNext, hasMultiple }) => {
  return (
    <div className={`about-card expanded ${slideDirection ? 'animate-' + slideDirection : ''}`}>
      {/* Image Wrapper */}
      <div className="relative w-full custom-p-4">
        <img
          src={data.image || data.img}
          alt="About visual"
          className="about-card-img"
        />
      </div>

      {/* Experience Component */}
      <Experience experienceData={data.experience} />

      {/* Detail Component */}
      <SkillsOverview skillsData={data.skills} />

      {/* Recommendations Component */}
      <Recommendations recommendationsData={data.recommendations} />
    </div>
  );
};

export default function About() {
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

      {/* Fixed Left Arrow */}
      {aboutData.length > 1 && (
        <button
          onClick={handlePrev}
          className="fixed left-2 lg:left-6 top-1/2 -translate-y-1/2 p-2 lg:p-3 bg-gray-800/90 rounded-full hover:bg-gray-700 transition outline-none cursor-pointer z-50 text-white shadow-lg"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Fixed Right Arrow */}
      {aboutData.length > 1 && (
        <button
          onClick={handleNext}
          className="fixed right-2 lg:right-6 top-1/2 -translate-y-1/2 p-2 lg:p-3 bg-gray-800/90 rounded-full hover:bg-gray-700 transition outline-none cursor-pointer z-50 text-white shadow-lg"
          aria-label="Next image"
        >
          <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div className="w-full mx-auto px-2 lg:px-6">

        {/* Center Card Wrapper */}
        <div className="overflow-hidden relative" key={currentItem.id}>
          <ContentCard
            data={currentItem}
            slideDirection={slideDirection}
            handlePrev={handlePrev}
            handleNext={handleNext}
            hasMultiple={aboutData.length > 1}
          />
        </div>

      </div>
    </div>
  );
}

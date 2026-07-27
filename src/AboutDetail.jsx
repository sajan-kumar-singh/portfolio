import React from 'react';
import './index.css';

export default function AboutDetail({ data, onClose }) {
  // Helper for dynamic badge colors
  const badgeColors = {
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    green: "bg-green-500/10 border-green-500/20 text-green-400",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  };
  
  const pulseColors = {
    emerald: "bg-emerald-400",
    green: "bg-green-400",
    blue: "bg-blue-400",
    purple: "bg-purple-400",
  };

  const badgeClass = badgeColors[data.badgeColor] || badgeColors.emerald;
  const pulseClass = pulseColors[data.badgeColor] || pulseColors.emerald;

  return (
    <div className="about-detail-container w-full h-full custom-p-main flex flex-col animate-fade-in relative text-gray-100">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO HEADER & SHORT INTRO (WHO I AM)                        */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full flex flex-col items-center text-center space-y-3 custom-pb-6 border-b border-gray-800">
        <div className={`inline-flex items-center gap-2 custom-px-3-py-1 rounded-full border text-xs md:text-sm font-medium tracking-wide ${badgeClass}`}>
          <span className={`w-2 h-2 rounded-full animate-pulse ${pulseClass}`}></span>
          {data.badgeText}
        </div>
        
        <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {data.title}
        </h2>

        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl">
          {data.intro}
        </p>
      </div>

      <div className="w-full flex flex-col space-y-8 custom-pt-6">
        
        {/* ------------------------------------------------------------- */}
        {/* 2. PROFESSIONAL SUMMARY / STATS GRID                          */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {data.stats && data.stats.map((stat, idx) => (
            <div key={idx} className="custom-p-4 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-gray-700 transition text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">{stat.label}</div>
              <div className={`text-xl font-bold ${stat.valueColor || 'text-white'}`}>{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.subtext}</div>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. WHAT I BUILD & HOW I WORK                                  */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
            <span>⚡</span> {data.pillarsTitle}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.pillars && data.pillars.map((pillar, idx) => (
              <div key={idx} className="custom-p-4 rounded-xl bg-gray-900/40 border border-gray-800/80 text-center flex flex-col items-center">
                <h4 className="font-semibold text-white mb-2 text-sm flex items-center justify-center gap-2">
                  <span className={pillar.iconColor}>{pillar.icon}</span> {pillar.title}
                </h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4. TECH STACK OVERVIEW (CATEGORIZED CHIPS)                     */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
            <span>💻</span> Skills & Tools Overview
          </h3>
          
          <div className="custom-p-5 rounded-xl bg-gray-900/50 border border-gray-800 space-y-4">
            {data.skills && data.skills.map((skillGroup, idx) => (
              <div key={idx}>
                <div className="text-xs font-medium text-gray-400 mb-2 text-center">{skillGroup.category}</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {skillGroup.items.map((skill) => (
                    <span key={skill} className="custom-px-3-py-1 bg-gray-800/90 text-gray-200 text-xs rounded-full border border-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 5. EXPERIENCE & PERSONAL ANGLE                                */}
        {/* ------------------------------------------------------------- */}
        <div className="custom-p-5 rounded-xl bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900 border border-gray-800 space-y-2 text-center flex flex-col items-center">
          <h4 className="text-sm font-bold text-white flex items-center justify-center gap-2">
            <span>🚀</span> Personal Philosophy
          </h4>
          <p className="text-gray-300 text-xs leading-relaxed">
            {data.philosophy}
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 6. CALL TO ACTIONS (CTA & RESUME LINK)                       */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 custom-pt-2 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="custom-px-4-py-2 bg-white text-black hover:bg-gray-200 font-semibold text-xs rounded-lg transition cursor-pointer"
            >
              View Projects
            </button>
            <button 
              onClick={onClose}
              className="custom-px-4-py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs rounded-lg border border-gray-700 transition cursor-pointer"
            >
              Contact Me
            </button>
          </div>

          <a 
            href="#resume" 
            onClick={(e) => { e.preventDefault(); alert("Resume / CV download triggered!"); }}
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            <span>📄</span> Download CV / Resume
          </a>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 7. CENTERED BACK BUTTON AT THE BOTTOM                         */}
      {/* ------------------------------------------------------------- */}
      <div className="mt-8 w-full flex justify-center custom-pt-4-pb-2">
        <button 
          className="bg-gray-800/90 rounded-full hover:bg-gray-700 transition outline-none cursor-pointer text-white shadow-lg border border-gray-700/50" 
          style={{ padding: '12px' }}
          onClick={onClose} 
          aria-label="Go back"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>

    </div>
  );
}

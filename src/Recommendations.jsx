import React, { useState } from 'react';

// Data will be passed as a prop

const Card = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a href={item.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          height: '45vh', // Dynamic height based on screen height
          minHeight: '220px', // Fallback for very small screens
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: 'clamp(16px, 3vh, 32px) clamp(16px, 2vw, 32px)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isHovered ? '0 8px 20px rgba(255,255,255,0.2)' : 'none'
        }}
      >
        <h4 style={{ margin: '0 0 1vh 0', color: 'black', fontSize: 'clamp(1.1rem, 2.5vh, 1.6rem)' }}>{item.name}</h4>
        <span style={{ fontSize: 'clamp(0.85rem, 1.8vh, 1.1rem)', color: '#6b21a8', marginBottom: '2vh', fontWeight: 'bold' }}>{item.role}</span>

        {/* line-clamp increased since we have a taller dynamic card */}
        <p style={{
          margin: 0,
          color: '#333',
          fontSize: 'clamp(0.95rem, 2vh, 1.2rem)',
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 6,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          "{item.text}"
        </p>
      </div>
    </a>
  );
};

// Individual slot machine column
const Column = ({ data, direction }) => {
  const isUp = direction === 'up';
  const [isColumnHovered, setIsColumnHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsColumnHovered(true)}
      onMouseLeave={() => setIsColumnHovered(false)}
      style={{
        flex: 1,
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '12px',
        backgroundColor: 'black',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          padding: '10px',
          boxSizing: 'border-box',
          // Use the CSS animation defined below
          animation: `${isUp ? 'scrollUp' : 'scrollDown'} 15s linear infinite`,
          // This is the magic that pauses ONLY this column on hover
          animationPlayState: isColumnHovered ? 'paused' : 'running'
        }}
      >
        {/* Render the data twice to create a seamless infinite loop */}
        {[...data, ...data].map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

const Recommendations = ({ recommendationsData = [] }) => {
  if (!recommendationsData || recommendationsData.length < 6) return null;

  const remainder = recommendationsData.length % 3;
  let finalData = [...recommendationsData];

  if (remainder !== 0) {
    const itemsToAdd = 3 - remainder;
    for (let i = 0; i < itemsToAdd; i++) {
      finalData.push(finalData[i]);
    }
  }

  const chunkSize = finalData.length / 3;
  const dataSection1 = finalData.slice(0, chunkSize);
  const dataSection2 = finalData.slice(chunkSize, chunkSize * 2);
  const dataSection3 = finalData.slice(chunkSize * 2);

  return (
    <>
      {/* Define standard CSS animations for the infinite scroll */}
      <style>
        {`
          @keyframes scrollDown {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0%); }
          }
          @keyframes scrollUp {
            0% { transform: translateY(0%); }
            100% { transform: translateY(-50%); }
          }
        `}
      </style>

      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
        backgroundColor: 'black'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 4vh, 3.5rem)', fontWeight: 'bold', letterSpacing: '2px', margin: '0 0 10px 0' }}>Recommendations</h2>
        </div>

        {/* Casino Slot Machine Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0 40px',
          boxSizing: 'border-box',
          height: '75vh', // Uses 75% of viewport height
          maxHeight: '800px', // Safety cap on very large monitors
          gap: '40px',
          // The magic fading edge mask
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}>
          <Column data={dataSection1} direction="down" />
          <Column data={dataSection2} direction="up" />
          <Column data={dataSection3} direction="down" />
        </div>
      </div>
    </>
  );
};

export default Recommendations;

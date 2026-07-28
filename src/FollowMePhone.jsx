import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

import insta from './assets/insta.png';
import twitter from './assets/twitter.png';
import youtube from './assets/youtube.png';
import linkedin from './assets/icons8-linkedin-96.png';
import iphoneFrame from './assets/iphone-frame.webp';

export const statsData = [
  { id: 1, img: twitter, limit: 3, invert: false, url: 'https://x.com/SajanKu77443416' },
  { id: 2, img: linkedin, limit: 250, invert: false, url: 'https://www.linkedin.com/in/sajannkumarssingh/' },
  { id: 3, img: insta, limit: 750, invert: false, url: 'https://www.instagram.com/theimperfectace/' },
  { id: 4, img: youtube, limit: 2450, invert: false, url: 'https://www.youtube.com/@MyIdealWorld' },
];

export const StatItem = ({ img, limit, invert, url }) => {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // if (prefersReducedMotion) {
    //   // If they prefer reduced motion, skip the animation and set the final limit immediately
    //   setCount(limit);
    //   return;
    // }

    let start = 0;
    const duration = 2000;
    const increment = limit / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= limit) {
        setCount(limit);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [limit, prefersReducedMotion]);

  return (
    <div className="flex flex-col items-center gap-2 p-4 min-w-[80px]">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src={img}
          alt="stat-icon"
          className="w-12 h-12 object-contain hover:scale-110 transition-transform cursor-pointer"
          style={invert ? { filter: 'invert(1)' } : {}}
        />
      </a>
      <span className="text-2xl font-bold text-white">{count}+</span>
    </div>
  );
};

export default function FollowMePhone({ phoneY, phoneScale, screenOpacity, iconsScale }) {
  return (
    <motion.div
      style={{
        y: phoneY,
        scale: phoneScale,
        width: '380px',
        height: '780px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Fake iPhone frame image wrapper - fallback to border if image is missing */}
      <img
        src={iphoneFrame}
        alt="iPhone Frame"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />

      {/* Screen Area */}
      <div style={{
        position: 'absolute',
        top: '50px',
        left: '19px',
        right: '19px',
        bottom: '45px',
        backgroundColor: '#000', // Screen background color (black)
        borderRadius: '35px',
        overflow: 'hidden',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* App Grid & Header */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            scale: iconsScale
          }}
        >
          <h3 className="text-white text-lg font-bold mb-6 font-sans tracking-wide">Follow me here</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '30px',
              padding: '0 30px',
              width: '100%',
            }}
          >
            {statsData.map(stat => (
              <a key={stat.id} href={stat.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform">
                <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                  <img src={stat.img} alt="app-icon" className="w-12 h-12 object-contain" style={stat.invert ? { filter: 'invert(1)' } : {}} />
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* "Screen Off" Black Overlay */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'black',
            opacity: screenOpacity,
            pointerEvents: 'none',
            zIndex: 15
          }}
        />
      </div>
    </motion.div>
  );
}

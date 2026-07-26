import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import portfolioData from './portfolioData.json';
import './index.css';

// Pre-calculate the scroll positions for each experience
let currentScroll = 750;
const experienceBlocks = portfolioData.experiences.map((exp) => {
  const startScroll = currentScroll;
  const leftEnd = startScroll + 300; // 3 items * 100px
  const rightEnd = leftEnd + (exp.rightSide.length * 100);
  const waitEnd = rightEnd + 300; // Wait 300px
  const fadeOutEnd = waitEnd + 100; // Fade out over 100px

  currentScroll = fadeOutEnd;

  return {
    ...exp,
    startScroll,
    leftEnd,
    rightEnd,
    waitEnd,
    fadeOutEnd
  };
});

// Define the exit sequence scroll points
const purpleExitStart = currentScroll;
const purpleExitEnd = purpleExitStart + 450;
const lineExitStart = purpleExitEnd;
const lineExitEnd = lineExitStart + 300;

const totalScrollHeight = lineExitEnd + 500; // Add padding at the very end

const ExperienceBlock = ({ scrollY, exp }) => {
  // Fade in left items, then fade them out at the end
  const titleOpacity = useTransform(scrollY, [exp.startScroll, exp.startScroll + 100, exp.waitEnd, exp.fadeOutEnd], [0, 1, 1, 0]);
  const locationOpacity = useTransform(scrollY, [exp.startScroll + 100, exp.startScroll + 200, exp.waitEnd, exp.fadeOutEnd], [0, 1, 1, 0]);
  const timeOpacity = useTransform(scrollY, [exp.startScroll + 200, exp.startScroll + 300, exp.waitEnd, exp.fadeOutEnd], [0, 1, 1, 0]);

  // Fade in right side opacities sequentially, then fade out at the end
  const rightOpacities = exp.rightSide.map((_, i) => {
    const s = exp.leftEnd + (i * 100);
    const e = s + 100;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollY, [s, e, exp.waitEnd, exp.fadeOutEnd], [0, 1, 1, 0]);
  });

  return (
    <>
      <div style={{
        position: 'absolute',
        right: 'calc(50% + 140px)',
        top: '30%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
        color: '#FFF',
        zIndex: 10
      }}>
        <motion.div style={{ opacity: titleOpacity, fontSize: '3rem', fontWeight: 'bold', letterSpacing: '2px' }}>
          {exp.leftSide.title}
        </motion.div>
        <motion.div style={{ opacity: locationOpacity, fontSize: '1.5rem', color: '#e9d5ff' }}>
          {exp.leftSide.location}
        </motion.div>
        <motion.div style={{ opacity: timeOpacity, fontSize: '1.2rem', color: '#c084fc', fontFamily: 'monospace' }}>
          {exp.leftSide.timeline}
        </motion.div>
      </div>

      <div style={{
        position: 'absolute',
        left: 'calc(50% + 90px)',
        top: '35%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '12px',
        color: '#FFF',
        zIndex: 10,
        maxWidth: '700px'
      }}>
        {exp.rightSide.map((sentence, index) => (
          <motion.div key={index} style={{ opacity: rightOpacities[index], fontSize: '1.2rem' }}>
            {sentence}
          </motion.div>
        ))}
      </div>
    </>
  );
};

const ExperienceTag = ({ scrollY }) => {
  const start = 750; // Starts when first experience starts
  const end = purpleExitStart; // Ends exactly when last experience fades out

  const opacity = useTransform(scrollY, [start, start + 100, end - 100, end], [0, 1, 1, 0]);

  return (
    <motion.div style={{
      position: 'absolute',
      top: '80px',
      left: '60px',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#FFF',
      letterSpacing: '4px',
      textTransform: 'uppercase',
      opacity: opacity,
      zIndex: 20
    }}>
      Experience
    </motion.div>
  );
};

function Portfolio() {
  const [isDesktop, setIsDesktop] = useState(true);
  const { scrollY } = useScroll();

  // Line shrinks back to 0px after the purple background leaves
  const lineHeight = useTransform(
    scrollY,
    [0, 300, lineExitStart, lineExitEnd],
    ['0px', '350px', '350px', '0px']
  );

  // To make the line shrink UPWARDS (detaching from the ball), we must translate it UP 
  // by exactly the same amount that its height is shrinking.
  const lineY = useTransform(
    scrollY,
    [0, lineExitStart, lineExitEnd],
    ['0px', '0px', '-2800px']
  );

  // Fade out the residual box-shadow exactly when it reaches 0 height
  const lineOpacity = useTransform(
    scrollY,
    [0, lineExitEnd - 10, lineExitEnd],
    [1, 1, 0]
  );

  // Purple height initially fills the screen
  const purpleHeight = useTransform(
    scrollY,
    [0, 300, 750],
    ['0vh', '0vh', '100vh']
  );

  // Purple bottom animates to 100vh at the end, causing it to slide UP off the screen
  const purpleBottom = useTransform(
    scrollY,
    [purpleExitStart, purpleExitEnd],
    ['0vh', '100vh']
  );

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth > 1024);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <div className="page-container" style={{ height: isDesktop ? `${totalScrollHeight}px` : '100vh', display: 'block', position: 'relative' }}>
      {isDesktop ? (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>

          <motion.div
            style={{
              position: 'absolute',
              bottom: purpleBottom, // Controlled by scroll to slide up
              left: 0,
              width: '100vw',
              backgroundColor: '#6b21a8',
              height: purpleHeight,
              zIndex: 1
            }}
          />

          <motion.div
            style={{
              position: 'absolute',
              bottom: 'calc(50% + 50px)', // Always anchored to the ball
              y: lineY, // Moves up during exit to keep the top edge fixed while height shrinks
              width: '4px',
              backgroundColor: '#FFF',
              height: lineHeight, // Shrinks at the end
              opacity: lineOpacity, // Hides the box-shadow when height is 0
              boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.8)',
              zIndex: 5
            }}
          />

          <ExperienceTag scrollY={scrollY} />

          {experienceBlocks.map((exp, index) => (
            <ExperienceBlock key={index} scrollY={scrollY} exp={exp} />
          ))}

          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#FFF',
              borderRadius: '50%',
              boxShadow: '0 0 40px 15px rgba(255, 255, 255, 0.6), 0 0 80px 30px rgba(255, 255, 255, 0.4)',
              zIndex: 10
            }}
          ></div>

        </div>
      ) : (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FFF' }}>Coming Soon</h1>
        </div>
      )}
    </div>
  );
}

export default Portfolio;

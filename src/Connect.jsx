import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './index.css';
import FollowMePhone, { statsData, StatItem } from './FollowMePhone';
import ContactForm from './ContactForm';

function Connect() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const phoneY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4, 0.8, 0.85],
    ["280vh", "280vh", "0vh", "0vh", "-150vh"]
  );

  const phoneScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4],
    [5, 5, 1] // 5 * 380px = 1900px
  );

  const screenOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55],
    [1, 1, 0] // 1 is black, 0 is transparent (icons visible)
  );

  const iconsScale = useTransform(
    scrollYProgress,
    [0.55, 0.75],
    [4, 1]
  );

  const formY = useTransform(
    scrollYProgress,
    [0.85, 1],
    ["100vh", "0vh"]
  );

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="flex lg:hidden flex-wrap justify-center gap-6 p-6" style={{ marginBottom: '50px' }}>
        {statsData.map(stat => (
          <StatItem key={stat.id} img={stat.img} limit={stat.limit} invert={stat.invert} url={stat.url} />
        ))}
      </div>
      
      <div className="lg:hidden p-6 flex justify-center pb-20">
        <ContactForm isDesktop={false} />
      </div>

      {/* Desktop Animated Section */}
      <div className="hidden lg:block">
        <div ref={containerRef} style={{ height: '700vh', position: 'relative' }}>
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <FollowMePhone
              phoneY={phoneY}
              phoneScale={phoneScale}
              screenOpacity={screenOpacity}
              iconsScale={iconsScale}
            />

            {/* Desktop Form Animation */}
            <motion.div
              style={{
                y: formY,
                position: 'absolute',
                width: '100%',
                maxWidth: '600px',
                zIndex: 30,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ContactForm isDesktop={true} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connect;

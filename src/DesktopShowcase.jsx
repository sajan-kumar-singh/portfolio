import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { showcaseData } from './showcaseData';

const ShowcaseItem = ({ item }) => {
  const ref = useRef(null);

  // Track this specific section's visibility in the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax Effect: Image moves slightly slower than the page (moves down relative to container)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  // Parallax Effect: Text moves slightly faster than the page (moves up relative to container)
  const textY = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

  // Fade in and out as it enters and leaves the screen
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="min-h-[80vh] w-full flex items-center justify-center overflow-visible relative py-20">
      {/* 
        Always Left Image, Right Text as requested.
      */}
      <div className="w-full max-w-7xl mx-auto px-8 flex flex-row items-center gap-16">

        {/* Left Side: Image with Parallax */}
        <motion.div
          className="w-1/2 h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          style={{ y: imageY, opacity }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Side: Text with Reverse Parallax */}
        <motion.div
          className="w-1/2 flex flex-col justify-center"
          style={{ y: textY, opacity }}
        >
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 drop-shadow-lg" style={{ marginBottom: '24px' }}>
            {item.title}
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            {item.description}
          </p>

          <div style={{ marginTop: '32px' }}>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <button className="rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition-all text-white font-medium cursor-pointer" style={{ padding: '12px 24px' }}>
                  Show More
                </button>
              </a>
            ) : (
              <button className="rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition-all text-white font-medium" style={{ padding: '12px 24px' }}>
                Show More
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default function DesktopShowcase() {
  return (
    <div className="w-full bg-[#050505] hidden lg:block overflow-hidden" style={{ paddingTop: '68px', paddingBottom: '128px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white' }}>
          Hall of Fame
        </h2>
      </div>

      <div className="flex flex-col" style={{ gap: '48px' }}>
        {showcaseData.map((item) => (
          <ShowcaseItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

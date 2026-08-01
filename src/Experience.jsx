import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';



let globalExperienceHasAnimated = false;

// Helper to render an animated item using variants
const AnimatedItem = ({ children, className, as: Component = motion.div }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <Component variants={itemVariants} className={className}>
      {children}
    </Component>
  );
};

const AnimatedExperienceDesktop = ({ experienceData }) => {
  const containerVariants = {
    hidden: { 
      // Start slightly clipped to show it growing, but not 100% invisible
      clipPath: "inset(0% 0% 80% 0% round 1.5rem)",
      opacity: 0
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.div 
      initial={globalExperienceHasAnimated ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      onAnimationComplete={() => { globalExperienceHasAnimated = true; }}
      variants={containerVariants}
      className="w-full flex flex-col bg-gradient-to-br from-white via-purple-50 to-fuchsia-100 text-gray-900 border border-white/40 shadow-xl custom-mb-2"
    >
      <div className="flex flex-col w-full h-auto">
        {experienceData.map((exp, idx) => {
          return (
            <div key={idx} className={`flex w-full h-auto ${idx !== experienceData.length - 1 ? 'border-b-2 border-white/60' : ''}`}>
              {/* Left Side: 30% */}
              <div className="w-[30%] custom-p-6 flex flex-col justify-start gap-4 border-r-[3px] border-white relative">
                <div>
                  <AnimatedItem as={motion.h4} className="text-xl font-extrabold text-purple-900 tracking-tight">
                    {exp.company}
                  </AnimatedItem>
                  <AnimatedItem className="text-sm font-semibold text-purple-600 custom-mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {exp.location}
                  </AnimatedItem>
                </div>
                
                <AnimatedItem className="inline-block bg-purple-900 text-white text-xs font-bold custom-px-4-py-2 rounded-full w-max shadow-md">
                  {exp.duration}
                </AnimatedItem>
                
                <AnimatedItem as={motion.p} className="text-sm text-gray-700 leading-relaxed font-medium custom-mt-2 custom-pr-2">
                  {exp.note}
                </AnimatedItem>
              </div>

              {/* Right Side: 70% */}
              <div className="flex-1 custom-p-6 flex flex-col justify-center gap-8">
                {exp.roles.map((role, rIdx) => (
                  <div key={rIdx} className="flex flex-col">
                    <AnimatedItem as={motion.h4} className="text-2xl font-bold text-gray-900 custom-mb-4 tracking-tight">
                      {role.position}
                    </AnimatedItem>
                    <ul className="flex flex-col gap-4 custom-ml-6">
                      {role.points.map((point, pIdx) => (
                        <AnimatedItem as={motion.li} key={pIdx} className="flex items-start gap-3">
                          <div className="custom-mt-1 w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-fuchsia-100">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-500"></div>
                          </div>
                          <span className="text-gray-800 text-base font-medium leading-relaxed">{point}</span>
                        </AnimatedItem>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const AnimatedExperienceMobile = ({ experienceData }) => {
  return (
    <div className="flex flex-col gap-6">
      {experienceData.map((exp, idx) => (
        <div key={idx} className="flex flex-col w-full h-auto rounded-xl border border-gray-800 bg-gray-900/50 custom-p-4">
          <h4 className="text-lg font-bold text-white">{exp.company}</h4>
          <div className="text-sm text-gray-400 custom-mt-1">{exp.duration}</div>
          <div className="text-sm text-gray-400 custom-mt-1">{exp.location}</div>
          <p className="text-sm text-gray-300 custom-mt-2">{exp.note}</p>
          
          <div className="flex flex-col custom-mt-4 gap-6 border-t border-gray-800 custom-pt-4">
            {exp.roles.map((role, rIdx) => (
              <div key={rIdx} className="flex flex-col">
                <h5 className="text-base font-bold text-emerald-400 custom-mb-2">{role.position}</h5>
                <ul className="flex flex-col gap-2 custom-ml-4">
                  {role.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-emerald-500 text-xs custom-mt-1">▹</span>
                      <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Experience({ experienceData = [] }) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!experienceData || experienceData.length === 0) return null;

  return (
    <>
      {/* Desktop View (>= 1024px) */}
      <div className="hidden lg:flex flex-col custom-space-y-4 w-full h-auto custom-p-4 about-detail-container custom-mb-2 relative">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2 custom-mb-4">
          Experience
        </h3>
        <AnimatedExperienceDesktop experienceData={experienceData} />
      </div>

      {/* Mobile & Tablet View (< 1024px) */}
      <div className="flex lg:hidden flex-col custom-space-y-4 w-full h-auto custom-p-4 about-detail-container custom-mb-2">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2 custom-mb-4">
          Experience
        </h3>
        <AnimatedExperienceMobile experienceData={experienceData} />
      </div>
    </>
  );
}

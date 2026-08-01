import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import CallIcon from './icons/CallIcon';
import XIcon from './icons/X';
import YoutubeIcon from './icons/YoutubeIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import LeetCodeIcon from './icons/LeetCodeIcon';
import InstagramIcon from './icons/InstagramIcon';
import GithubIcon from './icons/GithubIcon';

export default function SocialFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleOpen = () => setIsOpen(!isOpen);

  // 6 Social Icons
  const socialIcons = [
    { component: <XIcon size={20} />, url: "https://x.com/SajanKu77443416" },
    { component: <YoutubeIcon size={20} />, url: "https://www.youtube.com/@MyIdealWorld" },
    { component: <LinkedinIcon size={20} />, url: "https://www.linkedin.com/in/sajannkumarssingh/" },
    { component: <LeetCodeIcon size={20} />, url: "https://leetcode.com/u/SajanSingh/" },
    { component: <InstagramIcon size={20} />, url: "https://www.instagram.com/theimperfectace/" },
    { component: <GithubIcon size={20} className="text-black" />, url: "https://github.com/Sajan-kumar-singh" }
  ];

  // How far out the icons pop
  const radius = 180;

  return (
    <>
      {/* Black Radial Gradient Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleOpen}
            className="fixed bottom-0 left-0 w-full h-full pointer-events-auto z-[9998]"
            style={{
              background: 'radial-gradient(circle at bottom left, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 35%, transparent 100%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* FAB Container */}
      <div className="fixed bottom-[60px] left-[60px] z-[9999] pointer-events-auto flex flex-col items-center">
        <div className="relative">
          {/* Social Icons (Radial Expansion) */}
          <AnimatePresence>
            {isOpen && socialIcons.map((item, index) => {
              // Calculate angle between 0 (right) and 90 (up)
              const angleDeg = index * (90 / (socialIcons.length - 1));
              const angleRad = (angleDeg * Math.PI) / 180;

              // X goes right (positive), Y goes up (negative in CSS)
              const x = Math.cos(angleRad) * radius;
              const y = -Math.sin(angleRad) * radius;

              return (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{ x, y, opacity: 1, scale: 1 }}
                  exit={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.03 }}
                  className="absolute top-1/2 left-1/2 -mt-[20px] -ml-[20px] w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                >
                  {item.component}
                </motion.a>
              );
            })}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleOpen}
            initial={{ rotate: 128 }}
            animate={{ rotate: isOpen ? 0 : 128 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-10 w-[70px] h-[70px] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] bg-transparent flex items-center justify-center overflow-hidden cursor-pointer border-none outline-none"
          >
            <CallIcon size={70} />
          </motion.button>
        </div>

        {/* Book Appointment Button */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 15, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute top-[100%] left-0 mt-4"
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/connect');
                }}
                className="whitespace-nowrap px-6 py-2.5 bg-white text-black font-bold text-sm rounded-full shadow-xl hover:bg-gray-100 transition-colors border-2 border-transparent"
              >
                Book an appointment
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

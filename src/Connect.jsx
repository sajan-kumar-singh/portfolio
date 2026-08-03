import React, { useState, useEffect } from 'react';
import './index.css';
import ContactForm from './ContactForm';

function Connect() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;

  return (
    <div style={{ marginTop: '100px' }} className="flex justify-center items-center p-6 min-h-[70vh]">
      <div className="w-full max-w-[600px]">
        <ContactForm isDesktop={isDesktop} />
      </div>
    </div>
  );
}

export default Connect;

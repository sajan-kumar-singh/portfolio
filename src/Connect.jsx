import React from 'react';
import './index.css';
import ContactForm from './ContactForm';

function Connect() {
  return (
    <div style={{ marginTop: '100px' }} className="flex justify-center items-center p-6 min-h-[70vh]">
      <div className="w-full max-w-[600px]">
        <ContactForm isDesktop={true} />
      </div>
    </div>
  );
}

export default Connect;

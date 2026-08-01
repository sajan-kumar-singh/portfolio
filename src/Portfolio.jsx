import React from 'react';
import ProjectGallery from './ProjectGallery';
import './index.css';

export default function Portfolio() {
  return (
    <div className="w-full min-h-screen pt-24 pb-12 overflow-x-hidden">
      <div className="w-full relative z-20">
        <ProjectGallery />
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import wallpaper1 from './assets/wallpaper (1).jpg';
import wallpaper2 from './assets/wallpaper (2).jpg';
import wallpaper3 from './assets/wallpaper (3).jpg';
import wallpaper4 from './assets/wallpaper (4).jpg';
import wallpaper5 from './assets/wallpaper (5).jpg';
import wallpaper6 from './assets/wallpaper (6).jpg';

const projects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution built with React and Node.js. Features include user authentication, payment processing, and an intuitive admin dashboard.',
    image: wallpaper1,
    link: '#'
  },
  {
    id: '2',
    title: 'Financial Dashboard',
    description: 'Real-time financial tracking application using WebSockets and D3.js. Allows users to monitor crypto and stock portfolios seamlessly.',
    image: wallpaper2,
    link: '#'
  },
  {
    id: '3',
    title: 'AI Image Generator',
    description: 'Integrated with OpenAI APIs to generate stunning images from user text prompts. Built with Next.js and Tailwind CSS for a premium feel.',
    image: wallpaper3,
    link: '#'
  },
  {
    id: '4',
    title: 'Social Media App',
    description: 'A scalable social networking application with real-time chat, post feeds, and notification systems powered by Redis and Socket.io.',
    image: wallpaper4,
    link: '#'
  },
  {
    id: '5',
    title: 'Task Management Tool',
    description: 'A beautiful Kanban-style productivity tool with drag-and-drop features, team collaboration, and deadline tracking.',
    image: wallpaper5,
    link: '#'
  },
  {
    id: '6',
    title: 'Portfolio Website',
    description: 'An interactive 3D portfolio website utilizing Three.js and Framer Motion to showcase skills, recommendations, and projects in a unique way.',
    image: wallpaper6,
    link: '#'
  }
];

export default function ProjectGallery() {
  const [selectedId, setSelectedId] = useState(null);

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <div style={{ padding: '5%', width: '100%', minHeight: '100vh', boxSizing: 'border-box', position: 'relative', overflowX: 'hidden' }}>
      <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 4vh, 3.5rem)', textAlign: 'center', marginBottom: '2rem', fontWeight: 'bold', letterSpacing: '2px' }}>My Projects</h2>
      
      {/* Grid of images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-[1200px]" style={{ margin: '0 auto' }}>
        {projects.map((project) => (
          <React.Fragment key={project.id}>
            {/* Desktop Animated Card (>= lg) */}
            <motion.div
              layoutId={`card-container-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              className="hidden lg:block relative cursor-pointer rounded-[15px] overflow-hidden h-[250px]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.img
                layoutId={`image-${project.id}`}
                src={project.image}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <motion.div 
                layoutId={`title-container-${project.id}`}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  padding: '1rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: 'white'
                }}
              >
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{project.title}</h3>
              </motion.div>
            </motion.div>

            {/* Mobile/Tablet Static Card (< lg) */}
            <div className="block lg:hidden bg-[#111] rounded-[15px] overflow-hidden shadow-lg border border-white/10 flex flex-col h-full">
              <div className="w-full h-[200px] overflow-hidden">
                <img src={project.image} className="w-full h-full object-cover" alt={project.title} />
              </div>
              <div className="custom-p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#c084fc] custom-mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm custom-mb-4 flex-grow">{project.description}</p>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block w-full custom-px-4-py-2 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-md transition-colors text-center"
                >
                  See it
                </a>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Selected Project Overlay */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:flex"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100,
              padding: '2rem',
              boxSizing: 'border-box'
            }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-container-${selectedProject.id}`}
              onClick={(e) => e.stopPropagation()} // Prevent clicking inside from closing
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '90%',
                maxWidth: '1000px',
                height: '70vh',
                backgroundColor: '#111',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
              }}
            >
              {/* Left Side: Animated Image */}
              <motion.div style={{ width: '60%', height: '100%' }}>
                <motion.img
                  layoutId={`image-${selectedProject.id}`}
                  src={selectedProject.image}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>

              {/* Right Side: Text details */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: 0.15 }}
                style={{
                  width: '40%',
                  padding: '3rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <motion.div layoutId={`title-container-${selectedProject.id}`} style={{ marginBottom: '1rem', background: 'none' }}>
                  <h2 style={{ margin: 0, fontSize: '2.5rem', color: '#c084fc' }}>{selectedProject.title}</h2>
                </motion.div>
                
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#ccc', marginBottom: 'auto' }}>
                  {selectedProject.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#6b21a8',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      transition: 'background 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#9333ea'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#6b21a8'}
                  >
                    See it
                  </a>
                  
                  <button 
                    onClick={() => setSelectedId(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#888',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      textDecoration: 'underline'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#fff'}
                    onMouseOut={(e) => e.target.style.color = '#888'}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

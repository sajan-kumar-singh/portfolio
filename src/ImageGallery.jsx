import React, { useState } from 'react';
import './index.css';

// Import all 11 wallpapers
import img1 from './assets/wallpaper (1).jpg';
import img2 from './assets/wallpaper (2).jpg';
import img3 from './assets/wallpaper (3).jpg';
import img4 from './assets/wallpaper (4).jpg';
import img5 from './assets/wallpaper (5).jpg';
import img6 from './assets/wallpaper (6).jpg';
import img7 from './assets/wallpaper (7).jpg';
import img8 from './assets/wallpaper (8).jpg';
import img9 from './assets/wallpaper (9).jpg';
import img10 from './assets/wallpaper (10).jpg';
import img11 from './assets/wallpaper (11).jpg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

const ImageGallery = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // 11 images mean 360 / 11 degrees per image
  const theta = 360 / 11;
  // Radius calculation: width of image / (2 * Math.tan(PI / number of images))
  // For 300px width, radius is approx 510px. We use 550px for a slight gap.
  const radius = 550;

  return (
    <>
      <style>
        {`
          @keyframes spinCarousel {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(-360deg); }
          }
          .carousel-container {
            perspective: 1500px;
            width: 100vw;
            height: 100vh;
            display: flex;
            justifyContent: center;
            alignItems: center;
            background-color: black;
            overflow: hidden;
            position: relative;
            padding-left: 650px;
            padding-top: 320px;
          }
          .carousel {
            width: 300px; /* Width of individual card */
            height: 300px;
            position: relative;
            transform-style: preserve-3d;
            animation: spinCarousel 30s infinite linear;
          }
          .carousel-card {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            transition: transform 0.3s ease, filter 0.3s ease;
          }
          .carousel-card:hover {
            filter: brightness(1.2);
          }
          .carousel-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          /* Modal Styles */
          .gallery-modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            z-index: 1000;
            display: flex;
            justifyContent: center;
            alignItems: center;
          }
          .gallery-modal-content {
            max-width: 90vw;
            max-height: 90vh;
            position: relative;
            animation: modalFadeIn 0.3s ease-out forwards;
          }
          .gallery-modal-image {
            width: 100%;
            height: 100%;
            max-width: 800px; /* Keeping it large but contained */
            max-height: 800px;
            object-fit: contain;
            border-radius: 12px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            cursor: pointer; /* indicates it's a link */
          }
          @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>

      <div className="carousel-container">

        {/* The 3D Rotating Assembly */}
        <div
          className="carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            animationPlayState: isHovered ? 'paused' : 'running'
          }}
        >
          {images.map((img, index) => {
            const angle = theta * index;
            return (
              <div
                key={index}
                className="carousel-card"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                }}
                onClick={() => setModalImage(img)}
              >
                <img src={img} alt={`Wallpaper ${index + 1}`} className="carousel-image" />
              </div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Modal overlay */}
      {modalImage && (
        <div className="gallery-modal-backdrop" onClick={() => setModalImage(null)}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <img src={modalImage} alt="Expanded Wallpaper" className="gallery-modal-image" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;

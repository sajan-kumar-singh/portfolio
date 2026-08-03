import React from 'react';

export default function RIcon({ size = 48, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      className={className}
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <g id="cube" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none">
          <path d="M 0,-20 L 17.32,-10 L 17.32,10 L 0,20 L -17.32,10 L -17.32,-10 Z" />
          <path d="M 0,0 L -17.32,-10 M 0,0 L 17.32,-10 M 0,0 L 0,20" />
        </g>
        <g id="center-cube" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" fill="none">
          <path d="M 0,-20 L 17.32,-10 L 17.32,10 L 0,20 L -17.32,10 L -17.32,-10 Z" />
          <path d="M 0,0 L -17.32,-10 M 0,0 L 17.32,-10 M 0,0 L 0,20" />
        </g>
      </defs>

      <g stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" strokeLinecap="round">
        {/* Radial Dashed Lines */}
        <line x1="100" y1="80" x2="100" y2="64" />
        <line x1="117.32" y1="90" x2="131.18" y2="82" />
        <line x1="117.32" y1="110" x2="131.18" y2="118" />
        <line x1="100" y1="120" x2="100" y2="136" />
        <line x1="82.68" y1="110" x2="68.82" y2="118" />
        <line x1="82.68" y1="90" x2="68.82" y2="82" />

        {/* Perimeter Dashed Lines */}
        <line x1="117.32" y1="54" x2="131.18" y2="62" />
        <line x1="148.5" y1="92" x2="148.5" y2="108" />
        <line x1="131.18" y1="138" x2="117.32" y2="146" />
        <line x1="82.68" y1="146" x2="68.82" y2="138" />
        <line x1="51.5" y1="108" x2="51.5" y2="92" />
        <line x1="68.82" y1="62" x2="82.68" y2="54" />
      </g>

      <use href="#center-cube" x="100" y="100" />
      <use href="#cube" x="100" y="44" />
      <use href="#cube" x="148.5" y="72" />
      <use href="#cube" x="148.5" y="128" />
      <use href="#cube" x="100" y="156" />
      <use href="#cube" x="51.5" y="128" />
      <use href="#cube" x="51.5" y="72" />
    </svg>
  );
}

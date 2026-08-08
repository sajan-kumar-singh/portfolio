import React from 'react';
import { showcaseData } from './showcaseData';

export default function MobileShowcase() {
  return (
    <div className="w-full bg-[#050505] lg:hidden" style={{ padding: '48px 5%' }}>

      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '32px' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
          Hall of Fame
        </h2>
      </div>

      <div className="flex flex-col w-full" style={{ gap: '32px', maxWidth: '64rem', margin: '0 auto' }}>
        {showcaseData.map((item) => (
          <div
            key={item.id}
            className="w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row sm:min-h-[220px]"
          >
            {/* Top Image on mobile, Left Image on tablet */}
            <div className="w-full sm:w-1/2 flex-shrink-0 relative h-[200px] sm:h-auto">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Bottom Text on mobile, Right Text on tablet */}
            <div className="w-full sm:w-1/2 flex flex-col justify-center bg-white text-black" style={{ padding: '24px' }}>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight" style={{ marginBottom: '12px' }}>
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed sm:line-clamp-none" style={{ marginBottom: '16px' }}>
                {item.description}
              </p>

              <div style={{ marginTop: 'auto' }}>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] sm:text-xs font-bold text-yellow-600 uppercase tracking-widest cursor-pointer hover:text-yellow-500">
                    Show More &rarr;
                  </a>
                ) : (
                  <span className="text-[10px] sm:text-xs font-bold text-yellow-600 uppercase tracking-widest cursor-pointer hover:text-yellow-500">
                    Show More &rarr;
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

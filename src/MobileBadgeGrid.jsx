import React from 'react';
import mockStats from './mockStats.json';

export default function MobileBadgeGrid() {
  const badgesData = mockStats.leetcode.badgesData;
  const badges = badgesData?.badges || [];

  return (
    <div className="w-full lg:hidden" style={{ padding: '48px 5%' }}>
      
      {/* Replaced header with an equivalent inline margin to maintain spacing */}
      <div style={{ height: '120px' }}></div>

      <style>{`
        .custom-badge-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 16px;
          margin: 0 auto;
          max-width: 64rem;
        }
        /* Breakpoint for 2 columns */
        @media (min-width: 450px) {
          .custom-badge-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        /* Breakpoint for 3 columns */
        @media (min-width: 650px) {
          .custom-badge-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        }
        /* Breakpoint for 4 columns */
        @media (min-width: 850px) {
          .custom-badge-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
      `}</style>

      {/* 
        Responsive Grid: 
        - 1 column below 450px (perfect for 350px width)
        - 2 columns above 450px
        - 3 columns above 650px
        - 4 columns above 850px (guaranteed 4 columns at 1024px)
      */}
      <div className="custom-badge-grid">
        {badges.map((badge, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center justify-between custom-p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg transition-transform hover:scale-105 hover:bg-white/10 hover:border-yellow-500/30"
          >
            {/* Badge Icon */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 custom-mb-4 flex items-center justify-center">
              <img 
                src={badge.icon.startsWith('http') ? badge.icon : `https://leetcode.com${badge.icon}`} 
                alt={badge.displayName}
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
            </div>
            
            {/* Badge Details */}
            <div className="text-center w-full flex flex-col items-center">
              <h3 className="text-gray-200 text-xs sm:text-sm font-semibold line-clamp-2 min-h-[32px] sm:min-h-[40px] w-full">
                {badge.displayName}
              </h3>
              <p className="text-yellow-500 text-xs sm:text-sm custom-mt-2 font-medium">
                {new Date(badge.creationDate).getFullYear()}
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

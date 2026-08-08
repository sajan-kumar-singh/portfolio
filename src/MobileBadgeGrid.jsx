import React from 'react';

// Use Vite's import.meta.glob to dynamically import all webp images in the badges folder
const badgeFiles = import.meta.glob('./badges/*.webp', { eager: true, import: 'default' });

const parsedBadges = Object.entries(badgeFiles).map(([path, url]) => {
  // path is like: ./badges/1.LeetCode - 50 Days Badge 2026 - 21-04-2026.webp
  const filename = path.split('/').pop().replace('.webp', '');
  
  // Split by " - "
  const parts = filename.split(' - ');
  
  // parse index and platform from first part (e.g. "1.LeetCode")
  const firstPart = parts[0];
  const firstDotIndex = firstPart.indexOf('.');
  let index = 0;
  let platform = firstPart;
  if (firstDotIndex !== -1) {
    index = parseInt(firstPart.substring(0, firstDotIndex), 10);
    platform = firstPart.substring(firstDotIndex + 1);
  }

  const name = parts[1] ? parts[1].trim() : '';
  const dateStr = parts[2] ? parts[2].trim() : ''; // Might be undefined/empty
  
  // Extract Year if date exists
  let year = '';
  if (dateStr) {
    const dateParts = dateStr.split('-');
    if (dateParts.length === 3) {
      year = dateParts[2]; // assuming DD-MM-YYYY
    }
  }

  return {
    id: index,
    platform: platform.trim(),
    name: name,
    date: dateStr,
    year: year,
    icon: url,
  };
}).sort((a, b) => a.id - b.id);

export default function MobileBadgeGrid() {
  const badges = parsedBadges;

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
            <div className="w-20 h-20 sm:w-24 sm:h-24 custom-mb-4 flex items-center justify-center relative">
              <img 
                src={badge.icon} 
                alt={badge.name}
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
              <span className="absolute -top-3 text-[#eab308] text-[9px] font-bold uppercase tracking-wider bg-black/60 custom-px-2 rounded-full border border-yellow-500/30">{badge.platform}</span>
            </div>
            
            {/* Badge Details */}
            <div className="text-center w-full flex flex-col items-center custom-mt-4">
              <h3 className="text-gray-200 text-xs sm:text-sm font-semibold line-clamp-2 min-h-[32px] sm:min-h-[40px] w-full custom-px-2">
                {badge.name}
              </h3>
              {badge.year && (
                <p className="text-yellow-500 text-xs sm:text-sm custom-mt-2 font-medium">
                  {badge.year}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

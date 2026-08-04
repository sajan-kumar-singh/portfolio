import React from 'react';
import mockStats from './mockStats.json';

export default function ScrollingBadges() {
  const badgesData = mockStats.leetcode.badgesData;
  const badges = badgesData?.badges || [];

  // 1. DYNAMIC ARRAY GENERATION
  // We need Set A to be extremely wide (e.g., 15,000px) so the physical edges are never seen.
  const badgeWidth = 164; // 140px tile + 24px margin
  const minSetWidth = 15000;
  const minBadgesNeeded = Math.ceil(minSetWidth / badgeWidth); // ~92 badges

  // Calculate how many times to repeat the user's badges to reach the minimum size
  const duplicatesNeeded = Math.max(1, Math.ceil(minBadgesNeeded / Math.max(1, badges.length)));

  // Set A is the guaranteed 15,000px+ array. We then duplicate Set A exactly once to make Set B.
  const setA = Array(duplicatesNeeded).fill(badges).flat();
  const repeatedBadges = [...setA, ...setA];

  // Create enough rows to cover the entire viewport diagonally
  const rows = Array.from({ length: 15 }).map((_, i) => i);

  return (
    <div
      className="group relative w-full h-full bg-[#050505] overflow-hidden flex items-center justify-center"
      style={{
        // The magic masking trick: fades out the edges so you never see the loop reset!
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
      }}
    >

      {/* CSS for infinite scroll and tile styling */}
      <style>{`
        @keyframes diagonal-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-diagonal-scroll-1 {
          animation: diagonal-scroll 500s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-diagonal-scroll-2 {
          animation: diagonal-scroll 515s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-diagonal-scroll-3 {
          animation: diagonal-scroll 530s linear infinite;
          display: flex;
          width: max-content;
        }

        .diamond-tile {
          /* Make it a perfect square, so when rotated by parent it looks like a diamond */
          width: 140px;
          height: 140px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          margin-right: 24px;
        }
        .diamond-tile:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(234, 179, 8, 0.3);
          box-shadow: 0 0 30px rgba(234, 179, 8, 0.15);
          z-index: 50;
        }
        .diamond-content {
          /* Counter-rotate to keep images upright */
          transform: rotate(45deg);
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .diamond-content img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .diamond-tile:hover .diamond-content img {
          transform: scale(1.2);
          filter: drop-shadow(0 0 15px rgba(234,179,8,0.6));
        }
      `}</style>

      {/* REMOVED items-center from this wrapper so rows align to flex-start! */}
      <div
        className="absolute flex flex-col gap-6 justify-center w-[300vw] h-[300vh]"
        style={{ transform: 'rotate(-45deg)' }}
      >
        {rows.map((rowIdx) => {
          // Assign slightly different speeds and offsets for an organic feel
          const speedClass = `animate-diagonal-scroll-${(rowIdx % 3) + 1}`;

          return (
            <div
              key={rowIdx}
              className="flex overflow-visible w-max"
              // Stagger the starting points so the grid looks interlocking
              style={{ marginLeft: `${(rowIdx % 2) * -10}vw` }}
            >
              <div className={`${speedClass}`}>
                {repeatedBadges.map((badge, idx) => (
                  <div key={`${rowIdx}-${idx}`} className="diamond-tile flex-shrink-0 cursor-pointer">
                    <div className="diamond-content" title={badge.displayName}>
                      <img
                        src={badge.icon.startsWith('http') ? badge.icon : `https://leetcode.com${badge.icon}`}
                        alt="Badge"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Vignette effect for depth overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: 'radial-gradient(circle at center, transparent 15%, #050505 90%)'
      }}></div>

      {/* Title overlay that fades out on hover */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-500 opacity-100 group-hover:opacity-0 bg-black/90">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight" style={{
            textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.5)'
          }}>
            Badges I Won
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style={{
            textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.5)',
            marginTop: '2rem'
          }}>
            Hover to see
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import ScrollingBadges from './ScrollingBadges';
import MobileBadgeGrid from './MobileBadgeGrid';
import DesktopShowcase from './DesktopShowcase';
import MobileShowcase from './MobileShowcase';

export default function Achievement() {
  return (
    <div className="w-full min-h-screen pt-24 pb-12 bg-[#050505] text-white overflow-x-hidden">

      {/* Desktop view: 1024px and above */}
      <div className="hidden lg:block w-full h-[85vh] relative overflow-hidden shadow-2xl">
        <ScrollingBadges />
        {/* Black gradient fade at the bottom to blend smoothly */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20"></div>
      </div>

      {/* Mobile/Tablet view: below 1024px */}
      <MobileBadgeGrid />

      {/* Featured Showcase Section (Animated for Desktop) */}
      <DesktopShowcase />

      {/* Featured Showcase Section (Static for Mobile) */}
      <MobileShowcase />

    </div>
  );
}

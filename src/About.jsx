import React, { useState, useEffect } from 'react';
import './index.css';

// Using existing images as placeholders so your app doesn't crash. 
// You can rename these imports to your actual image files!
import img1 from './assets/full stack architect.png';
import img2 from './assets/Entrepreneur.png';
import img3 from './assets/Trader.png';
import img4 from './assets/Gamer.png';
import SkillsOverview from './SkillsOverview';

const aboutData = [
  {
    id: 1,
    img: img1,
    text: "I am full stack architect who build whole system.",
    details: "This is a detailed paragraph about my journey as a full stack architect. I have built entire systems from the ground up, focusing on scalability, clean architecture, and modern best practices to deliver top-tier products.",
    badgeText: "Full Stack Architect",
    badgeColor: "emerald",
    title: "Engineering Scalable & Beautiful Digital Systems",
    intro: "I am a full stack architect dedicated to bridging complex backend infrastructure with modern, pixel-perfect user interfaces. I turn ideas into reliable, high-performance web products.",
    stats: [
      { label: "Experience", value: "5+ Years", subtext: "Building end-to-end web apps & platforms" },
      { label: "Architecture", value: "Scalable & Clean", subtext: "Microservices, APIs & modern state", valueColor: "text-emerald-400" },
      { label: "Focus", value: "High Performance", subtext: "Optimized code, accessibility & UX", valueColor: "text-amber-400" }
    ],
    pillarsTitle: "How I Work & What I Build",
    pillars: [
      { icon: "🎨", iconColor: "text-amber-400", title: "Clean UI & Responsive Design", text: "Crafting fluid, visually engaging web applications with vanilla CSS or Tailwind, focused on usability and micro-animations." },
      { icon: "🛠️", iconColor: "text-emerald-400", title: "Maintainable Architecture", text: "Writing modular, self-documenting code with decoupled APIs and robust state management for seamless scaling." },
      { icon: "🚀", iconColor: "text-blue-400", title: "Performance & SEO First", text: "Fast page load speeds, semantic HTML5 structure, structured metadata, and accessibility standards out of the box." },
      { icon: "🧩", iconColor: "text-purple-400", title: "End-to-End Problem Solving", text: "Taking complex business needs from requirement gathering to database design, API development, and cloud deployment." }
    ],
    skills: [
      { category: "Frontend", items: ['React', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'] },
      { category: "Backend & APIs", items: ['Node.js', 'Express', 'Python', 'RESTful APIs', 'GraphQL'] },
      { category: "Database & Cloud Tools", items: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Git/GitHub', 'CI/CD'] }
    ],
    philosophy: "I believe full stack engineering is an art form. It's about maintaining absolute harmony between backend performance and frontend elegance. Whether collaborating with cross-functional teams or delivering freelance projects, my goal is always to deliver software that solves real problems."
  },
  // {
  //   id: 2,
  //   img: img2,
  //   text: "I am an entrepreneur who will bring green revolution 2.0.",
  //   details: "Being an entrepreneur means constantly looking for ways to innovate. My vision for the green revolution 2.0 involves leveraging technology to create sustainable, eco-friendly solutions that will have a lasting positive impact on our planet.",
  //   badgeText: "Visionary Entrepreneur",
  //   badgeColor: "green",
  //   title: "Building the Green Revolution 2.0",
  //   intro: "Being an entrepreneur means constantly looking for ways to innovate. My vision involves leveraging technology to create sustainable, eco-friendly solutions that will have a lasting positive impact on our planet.",
  //   stats: [
  //     { label: "Vision", value: "Eco-Tech", subtext: "Focusing on sustainable tech innovations" },
  //     { label: "Impact", value: "Global Reach", subtext: "Scalable green solutions for everyone", valueColor: "text-green-400" },
  //     { label: "Drive", value: "Innovation", subtext: "Disrupting traditional industries", valueColor: "text-amber-400" }
  //   ],
  //   pillarsTitle: "My Entrepreneurial Pillars",
  //   pillars: [
  //     { icon: "🌱", iconColor: "text-green-400", title: "Sustainability First", text: "Designing business models and tech products that actively heal the planet and reduce carbon footprints." },
  //     { icon: "💡", iconColor: "text-amber-400", title: "Innovative Thinking", text: "Looking past the status quo to find unique market opportunities and disruptive solutions." },
  //     { icon: "🤝", iconColor: "text-blue-400", title: "Leadership & Strategy", text: "Building and guiding high-performance teams to execute complex, long-term visions." },
  //     { icon: "📈", iconColor: "text-purple-400", title: "Scalable Growth", text: "Ensuring long-term viability by blending profitability with social and environmental responsibility." }
  //   ],
  //   skills: [
  //     { category: "Business & Strategy", items: ['Strategic Planning', 'Market Research', 'Product Management', 'Agile'] },
  //     { category: "Growth & Operations", items: ['Marketing', 'Partnerships', 'Fundraising', 'B2B Sales'] },
  //     { category: "Tech Context", items: ['CleanTech', 'Data Analytics', 'SaaS Models', 'E-commerce'] }
  //   ],
  //   philosophy: "I believe that the best businesses of tomorrow are the ones that solve the most pressing problems of today. Profitability and sustainability are not mutually exclusive; they are the foundation of Green Revolution 2.0."
  // },
  // {
  //   id: 3,
  //   img: img3,
  //   text: "I am a trader who pull profit from stock market.",
  //   details: "Trading is an art that requires patience, discipline, and a deep understanding of market mechanics. Over the years, I have developed strategies to navigate volatility and consistently pull profit from the stock market.",
  //   badgeText: "Algorithmic Trader",
  //   badgeColor: "blue",
  //   title: "Navigating Markets with Precision & Data",
  //   intro: "Trading is an art that requires patience, discipline, and a deep understanding of market mechanics. Over the years, I have developed quantitative strategies to navigate volatility and consistently pull profit from the stock market.",
  //   stats: [
  //     { label: "Strategy", value: "Data-Driven", subtext: "Quantitative & Technical Analysis" },
  //     { label: "Risk", value: "Managed", subtext: "Capital preservation is priority #1", valueColor: "text-blue-400" },
  //     { label: "Markets", value: "Global Equities", subtext: "Stocks, Options, and Crypto", valueColor: "text-amber-400" }
  //   ],
  //   pillarsTitle: "Trading Principles",
  //   pillars: [
  //     { icon: "📊", iconColor: "text-blue-400", title: "Technical Analysis", text: "Reading price action, momentum, and volume to identify high-probability setups." },
  //     { icon: "🤖", iconColor: "text-emerald-400", title: "Algorithmic Systems", text: "Automating strategies using Python to remove emotion and ensure execution consistency." },
  //     { icon: "🛡️", iconColor: "text-amber-400", title: "Risk Management", text: "Sizing positions correctly and adhering to strict stop-losses to protect the portfolio." },
  //     { icon: "🧠", iconColor: "text-purple-400", title: "Trading Psychology", text: "Maintaining absolute discipline and emotional control under extreme market pressure." }
  //   ],
  //   skills: [
  //     { category: "Analysis", items: ['Technical Analysis', 'Fundamental Analysis', 'Order Flow', 'Macroeconomics'] },
  //     { category: "Platforms & Tools", items: ['TradingView', 'ThinkOrSwim', 'MetaTrader', 'Bloomberg Terminal'] },
  //     { category: "Quantitative", items: ['Python', 'Pandas', 'Backtesting', 'Algorithmic Design'] }
  //   ],
  //   philosophy: "The market is a reflection of human psychology and mathematical probabilities. Success doesn't come from predicting the future; it comes from strictly managing risk, executing your edge, and maintaining unbreakable discipline."
  // },
  // {
  //   id: 4,
  //   img: img4,
  //   text: "I am a gamer who plays for idendity not fun.",
  //   details: "Gaming is more than just entertainment to me; it's a way to build identity, community, and strategy. I approach gaming with a competitive mindset, constantly analyzing mechanics to master every challenge.",
  //   badgeText: "Competitive Gamer",
  //   badgeColor: "purple",
  //   title: "Playing for Identity, Strategy & Mastery",
  //   intro: "Gaming is more than just entertainment to me; it's a way to build identity, community, and strategy. I approach gaming with a competitive mindset, constantly analyzing mechanics to master every challenge.",
  //   stats: [
  //     { label: "Mindset", value: "Competitive", subtext: "Always analyzing and improving" },
  //     { label: "Genre", value: "Tactical & FPS", subtext: "High APM, teamwork & precision", valueColor: "text-purple-400" },
  //     { label: "Focus", value: "System Mastery", subtext: "Deeply understanding game engines", valueColor: "text-amber-400" }
  //   ],
  //   pillarsTitle: "Gaming Philosophy",
  //   pillars: [
  //     { icon: "🎯", iconColor: "text-purple-400", title: "Precision Execution", text: "Perfecting mechanics, crosshair placement, and muscle memory through rigorous practice." },
  //     { icon: "🧠", iconColor: "text-emerald-400", title: "Tactical Planning", text: "Outsmarting opponents by predicting their moves and controlling map geometry." },
  //     { icon: "🤝", iconColor: "text-blue-400", title: "Team Synergy", text: "Communicating effectively and maintaining morale in high-stress, fast-paced scenarios." },
  //     { icon: "📈", iconColor: "text-amber-400", title: "Continuous Review", text: "Watching VODs, analyzing mistakes, and constantly iterating on strategy." }
  //   ],
  //   skills: [
  //     { category: "Genres", items: ['FPS', 'MOBA', 'RTS', 'Fighting Games', 'Speedrunning'] },
  //     { category: "Hardware & Setup", items: ['Custom PC Builds', 'Mechanical Keyboards', 'High-Refresh Monitors'] },
  //     { category: "Soft Skills", items: ['Quick Decision Making', 'Leadership', 'Stress Management', 'Adaptability'] }
  //   ],
  //   philosophy: "A true gamer doesn't just play to pass the time; they play to conquer challenges, understand deep systems, and push their own limits. Every defeat is just data for the next victory."
  // }
];



const ContentCard = ({ data, slideDirection }) => {
  return (
    <div className={`about-card expanded ${slideDirection ? 'animate-' + slideDirection : ''}`}>
      {/* Image */}
      <img
        src={data.img}
        alt="About visual"
        className="about-card-img"
      />

      {/* Detail Component */}
      <SkillsOverview />
    </div>
  );
};

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');

  const handleNext = () => {
    setSlideDirection('slide-left');
    setCurrentIndex((prev) => (prev === aboutData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setSlideDirection('slide-right');
    setCurrentIndex((prev) => (prev === 0 ? aboutData.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (slideDirection) {
      const timer = setTimeout(() => setSlideDirection(''), 500);
      return () => clearTimeout(timer);
    }
  }, [slideDirection]);

  const currentItem = aboutData[currentIndex];

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-12 overflow-x-hidden" style={{ marginTop: '100px' }}>

      <div className="flex items-center justify-between w-full mx-auto px-2 lg:px-6">

        {/* Left Arrow */}
        {aboutData.length > 1 ? (
          <div className="w-12 lg:w-20 flex-shrink-0 flex justify-center transition-opacity duration-300 opacity-100">
            <button
              onClick={handlePrev}
              className="p-2 lg:p-3 bg-gray-800/90 rounded-full hover:bg-gray-700 transition outline-none cursor-pointer"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="w-12 lg:w-20 flex-shrink-0"></div>
        )}

        {/* Center Card Wrapper */}
        <div className="flex-grow overflow-hidden relative" key={currentItem.id}>
          <ContentCard
            data={currentItem}
            slideDirection={slideDirection}
          />
        </div>

        {/* Right Arrow */}
        {aboutData.length > 1 ? (
          <div className="w-12 lg:w-20 flex-shrink-0 flex justify-center transition-opacity duration-300 opacity-100">
            <button
              onClick={handleNext}
              className="p-2 lg:p-3 bg-gray-800/90 rounded-full hover:bg-gray-700 transition outline-none cursor-pointer"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="w-12 lg:w-20 flex-shrink-0"></div>
        )}

      </div>
    </div>
  );
}

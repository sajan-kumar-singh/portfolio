import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import './index.css';
import insta from './assets/insta.png';
import twitter from './assets/twitter.png';
import youtube from './assets/youtube.png';
import linkedin from './assets/icons8-linkedin-96.png';
import iphoneFrame from './assets/iphone-frame.png';
import character1 from './assets/character1.png';
import character2 from './assets/character2.png';
import character3 from './assets/character3.png';
import character4 from './assets/character4.png';
import character5 from './assets/character5.png';
import character6 from './assets/character6.png';

const statsData = [
  { id: 1, img: twitter, limit: 3, invert: false, url: 'https://x.com/SajanKu77443416' },
  { id: 2, img: linkedin, limit: 250, invert: false, url: 'https://www.linkedin.com/in/sajannkumarssingh/' },
  { id: 3, img: insta, limit: 750, invert: false, url: 'https://www.instagram.com/theimperfectace/' },
  { id: 4, img: youtube, limit: 2450, invert: false, url: 'https://www.youtube.com/@MyIdealWorld' },
];

// Configuration for the Avatar Popups
// You can freely change the position, rotation, size, and message here!
const avatarConfig = {
  name: {
    img: character1, // Placeholder, swap with your 3D avatar PNG
    message: "We don't spam so fill all details without fear.",
    avatarStyles: { width: '170px', left: '-130px', bottom: '0px', zIndex: 40, transform: 'rotate(-10deg)' },
    bubbleStyles: { left: '-270px', bottom: '380px', zIndex: 40 }
  },
  email: {
    img: character2, // Placeholder
    message: "We value your privacy hence your email is safe with us.",
    avatarStyles: { width: '230px', left: '100px', bottom: '100px', zIndex: 40, transform: 'rotate(-1deg)' },
    bubbleStyles: { left: '-140px', bottom: '220px', zIndex: 40 }
  },
  message: {
    img: character3, // Placeholder
    message: "Write wisely to grab our attention.",
    avatarStyles: { width: '140px', left: '10px', top: '-33px', zIndex: 40, transform: 'rotate(0deg)' },
    bubbleStyles: { left: '-135px', top: '-60px', zIndex: 40 }
  },
  datetime: {
    img: character4, // Placeholder
    message: "I'll choose only one so fill accordingly.",
    avatarStyles: { width: '460px', right: '-270px', bottom: '105px', zIndex: 40, transform: 'rotate(0deg)' },
    bubbleStyles: { right: '-50px', bottom: '545px', zIndex: 40 }
  },
  service: {
    img: character5, // Placeholder
    message: "Payment method and meeting date I'll tell later.",
    avatarStyles: { width: '200px', left: '-55px', bottom: '90px', zIndex: 40, transform: 'rotate(2deg)' },
    bubbleStyles: { left: '-230px', bottom: '290px', zIndex: 40 }
  },
  confirm: {
    img: character6, // Placeholder
    message: "Thanks for confirming! You can submit now.",
    avatarStyles: { width: '140px', right: '28px', bottom: '75px', zIndex: 40, transform: 'rotate(1deg)' },
    bubbleStyles: { right: '80px', bottom: '230px', zIndex: 40 }
  }
};

const StatItem = ({ img, limit, invert, url }) => {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // if (prefersReducedMotion) {
    //   // If they prefer reduced motion, skip the animation and set the final limit immediately
    //   setCount(limit);
    //   return;
    // }

    let start = 0;
    const duration = 2000;
    const increment = limit / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= limit) {
        setCount(limit);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [limit, prefersReducedMotion]);

  return (
    <div className="flex flex-col items-center gap-2 p-4 min-w-[80px]">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src={img}
          alt="stat-icon"
          className="w-12 h-12 object-contain hover:scale-110 transition-transform cursor-pointer"
          style={invert ? { filter: 'invert(1)' } : {}}
        />
      </a>
      <span className="text-2xl font-bold text-white">{count}+</span>
    </div>
  );
};

function Connect() {
  const [step, setStep] = useState(1);
  const [focusedField, setFocusedField] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animation timeline mapped to scroll progress (0 to 1):
  // 0.0 -> 0.1: Sticky starts, screen is black, wait for about 500px
  // 0.1 -> 0.4: Zoom out from bottom (starts at scale 2.63 -> 1000px wide)
  // 0.4 -> 0.45: Pause in center
  // 0.45 -> 0.55: Screen turns on
  // 0.55 -> 0.75: Icons zoom in
  // 0.75 -> 0.85: Pause in center (reading time)
  // 0.85 -> 1.0: Fade out / move up

  const phoneY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4, 0.8, 0.85],
    ["280vh", "280vh", "0vh", "0vh", "-150vh"]
  );

  const phoneScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4],
    [5, 5, 1] // 5 * 380px = 1900px
  );

  const screenOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55],
    [1, 1, 0] // 1 is black, 0 is transparent (icons visible)
  );

  const iconsScale = useTransform(
    scrollYProgress,
    [0.55, 0.75],
    [4, 1]
  );

  const formY = useTransform(
    scrollYProgress,
    [0.85, 1],
    ["100vh", "0vh"]
  );

  // Step 1 states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Step 2 states
  const [timeSlots, setTimeSlots] = useState([{ date: '', time: '' }]);
  const [service, setService] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleConfirmToggle = (val) => {
    setIsConfirmed(val);
    if (val) setFocusedField('confirm');
    else setFocusedField(null);
  };

  const handleAddSlot = () => {
    if (timeSlots.length < 5) {
      setTimeSlots([...timeSlots, { date: '', time: '' }]);
    }
  };

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...timeSlots];
    newSlots[index][field] = value;
    setTimeSlots(newSlots);
  };

  const handleRemoveSlot = (index) => {
    const newSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(newSlots);
  };

  const isStep1Valid = name.trim() !== '' && email.trim() !== '' && message.trim() !== '';
  const isStep2Valid = timeSlots.every(slot => slot.date.trim() !== '' && slot.time.trim() !== '') && service !== '' && isConfirmed;

  const handleNext = (e) => {
    e.preventDefault();
    if (isStep1Valid) setStep(2);
  };

  const renderForm = (isDesktop = false) => (
    <form
      className="w-full min-w-[18rem] max-w-md flex flex-col gap-4 mt-10"
      style={isDesktop ? { margin: '20px 0px 20px 80px' } : {}}
      onSubmit={(e) => e.preventDefault()}
    >

      {step === 1 && (
        <>
          {/* Header */}
          <div className="flex items-center gap-4 border-gray-700/50 pb-4">
            <h2 className="text-xl font-semibold text-white tracking-wide m-0">Personal Details</h2>
          </div>
          <div className="input-group !mb-2">
            <input type="text" name="name" id="name" className={`custom-input ${name ? 'has-value' : ''}`} placeholder=" " value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} required />
            <label htmlFor="name" className="custom-label">Name</label>
          </div>

          <div className="input-group !mb-2">
            <input type="email" name="email" id="email" className={`custom-input ${email ? 'has-value' : ''}`} placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} required />
            <label htmlFor="email" className="custom-label">Email</label>
          </div>

          <div className="input-group !mb-2">
            <textarea name="message" id="message" rows="4" className={`custom-input resize-none ${message ? 'has-value' : ''}`} placeholder=" " value={message} onChange={(e) => setMessage(e.target.value)} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} required></textarea>
            <label htmlFor="message" className="custom-label">Message</label>
          </div>

          <button type="button" onClick={handleNext} className="custom-submit-btn w-full !py-3 !text-lg !mt-2 shadow-lg hover:shadow-white/10" disabled={!isStep1Valid}>Next</button>
        </>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-8 text-gray-200 animate-fade-in w-full max-w-md mx-auto">

          {/* Header */}
          <div className="flex items-center gap-4 border-gray-700/50 pb-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-all cursor-pointer"
              title="Go back"
            >
              &larr;
            </button>
            <h2 className="text-xl font-semibold text-white tracking-wide m-0">Booking Details</h2>
          </div>

          {/* Time Slots */}
          <div className="flex flex-col gap-4">
            <label className="block text-sm text-gray-400 uppercase tracking-wider font-semibold">Your free time slot</label>
            <div className="flex flex-col gap-3">
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex gap-2 items-center group">
                  <div className="flex gap-3 flex-1">
                    <input
                      type="date"
                      className="custom-datetime-input"
                      min={minDate}
                      value={slot.date}
                      onChange={(e) => handleSlotChange(index, 'date', e.target.value)}
                      onFocus={() => setFocusedField('datetime')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <input
                      type="time"
                      className="custom-datetime-input"
                      value={slot.time}
                      onChange={(e) => handleSlotChange(index, 'time', e.target.value)}
                      onFocus={() => setFocusedField('datetime')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>
                  {timeSlots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(index)}
                      className="text-gray-500 hover:text-red-400 w-8 h-8 rounded-full hover:bg-red-400/10 transition-all flex-shrink-0 flex items-center justify-center cursor-pointer"
                      aria-label="Remove slot"
                      title="Remove this slot"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {timeSlots.length < 5 && (
              <button
                type="button"
                onClick={handleAddSlot}
                className="add-slot-btn"
              >
                <span className="text-lg leading-none">+</span> Add another slot
              </button>
            )}
          </div>

          {/* Service Selection */}
          <div className="flex flex-col gap-4">
            <label htmlFor="service" className="block text-sm text-gray-400 uppercase tracking-wider font-semibold">Service Required</label>
            <div className="relative">
              <select
                name="service"
                id="service"
                className="custom-select-input"
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  e.target.blur();
                }}
                onFocus={() => setFocusedField('service')}
                onBlur={() => setFocusedField(null)}
                required
              >
                <option value="" disabled hidden>Select a service...</option>
                <option value="web">Web Development</option>
                <option value="app">App Development</option>
                <option value="seo">SEO Optimization</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                ▼
              </div>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div
            className="flex items-center gap-4 mt-2 p-4 transition-colors cursor-pointer"
            onClick={() => handleConfirmToggle(!isConfirmed)}
            onMouseEnter={() => { if (isConfirmed) setFocusedField('confirm') }}
            onMouseLeave={() => setFocusedField(null)}
          >
            <div className="relative flex items-center justify-center flex-shrink-0">
              <input
                type="checkbox"
                id="confirm"
                className="peer w-5 h-5 appearance-none border-2 border-gray-500 rounded-md checked:border-blue-500 checked:bg-blue-500 transition-all cursor-pointer"
                checked={isConfirmed}
                onChange={(e) => handleConfirmToggle(e.target.checked)}
                onClick={(e) => e.stopPropagation()}
              />
              <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <label htmlFor="confirm" className="text-gray-300 text-sm cursor-pointer select-none flex-1" onClick={(e) => e.preventDefault()}>
              I confirm all details are correct and ready to proceed.
            </label>
          </div>

          <button type="submit" className="custom-submit-btn w-full !py-3 !text-lg !mt-2 shadow-lg hover:shadow-white/10" disabled={!isStep2Valid}>
            Confirm Booking
          </button>
        </div>
      )}

    </form>
  );

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="flex lg:hidden flex-wrap justify-center gap-6 p-6" style={{ marginBottom: '50px' }}>
        {statsData.map(stat => (
          <StatItem key={stat.id} img={stat.img} limit={stat.limit} invert={stat.invert} url={stat.url} />
        ))}
      </div>
      <div className="lg:hidden p-6 flex justify-center pb-20">
        {renderForm()}
      </div>

      {/* Desktop Animated Section */}
      <div className="hidden lg:block">
        <div ref={containerRef} style={{ height: '700vh', position: 'relative' }}>
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <motion.div
              style={{
                y: phoneY,
                scale: phoneScale,
                width: '380px',
                height: '780px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Fake iPhone frame image wrapper - fallback to border if image is missing */}
              <img
                src={iphoneFrame}
                alt="iPhone Frame"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 20,
                }}
              />

              {/* Screen Area */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                right: '12px',
                bottom: '12px',
                backgroundColor: '#000', // Screen background color (black)
                borderRadius: '35px',
                overflow: 'hidden',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* App Grid */}
                <motion.div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '30px',
                    padding: '30px',
                    width: '100%',
                    scale: iconsScale
                  }}
                >
                  {statsData.map(stat => (
                    <a key={stat.id} href={stat.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform">
                      <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                        <img src={stat.img} alt="app-icon" className="w-12 h-12 object-contain" style={stat.invert ? { filter: 'invert(1)' } : {}} />
                      </div>
                    </a>
                  ))}
                </motion.div>

                {/* "Screen Off" Black Overlay */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'black',
                    opacity: screenOpacity,
                    pointerEvents: 'none',
                    zIndex: 15
                  }}
                />
              </div>
            </motion.div>

            {/* Desktop Form Animation */}
            <motion.div
              style={{
                y: formY,
                position: 'absolute',
                width: '100%',
                maxWidth: '600px',
                zIndex: 30,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <h1 className="text-5xl font-bold text-center text-white mb-2">Let's Connect</h1>
              <p className="text-gray-400 mb-8">&nbsp;</p>

              <div className="bg-[#1a1a1a] p-8 rounded-[40px] border border-[#333] shadow-2xl w-full">
                {renderForm(true)}
              </div>

              {/* Interactive Avatar Popups */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <AnimatePresence mode="wait">
                  {focusedField && avatarConfig[focusedField] && (
                    <motion.div
                      key={focusedField}
                      initial={{ opacity: 0, scale: 0.8, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: -20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    >
                      {/* Speech Bubble */}
                      <div
                        className="bg-white text-black rounded-2xl shadow-xl font-medium text-sm"
                        style={{
                          position: 'absolute',
                          padding: '5px',
                          ...avatarConfig[focusedField].bubbleStyles
                        }}
                      >
                        {avatarConfig[focusedField].message}
                        {/* Little triangle tail for the speech bubble */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '-8px',
                            right: '20px',
                            width: 0,
                            height: 0,
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderTop: '10px solid white'
                          }}
                        />
                      </div>

                      {/* Avatar Image */}
                      <img
                        src={avatarConfig[focusedField].img}
                        alt="Avatar"
                        style={{
                          position: 'absolute',
                          objectFit: 'contain',
                          ...avatarConfig[focusedField].avatarStyles
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Connect;

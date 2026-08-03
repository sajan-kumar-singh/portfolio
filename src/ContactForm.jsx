import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import character1 from './assets/character1.webp';
import character2 from './assets/character2.webp';
import character3 from './assets/character3.webp';
import character4 from './assets/character4.webp';
import character5 from './assets/character5.webp';
import character6 from './assets/character6.webp';
import character7 from './assets/character7.webp';
import character8 from './assets/character8.webp';

// Configuration for the Avatar Popups
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
    avatarStyles: { width: '230px', left: '100px', bottom: '115px', zIndex: 40, transform: 'rotate(-1deg)' },
    bubbleStyles: { left: '-160px', bottom: '235px', zIndex: 40 }
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
    avatarStyles: { width: '460px', right: '-270px', top: '170px', zIndex: 40, transform: 'rotate(0deg)' },
    bubbleStyles: { right: '-50px', top: '150px', zIndex: 40 }
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

// Configuration for the Success State
const successConfig = {
  img: character7,
  message: "Thank you! We will respond within 24 Hours!!",
  avatarStyles: { width: '300px', objectFit: 'contain', margin: '0 auto', transform: 'rotate(0deg)' },
  messageStyles: { fontSize: '1.8rem', color: '#ffffffff', marginTop: '20px', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'nowrap' }
};

// Configuration for the Error State
const errorConfig = {
  img: character8, // Using a placeholder for now
  message: "We are facing some issues, please try later.",
  avatarStyles: { width: '650px', objectFit: 'contain', margin: '0 auto', transform: 'rotate(0deg)' },
  messageStyles: { fontSize: '1.8rem', color: '#f87171', marginTop: '20px', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'nowrap' }
};

const servicesList = [
  { id: 'web', label: 'Web Development', price: 15000 },
  { id: 'app', label: 'App Development', price: 25000 },
  { id: 'seo', label: 'SEO Optimization', price: 10000 }
];

export default function ContactForm({ isDesktop = false }) {
  const [step, setStep] = useState(1);
  const [focusedField, setFocusedField] = useState(null);

  // Step 1 states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Step 2 states
  const [timeSlots, setTimeSlots] = useState([{ date: '', time: '' }]);
  const [service, setService] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [minDate, setMinDate] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'submitting', 'success', 'error'
  const [submitMessage, setSubmitMessage] = useState('');

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

  const isValidTime = (timeStr) => {
    if (!timeStr) return false;
    const [hours, minutes] = timeStr.split(':').map(Number);
    const timeInMins = hours * 60 + minutes;
    const minTime = 10 * 60; // 10:00
    const maxTime = 18 * 60; // 18:00
    return timeInMins >= minTime && timeInMins <= maxTime;
  };

  const isValidDate = (dateStr) => {
    if (!dateStr || !minDate) return false;
    return dateStr >= minDate;
  };

  const nameRegex = /^[a-zA-Z0-9\s]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isStep1Valid = name.trim() !== '' && name.length <= 25 && nameRegex.test(name) && email.trim() !== '' && emailRegex.test(email) && message.trim() !== '' && message.length <= 400;
  const isStep2Filled = timeSlots.every(slot => isValidDate(slot.date) && isValidTime(slot.time)) && service !== '';
  const isStep2Valid = isStep2Filled && isConfirmed;

  const handleNext = (e) => {
    e.preventDefault();
    if (isStep1Valid) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setSubmitMessage("Thank you! Your booking details have been submitted successfully.");
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage("An error occurred. Please try again later.");
    }
  };

  const renderForm = () => {
    return (
      <form
        onSubmit={handleSubmit}
        className="w-full min-w-[18rem] max-w-md flex flex-col gap-4 mt-10"
        style={isDesktop ? { margin: '20px 0px 20px 80px' } : {}}
      >

        {step === 1 && (
          <>
            {/* Header */}
            <div className="flex items-center gap-4 border-gray-700/50 pb-4">
              <h2 className="text-xl font-semibold text-white tracking-wide m-0">Personal Details</h2>
            </div>
            <div className="input-group !mb-2 relative">
              <input type="text" name="name" id="name" className={`custom-input ${name ? 'has-value' : ''} ${name.trim() !== '' && !nameRegex.test(name) ? '!border-red-500' : ''}`} placeholder=" " value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} maxLength={25} required />
              <label htmlFor="name" className="custom-label">Name</label>
              <div className="text-xs text-gray-500 text-right mt-1">{name.length}/25</div>
              {name.trim() !== '' && !nameRegex.test(name) && (
                <div className="text-xs text-red-500 mt-1">Only alphanumeric characters and spaces are allowed.</div>
              )}
            </div>

            <div className="input-group !mb-2 relative">
              <input type="email" name="email" id="email" className={`custom-input ${email ? 'has-value' : ''} ${email.trim() !== '' && !emailRegex.test(email) ? '!border-red-500' : ''}`} placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} required />
              <label htmlFor="email" className="custom-label">Email</label>
              {email.trim() !== '' && !emailRegex.test(email) && (
                <div className="text-xs text-red-500 mt-1">Please enter a valid email address.</div>
              )}
            </div>

            <div className="input-group !mb-2 relative">
              <textarea name="message" id="message" rows="4" className={`custom-input resize-none ${message ? 'has-value' : ''}`} placeholder=" " value={message} onChange={(e) => setMessage(e.target.value)} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} maxLength={400} required></textarea>
              <label htmlFor="message" className="custom-label">Message</label>
              <div className="text-xs text-gray-500 text-right mt-1">{message.length}/400</div>
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
              <div className="flex items-center gap-3">
                <label className="block text-sm text-gray-400 uppercase tracking-wider font-semibold">Your free time slot</label>

              </div>
              <div className="flex flex-col gap-3">
                {timeSlots.map((slot, index) => (
                  <div key={index} className="flex gap-2 items-center group">
                    <div className="flex gap-3 flex-1">
                      <div className="flex-1 flex flex-col gap-1">
                        <input
                          type="date"
                          className={`custom-datetime-input w-full ${slot.date && !isValidDate(slot.date) ? '!border-red-500' : ''}`}
                          min={minDate}
                          value={slot.date}
                          onChange={(e) => handleSlotChange(index, 'date', e.target.value)}
                          onFocus={() => setFocusedField('datetime')}
                          onBlur={() => setFocusedField(null)}
                          required
                        />
                        <span className={`text-[10px] text-red-500 pl-1 leading-tight transition-opacity ${slot.date && !isValidDate(slot.date) ? 'opacity-100' : 'opacity-0'}`}>
                          Min date can be filled value of {minDate}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <input
                          type="time"
                          className={`custom-datetime-input w-full ${slot.time && !isValidTime(slot.time) ? '!border-red-500' : ''}`}
                          value={slot.time}
                          min="10:00"
                          max="18:00"
                          onChange={(e) => handleSlotChange(index, 'time', e.target.value)}
                          onFocus={() => setFocusedField('datetime')}
                          onBlur={() => setFocusedField(null)}
                          required
                        />
                        <span className={`text-[10px] text-red-500 pl-1 leading-tight transition-opacity ${slot.time && !isValidTime(slot.time) ? 'opacity-100' : 'opacity-0'}`}>
                          Time allowed 10AM to 6PM
                        </span>
                      </div>
                    </div>
                    {timeSlots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(index)}
                        className="text-gray-500 hover:text-red-400 w-8 h-8 rounded-full hover:bg-red-400/10 transition-all flex-shrink-0 flex items-center justify-center cursor-pointer"
                        aria-label="Remove slot"
                        title="Remove this slot"
                        onFocus={() => setFocusedField('datetime')}
                        onBlur={() => setFocusedField(null)}
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
                  onFocus={() => setFocusedField('datetime')}
                  onBlur={() => setFocusedField(null)}
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
                  {servicesList.map(s => (
                    <option key={s.id} value={`${s.label} (₹${s.price})`}>
                      {s.label} - ₹{s.price}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  ▼
                </div>
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <div
              className={`flex items-center gap-4 mt-2 p-4 transition-colors ${!isStep2Filled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => { if (isStep2Filled) handleConfirmToggle(!isConfirmed) }}
              onMouseEnter={() => { if (isConfirmed && isStep2Filled) setFocusedField('confirm') }}
              onMouseLeave={() => setFocusedField(null)}
            >
              <div className="relative flex items-center justify-center flex-shrink-0">
                <input
                  type="checkbox"
                  id="confirm"
                  className={`peer w-5 h-5 appearance-none border-2 border-gray-500 rounded-md checked:border-blue-500 checked:bg-blue-500 transition-all ${!isStep2Filled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  checked={isConfirmed}
                  disabled={!isStep2Filled}
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

            <button type="submit" className="custom-submit-btn w-full !py-3 !text-lg !mt-2 shadow-lg hover:shadow-white/10" disabled={!isStep2Valid || submitStatus === 'submitting'}>
              {submitStatus === 'submitting' ? 'Submitting...' : 'Confirm Booking'}
            </button>
          </div>
        )}

        {/* Hidden inputs for Web3Forms access key and data preservation across steps */}
        <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_KEY} />
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="message" value={message} />
        <input type="hidden" name="timeSlots" value={timeSlots.map((s, i) => `Slot ${i + 1}: ${s.date} at ${s.time}`).join(' | ')} />
      </form>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {submitStatus === 'success' ? (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className={isDesktop ? "flex flex-col items-center justify-center w-full" : "flex flex-col items-center justify-center w-full mt-10"}>
          {isDesktop && <img src={successConfig.img} alt="Success Character" style={{ ...successConfig.avatarStyles }} />}
          <p style={isDesktop ? { ...successConfig.messageStyles } : { fontSize: '1.5rem', color: '#4ade80', marginTop: '20px', fontWeight: 'bold', textAlign: 'center' }}>{successConfig.message}</p>
        </motion.div>
      ) : submitStatus === 'error' ? (
        <motion.div key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className={isDesktop ? "flex flex-col items-center justify-center w-full" : "flex flex-col items-center justify-center w-full mt-10"}>
          {isDesktop && <img src={errorConfig.img} alt="Error Character" style={{ ...errorConfig.avatarStyles }} />}
          <p style={isDesktop ? { ...errorConfig.messageStyles } : { fontSize: '1.5rem', color: '#f87171', marginTop: '20px', fontWeight: 'bold', textAlign: 'center' }}>{errorConfig.message}</p>
        </motion.div>
      ) : (
        <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, y: isDesktop ? -20 : 0 }} className="w-full relative flex flex-col items-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-center text-white mb-2">Let's Connect</h1>
          <p className="text-gray-400 mb-6 lg:mb-8">&nbsp;</p>

          <div className="bg-[#1a1a1a] p-6 lg:p-8 rounded-3xl lg:rounded-[40px] border border-[#333] shadow-2xl w-full">
            {renderForm()}
          </div>

          {/* Interactive Avatar Popups */}
          {isDesktop && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <AnimatePresence>
                {focusedField && avatarConfig[focusedField] && (
                  <motion.div
                    key={focusedField}
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -20 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React, { useState, useEffect } from 'react';
import './index.css';

function Connect() {
  const [step, setStep] = useState(1);

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

  return (
    <>
      <div className="lg:hidden p-6 flex justify-center pb-20">
        <form className="w-full min-w-[23rem] max-w-md flex flex-col gap-4 mt-10" onSubmit={(e) => e.preventDefault()}>

          {step === 1 && (
            <>
              {/* Header */}
              <div className="flex items-center gap-4 border-gray-700/50 pb-4">
                <h2 className="text-xl font-semibold text-white tracking-wide m-0">Personal Details</h2>
              </div>
              <div className="input-group !mb-2">
                <input type="text" name="name" id="name" className={`custom-input ${name ? 'has-value' : ''}`} placeholder=" " value={name} onChange={(e) => setName(e.target.value)} required />
                <label htmlFor="name" className="custom-label">Name</label>
              </div>

              <div className="input-group !mb-2">
                <input type="email" name="email" id="email" className={`custom-input ${email ? 'has-value' : ''}`} placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="email" className="custom-label">Email</label>
              </div>

              <div className="input-group !mb-2">
                <textarea name="message" id="message" rows="4" className={`custom-input resize-none ${message ? 'has-value' : ''}`} placeholder=" " value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
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
                          required
                        />
                        <input
                          type="time"
                          className="custom-datetime-input"
                          value={slot.time}
                          onChange={(e) => handleSlotChange(index, 'time', e.target.value)}
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
                    onChange={(e) => setService(e.target.value)}
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
              <div className="flex items-center gap-4 mt-2 p-4 transition-colors cursor-pointer" onClick={() => setIsConfirmed(!isConfirmed)}>
                <div className="relative flex items-center justify-center flex-shrink-0">
                  <input
                    type="checkbox"
                    id="confirm"
                    className="peer w-5 h-5 appearance-none border-2 border-gray-500 rounded-md checked:border-blue-500 checked:bg-blue-500 transition-all cursor-pointer"
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
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
      </div>
      <div className="hidden lg:block">
        <div className="page-container">
          <h1>Connect</h1>
          <p>Let's get in touch!</p>
        </div>
      </div>
    </>
  );
}

export default Connect;

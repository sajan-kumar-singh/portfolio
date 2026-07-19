import React, { useState, useEffect } from 'react';
import './index.css';

const phrases = [
  "Full Stack Architect",
  "Entrepreneur",
  "Influencer",
  "Trader",
  "Gamer",
  "Fighter"
];

const cuboidPhrases = [
  "who designs the whole stack, not just the surface.",
  "who bets on ideas before the world believes in them.",
  "who never trades trust for trends.",
  "who plays the long game where others panic.",
  "who chases mastery, not medals.",
  "who absorbs the pain so loved ones never have to."
];

const TypingText = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;
    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    // Calculate speed so it takes ~2s to type and ~1s to delete
    const typeSpeed = 2000 / (fullText.length || 1);
    const deleteSpeed = 1000 / (fullText.length || 1);

    const handleTyping = () => {
      setText(prev => isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1));
    };

    if (!isDeleting && text === fullText) {
      // Pause when word is fully typed
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && text === '') {
      // Pause before typing next word
      timer = setTimeout(() => {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
      }, 500);
    } else {
      timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <div className="typing-container">
      <h1 className="intro-text">
        Hi, <span className="highlight">SAJAN</span> here!
      </h1>
      <div className="dynamic-line">
        <span className="small-text">I'm</span>
        <h2 className="dynamic-text">
          <span className="typed-text">{text}</span>
          <span className="cursor">|</span>
        </h2>
      </div>
      <div className="cuboid-wrapper">
        <div key={loopNum} className="cuboid-text">
          {cuboidPhrases[loopNum % cuboidPhrases.length]}
        </div>
      </div>
    </div>
  );
};

export default TypingText;

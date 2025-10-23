import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { MainPage } from './components/MainPage';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleEnter = () => {
    setShowSplash(false);
    setHasInteracted(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-black font-['Inter',sans-serif]">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onEnter={handleEnter} />
        ) : (
          <MainPage key="main" startAudio={hasInteracted} />
        )}
      </AnimatePresence>
    </div>
  );
}

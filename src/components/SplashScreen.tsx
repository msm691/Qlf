import React from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onEnter: () => void;
}

export function SplashScreen({ onEnter }: SplashScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-black flex items-center justify-center cursor-pointer z-50"
      onClick={onEnter}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-white text-5xl md:text-7xl tracking-wider font-light relative">
          quelamif.fr
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-transparent to-red-500/20 blur-2xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white/40 mt-8 text-sm tracking-widest"
        >
          Click to enter
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background Animated Beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [-1000, 1000],
            opacity: [0, 0.5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/4 w-[2px] h-[500px] bg-gradient-to-b from-transparent via-primary to-transparent"
        />
        <motion.div 
          animate={{ 
            y: [-1000, 1000],
            opacity: [0, 0.5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute left-3/4 w-[2px] h-[500px] bg-gradient-to-b from-transparent via-secondary to-transparent"
        />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative mb-8">
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 20px rgba(189,0,255,0.3)", "0 0 50px rgba(189,0,255,0.6)", "0 0 20px rgba(189,0,255,0.3)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-1"
          >
            <div className="w-full h-full bg-background rounded-[22px] flex items-center justify-center">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 80L50 20L80 80" stroke="url(#paint0_linear)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M35 55H65" stroke="url(#paint1_linear)" strokeWidth="12" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#BD00FF" />
                    <stop offset="1" stopColor="#00D1FF" />
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="35" y1="55" x2="65" y2="55" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#BD00FF" />
                    <stop offset="1" stopColor="#00D1FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
          {/* Logo Glow Ring */}
          <div className="absolute -inset-4 border-2 border-primary/20 rounded-[40px] animate-pulse" />
        </div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl font-black tracking-tighter text-white neon-text-purple"
        >
          NEXA
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-4 text-white/60 font-medium tracking-widest text-xs uppercase"
        >
          Future of Content
        </motion.p>
      </motion.div>

      {/* Loading Bar */}
      <div className="absolute bottom-20 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-full w-full bg-gradient-to-r from-primary via-secondary to-primary"
        />
      </div>
    </div>
  );
};

export default SplashScreen;

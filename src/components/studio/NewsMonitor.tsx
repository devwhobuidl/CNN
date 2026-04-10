import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsMonitorProps {
  isBroadcasting: boolean;
  newsImage: string | null;
  showWeather: boolean;
}

export function NewsMonitor({ isBroadcasting, newsImage, showWeather }: NewsMonitorProps) {
  return (
    <>
      {/* News Graphic Monitor */}
      <AnimatePresence>
        {isBroadcasting && newsImage && !showWeather && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            className="absolute top-2 right-2 md:top-10 md:right-10 w-48 md:w-64 aspect-video z-20 overflow-hidden rounded-lg border-2 border-primary/50 shadow-[0_0_20px_rgba(56,255,20,0.2)] bg-background-dark"
          >
            <img src={newsImage} alt="News Graphic" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            {/* LIVE Tag Overlay */}
            <div className="absolute top-2 right-2 bg-red-600/90 text-white font-bold text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              LIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

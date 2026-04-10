import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SubtitleOverlayProps {
  text: string;
  visible: boolean;
}

export function SubtitleOverlay({ text, visible }: SubtitleOverlayProps) {
  return (
    <AnimatePresence>
      {visible && text && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-8 z-30"
        >
          <div className="bg-black/90 border-2 border-primary/30 py-4 px-6 rounded-xl shadow-[0_0_30px_rgba(56,255,20,0.1)] backdrop-blur-xl">
            <p className="text-lg md:text-xl font-bold text-center leading-relaxed text-white">
              {text}
            </p>
            <div className="mt-2 h-0.5 w-full bg-primary/10 overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: text.length * 0.08, ease: "linear" }}
                 className="h-full bg-primary shadow-[0_0_5px_rgba(56,255,20,1)]"
               />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

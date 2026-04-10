import React from 'react';
import { motion } from 'motion/react';
import { LiveChat } from './LiveChat';

export function ChatInterface() {
  return (
    <div className="flex-1 min-h-0 bg-black/40 border border-primary/20 rounded-xl flex flex-col backdrop-blur-md overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-primary/20 bg-primary/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Neural_Comms_Terminal</span>
        </div>
        <span className="text-[9px] text-primary/40 font-mono">ENCRYPTED_STREAM</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <LiveChat />
      </div>

      {/* Footer / Input Placeholder */}
      <div className="p-3 border-t border-primary/20 bg-black/40">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-8 bg-primary/5 border border-primary/20 rounded-lg px-3 flex items-center">
            <span className="text-[10px] text-primary/40 font-mono">WAITING_FOR_INPUT...</span>
          </div>
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-1.5 h-4 bg-primary rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

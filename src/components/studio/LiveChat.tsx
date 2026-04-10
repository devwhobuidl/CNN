import React from 'react';
import { CommentsSection } from './CommentsSection';

export function LiveChat() {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <CommentsSection />
      
      {/* Status Bar */}
      <div className="px-3 py-2 bg-primary/5 border-t border-primary/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-[8px] text-primary/60 font-bold uppercase tracking-widest">3,421 Viewers</span>
        </div>
        <span className="text-[8px] text-primary/40">MODE: READ_ONLY</span>
      </div>
    </div>
  );
}

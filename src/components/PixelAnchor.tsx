import React from 'react';

interface PixelAnchorProps {
  expression?: 'talking' | 'idle' | 'blink' | 'panic' | 'smile';
  size?: number;
}

export function PixelAnchor({ expression = 'idle', size = 320 }: PixelAnchorProps) {
  // Map expressions to the actual WebP assets
  const assetMap = {
    idle: '/vtuber/doge_idle.webp',
    talking: '/vtuber/doge_talk.webp',
    blink: '/vtuber/doge_blink.webp',
    panic: '/vtuber/doge_panic.webp',
    smile: '/vtuber/doge_smile.webp'
  };

  const imageSrc = assetMap[expression] || assetMap.idle;

  return (
    <div 
      className="relative drop-shadow-[0_20px_50px_rgba(56,255,20,0.3)] select-none"
      style={{ width: size, height: size }}
    >
      <img
        src={imageSrc}
        alt={`AI Anchor (${expression})`}
        className="w-full h-full object-contain image-pixelated transition-opacity duration-150"
      />
      
      {/* Dynamic Glow Layer */}
      <div className="absolute inset-x-0 bottom-1/4 h-1/2 bg-gradient-to-t from-primary/20 to-transparent blur-3xl opacity-40 pointer-events-none" />
    </div>
  );
}

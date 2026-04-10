import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PixelAnchor } from '../PixelAnchor';

interface AnchorSpriteProps {
  isSpeaking: boolean;
}

export function AnchorSprite({ isSpeaking }: AnchorSpriteProps) {
  const [expression, setExpression] = React.useState<'idle' | 'blink' | 'talking'>('idle');

  // Logic for blinking or random expressions when idle
  React.useEffect(() => {
    if (isSpeaking) {
      setExpression('talking');
      return;
    }

    const interval = setInterval(() => {
      setExpression('blink');
      setTimeout(() => setExpression('idle'), 200);
    }, 4000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  return (
    <motion.div
      animate={{ 
        y: [0, -10, 0],
        rotate: isSpeaking ? [-0.5, 0.5, -0.5] : [0, 0, 0]
      }}
      transition={{ 
        y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: 0.1 }
      }}
      className="relative z-10 origin-bottom"
    >
      <PixelAnchor expression={expression} size={420} />
      
      {/* Reflection Floor */}
      <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-[120%] h-20 bg-gradient-to-b from-primary/10 to-transparent blur-2xl -z-10" />
    </motion.div>
  );
}

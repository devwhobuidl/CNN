import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_COMMENTS = [
  "BULLISH ON $CNN! LFG 🚀",
  "Is the anchor real or AI? So smooth.",
  "Just bought more SOL for the dip.",
  "PEPE looks like it's ready for another leg up.",
  "WIF hat stays on.",
  "Anyone else seeing this volume?",
  "Global news network for degens, finally.",
  "What's the forecast for the memecoin season?",
  "Love the pixel art style!",
  "CNN tokens hitting 10M cap soon.",
  "Which exchange listing next?",
  "I'm here for the alpha.",
  "The future of news is here.",
  "Bullish signal detected 📈",
  "Checking the Fear & Greed index constantly.",
  "Solana ecosystem is thriving right now."
];

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  color: string;
}

const USER_COLORS = [
  '#38ff14', // Primary Green
  '#3b82f6', // blue-500
  '#f59e0b', // amber-500
  '#ec4899', // pink-500
  '#8b5cf6', // violet-500
  '#10b981', // emerald-500
];

export function CommentsSection() {
  const [comments, setComments] = React.useState<Comment[]>([]);

  React.useEffect(() => {
    // Initial comments
    const initial = [...Array(12)].map((_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      user: `user_${Math.random().toString(36).substr(2, 5)}`,
      text: MOCK_COMMENTS[Math.floor(Math.random() * MOCK_COMMENTS.length)],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      color: USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)]
    }));
    setComments(initial);

    // New comments interval
    const interval = setInterval(() => {
      const newComment = {
        id: Math.random().toString(36).substr(2, 9),
        user: `user_${Math.random().toString(36).substr(2, 5)}`,
        text: MOCK_COMMENTS[Math.floor(Math.random() * MOCK_COMMENTS.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        color: USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)]
      };
      setComments(prev => [newComment, ...prev].slice(0, 30));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3 font-mono">
      <AnimatePresence initial={false}>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-0.5"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold" style={{ color: comment.color }}>
                {comment.user}
              </span>
              <span className="text-[8px] text-zinc-600">{comment.timestamp}</span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-tight">
              {comment.text}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Database, Server, Cpu } from 'lucide-react';

const LOG_MESSAGES = [
  "Establishing neural link with Binance stream...",
  "DEX_AGGR: Synchronizing SolScan pool data",
  "Analyzing social sentiment for PEPE/USDT",
  "LLM_CORE: Initializing anchor script generation",
  "Unit 001: Signal integrity nominal",
  "Fetching fear & greed index matrix",
  "Database_Sync: 12 new items indexed",
  "RSS_DAEMON: Checking Cointelegraph feed",
  "Warning: High volatility detected in SOLUSDT",
  "Encrypted tunnel: Handshake complete",
  "Allocating system memory for broadcast unit"
];

export function InternalTicker() {
  const [logs, setLogs] = React.useState<string[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      setLogs(prev => [...prev.slice(-15), newLog]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-black/40 border border-primary/10 rounded-xl flex flex-col backdrop-blur-sm overflow-hidden min-h-0">
      <div className="p-3 border-b border-primary/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-primary" />
          <span className="text-[9px] text-primary font-bold uppercase tracking-widest">System_Console_Logs</span>
        </div>
        <Cpu className="w-3 h-3 text-primary/30" />
      </div>

      <div className="flex-1 p-3 font-mono text-[9px] space-y-1.5 overflow-hidden">
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div
              key={`${i}-${log}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1 - (logs.length - i) * 0.05, x: 0 }}
              className="flex gap-2"
            >
              <span className="text-primary/20">{">"}</span>
              <span className={i === logs.length - 1 ? "text-primary/80" : "text-zinc-500"}>
                {log}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-2 bg-primary/5 flex items-center gap-2 shrink-0">
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              className="w-1.5 h-1.5 bg-primary/40 rounded-full"
            />
          ))}
        </div>
        <span className="text-[8px] text-primary/30 uppercase tracking-tighter">Processing...</span>
      </div>
    </div>
  );
}

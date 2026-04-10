import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, BarChart3, CloudRain, Wind } from 'lucide-react';
import { useMarketStats } from '../../hooks/useMarketStats';

export function MarketStats() {
  const { fearGreed, altcoinIndex } = useMarketStats();

  return (
    <div className="space-y-6">
      {/* Fear & Greed Index */}
      <div className="bg-black/40 border border-primary/10 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Sentiment_Index</span>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">CODE: FNG_01</div>
        </div>

        <div className="relative h-2 w-full bg-zinc-800 rounded-full overflow-hidden mb-4">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${fearGreed.value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${fearGreed.value > 50 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}
          />
        </div>

        <div className="flex justify-between items-end">
          <div>
            <div className="text-2xl font-black text-white">{fearGreed.value}</div>
            <div className={`text-[10px] uppercase font-bold tracking-tighter ${fearGreed.value > 50 ? 'text-green-500' : 'text-red-500'}`}>
              {fearGreed.classification}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-zinc-500 uppercase">Risk Level</div>
            <div className="text-xs font-bold text-white">{fearGreed.value > 70 ? 'EXTREME_GREED' : fearGreed.value < 30 ? 'EXTREME_FEAR' : 'NOMINAL_FLOW'}</div>
          </div>
        </div>
      </div>

      {/* Season Matrix */}
      <div className="bg-black/40 border border-primary/10 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Season_Matrix</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-[9px] text-zinc-500 uppercase tracking-tighter">Altcoin Index</div>
            <div className="text-xl font-black text-white">{altcoinIndex}</div>
            <div className="h-0.5 w-full bg-zinc-800">
              <div className="h-full bg-blue-400" style={{ width: `${altcoinIndex}%` }} />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[9px] text-zinc-500 uppercase tracking-tighter">Market Cap</div>
            <div className="text-xl font-black text-white">$2.4T</div>
            <div className="h-0.5 w-full bg-zinc-800">
              <div className="h-full bg-blue-400" style={{ width: '65%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Data Overlay */}
      <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudRain className="w-4 h-4 text-blue-400/50" />
          <div>
            <div className="text-[8px] text-blue-400/40 uppercase tracking-widest leading-none mb-1">Precipitation</div>
            <div className="text-xs font-bold text-blue-400/80">12% CHANCE</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-right">
          <div>
            <div className="text-[8px] text-blue-400/40 uppercase tracking-widest leading-none mb-1">Wind Speed</div>
            <div className="text-xs font-bold text-blue-400/80">4.2 M/S</div>
          </div>
          <Wind className="w-4 h-4 text-blue-400/50" />
        </div>
      </div>
    </div>
  );
}

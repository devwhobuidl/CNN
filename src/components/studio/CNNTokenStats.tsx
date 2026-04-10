import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, Percent, Lock, Info, ShieldCheck } from 'lucide-react';
import { useLivePrices } from '../../hooks/useLivePrices';

export function CNNTokenStats() {
  const prices = useLivePrices();
  const cnnData = prices['CNNUSDT'] || { price: '0.00042', changePercent: '+12.4%' };

  return (
    <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-4 md:p-5 relative overflow-hidden backdrop-blur-md flex flex-col gap-5">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
             <DollarSign className="w-4 h-4 text-black font-black" />
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider">Project Intel</h3>
            <div className="flex items-center gap-1 text-[8px] text-primary/60 font-mono">
              <span className="w-1 h-1 rounded-full bg-primary" />
              SOL_SCAN_CONNECTED
            </div>
          </div>
        </div>
        <div className="px-2 py-0.5 border border-primary/30 rounded text-primary text-[9px] font-bold uppercase tracking-widest bg-primary/10">
          $CNN
        </div>
      </div>

      {/* Main Stats */}
      <div className="space-y-4 shrink-0">
        <div className="bg-black/40 border border-primary/10 rounded p-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[9px] text-primary/40 uppercase tracking-tighter">Live Market Price</div>
              <div className="text-2xl font-black text-white tracking-tighter font-mono">{cnnData.price}</div>
            </div>
            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${cnnData.changePercent.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              <Percent className="w-3 h-3" />
              {cnnData.changePercent}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <div className="text-[9px] text-primary/40 uppercase tracking-tighter">Ticker</div>
              <div className="text-lg font-black text-white">$CNN</div>
            </div>
            <div>
              <div className="text-[9px] text-primary/40 uppercase tracking-tighter">Network</div>
              <div className="text-lg font-black text-white">SOLANA</div>
            </div>
          </div>
        </div>

        {/* Contract Section */}
        <div className="bg-black/40 border border-primary/10 rounded p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[10px] text-primary font-bold uppercase tracking-widest">
            <Lock className="w-3 h-3" />
            Contract Address
          </div>
          <a 
            href="https://bags.fm/BqbmcaxY8LgNaF4zyynEazLaHHDjZW8wpTtxbMf7BAGS" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/ca relative"
          >
            <div className="bg-primary/5 border border-dashed border-primary/30 p-2 rounded text-center group-hover/ca:bg-primary/10 transition-colors">
              <span className="text-[10px] text-primary font-mono break-all line-clamp-1">BqbmcaxY8LgNaF4zyynEazLaHHDjZW8wpTtxbMf7BAGS</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/ca:opacity-100 transition-opacity bg-primary/20 rounded">
              <span className="text-[8px] font-bold text-primary uppercase tracking-tighter">View on Bags.fm</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

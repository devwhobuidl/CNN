import React from 'react';
import { useLivePrices, TARGET_SYMBOLS } from '../../hooks/useLivePrices';

export function LiveTicker() {
  const prices = useLivePrices();

  return (
    <div className="w-full bg-black/80 border-y border-primary/20 backdrop-blur-md overflow-hidden py-2 select-none">
      <div className="flex animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex shrink-0">
            {TARGET_SYMBOLS.map((symbol) => {
              const data = prices[symbol];
              if (!data) return null;
              
              const isPositive = data.changePercent.startsWith('+');
              
              return (
                <div key={`${i}-${symbol}`} className="flex items-center gap-4 px-8 border-r border-primary/10">
                  <span className="text-zinc-500 font-bold text-xs">{data.symbol}</span>
                  <span className="text-white font-mono font-bold text-xs">
                    {data.price}
                  </span>
                  <span className={`text-[10px] font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {data.changePercent}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { GlobalFooter } from './studio/GlobalFooter';
import { SubtitleOverlay } from './studio/SubtitleOverlay';
import { AnchorSprite } from './studio/AnchorSprite';
import { LiveTicker } from './studio/LiveTicker';
import { MarketStats } from './studio/MarketStats';
import { NewsMonitor } from './studio/NewsMonitor';
import { LiveChat } from './studio/LiveChat';
import { CNNTokenStats } from './studio/CNNTokenStats';
import { InternalTicker } from './studio/InternalTicker';
import { useNewsBroadcaster } from '../hooks/useNewsBroadcaster';
import { Radio, Power, Video, Info } from 'lucide-react';

export default function NewsStudio({ autoStart = false }: { autoStart?: boolean }) {
  const { 
    currentArticle, 
    isBroadcasting, 
    isSpeaking, 
    subtitle, 
    startBroadcast, 
    stopBroadcast,
    syncNews,
    isSyncing
  } = useNewsBroadcaster(autoStart);

  return (
    <div className="relative w-full h-screen bg-background-dark overflow-hidden font-sans">
      {/* Background Studio Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/vtuber/newsroom_bg.webp')] bg-cover bg-center opacity-60 grayscale-[0.2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="scanline" />
      </div>

      {/* Main Studio Console Grid */}
      <div className="relative z-10 w-full h-full flex flex-col p-4 md:p-6 lg:p-8">
        {/* Header Header */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/20 border border-primary/50 rounded-lg">
              <Radio className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white flex items-center gap-2">
                CRYPTO NEWS NETWORK
                <span className="text-xs bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded uppercase font-mono tracking-widest">LIVE</span>
              </h1>
              <div className="text-[10px] text-primary/60 font-mono tracking-[0.2em] uppercase">Global Intelligence Broadcast // Unit 001</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={syncNews}
              disabled={isSyncing}
              className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest rounded hover:bg-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Info className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync News'}
            </button>
            <button 
              onClick={isBroadcasting ? stopBroadcast : startBroadcast}
              className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 font-black uppercase tracking-widest transition-all ${
                isBroadcasting 
                ? 'bg-red-600/90 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' 
                : 'bg-primary/90 border-primary text-black shadow-[0_0_20px_rgba(56,255,20,0.3)]'
              }`}
            >
              <Power className="w-5 h-5" />
              {isBroadcasting ? 'End Stream' : 'Go Live'}
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
          {/* Left Panel: Market & Social */}
          <div className="hidden lg:flex flex-col w-80 gap-6 shrink-0">
            <CNNTokenStats />
            <div className="flex-1 bg-black/40 border border-primary/10 rounded-xl overflow-hidden backdrop-blur-sm flex flex-col">
              <div className="p-3 border-b border-primary/10 flex items-center justify-between">
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Global Comms Terminal</span>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              <LiveChat />
            </div>
          </div>

          {/* Center Stage: The Anchor & Visuals */}
          <div className="flex-1 flex flex-col gap-6 relative min-w-0">
            {/* Studio Camera View */}
            <div className="flex-1 relative bg-black/40 border border-primary/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-inner group">
              {/* News Monitor Overlay */}
              <NewsMonitor 
                isBroadcasting={isBroadcasting} 
                newsImage={currentArticle?.imageUrl || null} 
                showWeather={false}
              />

              {/* Character Layer */}
              <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                <AnchorSprite isSpeaking={isSpeaking} />
              </div>

              {/* Subtitle Box */}
              <SubtitleOverlay text={subtitle} visible={isSpeaking} />
              
              {/* Broadcast Stats Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="bg-black/80 backdrop-blur-md border-l-4 border-primary p-3 rounded-r-lg">
                  <div className="text-[10px] text-primary/60 font-bold uppercase tracking-widest mb-1">Signal Status</div>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-xs text-zinc-500 uppercase">Bitrate</div>
                      <div className="text-sm font-bold text-white">8.4 Mbps</div>
                    </div>
                    <div className="h-6 w-px bg-zinc-800" />
                    <div>
                      <div className="text-xs text-zinc-500 uppercase">Latency</div>
                      <div className="text-sm font-bold text-white">42ms</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 text-primary opacity-20 group-hover:opacity-40 transition-opacity">
                <Video className="w-12 h-12" />
              </div>
            </div>

            {/* News Headline Lower-Third */}
            <div className="h-24 bg-primary text-black relative flex items-center px-8 rounded-xl shadow-[0_0_30px_rgba(56,255,20,0.1)] shrink-0">
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20" />
              <div>
                <div className="text-xs font-black uppercase tracking-[0.3em] mb-1 opacity-60">Breaking News</div>
                <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight leading-none truncate">
                  {currentArticle?.headline || "Waiting for next update..."}
                </h2>
              </div>
            </div>
          </div>

          {/* Right Panel: Data Matrix */}
          <div className="hidden xl:flex flex-col w-80 gap-6 shrink-0">
            <MarketStats />
            <InternalTicker />
          </div>
        </div>

        {/* Global News Ticker Footer */}
        <div className="mt-6 shrink-0">
          <LiveTicker />
        </div>
      </div>
      
      {/* Visual Glitch/Overlay FX */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-primary mix-blend-overlay animate-[flicker_0.15s_infinite]" />
    </div>
  );
}

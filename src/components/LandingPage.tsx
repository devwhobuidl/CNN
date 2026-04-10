import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Shield, Zap, Globe, Github, Twitter, MessageSquare, PlayCircle, Activity, Layout } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon: Icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-black/40 border border-primary/10 p-6 rounded-2xl backdrop-blur-sm group hover:border-primary/30 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function LandingPage({ onLaunch }: { onLaunch: () => void }) {
  return (
    <div className="min-h-screen bg-background-dark text-white font-sans selection:bg-primary selection:text-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-terminal-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary uppercase tracking-[0.2em] mb-8"
          >
            <Zap className="w-3 h-3 fill-primary" />
            Next Gen News Network
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic"
          >
            THE FUTURE OF <br />
            <span className="text-primary terminal-glow decoration-primary/30 underline-offset-8">CRYPTO NEWS</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed mb-12"
          >
            24/7 Autonomous AI broadcasting, live data matrix, and zero-latency intelligence for the modern degenerate trader.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onLaunch}
              className="group relative px-8 py-4 bg-primary rounded-full font-black text-black uppercase tracking-widest text-lg hover:scale-105 active:scale-95 transition-all w-full md:w-auto overflow-hidden shadow-[0_0_50px_rgba(56,255,20,0.3)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                Launch Studio
                <PlayCircle className="w-5 h-5" />
              </span>
            </button>
            
            <a
              href="https://bags.fm/BqbmcaxY8LgNaF4zyynEazLaHHDjZW8wpTtxbMf7BAGS"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-black text-white uppercase tracking-widest text-lg hover:bg-white/10 transition-all w-full md:w-auto"
            >
              Buy $CNN
            </a>
          </motion.div>
        </div>
      </section>

      {/* Live Preview / Stats Ticker */}
      <div className="border-y border-primary/10 bg-black/50 backdrop-blur-md relative overflow-hidden">
        <div className="flex animate-marquee py-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-8 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-bold">$CNN</span>
                <span className="text-primary font-mono font-bold">$0.00042</span>
                <span className="text-green-500 text-xs font-bold">+12.4%</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-bold">SOL</span>
                <span className="text-white font-mono font-bold">$142.20</span>
                <span className="text-green-500 text-xs font-bold">+2.1%</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black italic mb-4 uppercase">Advanced Broadcasting Core</h2>
            <div className="h-1 w-20 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Terminal}
              title="Autonomous Anchor"
              description="A fully autonomous AI character that processes live news and broadcasts 24/7 without human intervention."
              delay={0.1}
            />
            <FeatureCard
              icon={Activity}
              title="Live Data Matrix"
              description="Real-time websocket integration with global exchanges for precise price movement and volume tracking."
              delay={0.2}
            />
            <FeatureCard
              icon={Layout}
              title="Studio-Grade UI"
              description="Premium, performance-optimized interface built with high-fps animations and professional newsroom layouts."
              delay={0.3}
            />
            <FeatureCard
              icon={Globe}
              title="RSS Aggregation"
              description="Multi-source news engine that synchronizes updates from major crypto outlets directly into the studio."
              delay={0.4}
            />
            <FeatureCard
              icon={Shield}
              title="On-Chain Assets"
              description="Backed by the $CNN token ecosystem with community-driven governance and exclusive holder benefits."
              delay={0.5}
            />
            <FeatureCard
              icon={Zap}
              title="Zero Latency"
              description="Optimized pipeline using WebP assets and lightweight React components for instant loading on any device."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-primary/10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black italic mb-2 tracking-tighter">CNN_BROADCAST</h2>
            <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">Autonomous Intelligence Unit // v1.0.2</p>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
              <MessageSquare className="w-6 h-6" />
            </a>
            <a href="#" className="text-zinc-400 hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-zinc-500 text-xs mb-2 uppercase tracking-widest">© 2026 Crypto News Network</p>
            <div className="flex items-center gap-2 justify-center md:justify-end text-green-500/50 text-[10px] font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              SYSTEMS_OPERATIONAL_NOMINAL
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import { Clock, Wifi, ShieldAlert } from 'lucide-react';

export function GlobalFooter() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center text-[10px] text-primary/50 font-mono tracking-widest uppercase">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3" />
          {time.toLocaleTimeString([], { hour12: false })} UTC
        </div>
        <div className="flex items-center gap-2 text-green-500/50">
          <Wifi className="w-3 h-3" />
          Link Stable: 8.4GB/S
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-primary">
          <ShieldAlert className="w-3 h-3" />
          Defense Prot: ALPHA_V2
        </div>
        <div className="opacity-30">
          CNN_OS // CORE_SYSTEM_V.1.0.2
        </div>
      </div>
    </div>
  );
}

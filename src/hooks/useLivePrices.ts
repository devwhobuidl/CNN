import { useState, useEffect } from 'react';

// Top trending/meme coins to track
export const TARGET_SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'DOGEUSDT', 
  'PEPEUSDT', 'CNNUSDT', 'PUMPUSDT', 'SHIBUSDT', 'WIFUSDT', 'BONKUSDT', 'FLOKIUSDT'
];

const CNN_TOKEN_ADDR = "BqbmcaxY8LgNaF4zyynEazLaHHDjZW8wpTtxbMf7BAGS";

export interface TickerData {
  symbol: string;
  price: string;
  changePercent: string;
}

export function useLivePrices() {
  const [prices, setPrices] = useState<Record<string, TickerData>>({});

  useEffect(() => {
    // Initial static values
    const initialPrices: Record<string, TickerData> = TARGET_SYMBOLS.reduce((acc, sym) => {
      acc[sym] = { symbol: sym.replace('USDT', ''), price: '...', changePercent: '...' };
      return acc;
    }, {} as Record<string, TickerData>);
    setPrices(initialPrices);

    // Fetch DexScreener data for CNN and PUMP
    const fetchDexData = async () => {
      try {
        const addresses = [CNN_TOKEN_ADDR, "pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn"];
        const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${addresses.join(',')}`);
        const data = await res.json();
        
        if (data && data.pairs) {
          data.pairs.forEach((pair: any) => {
            const isCNN = pair.baseToken.address === CNN_TOKEN_ADDR;
            const priceStr = parseFloat(pair.priceUsd).toLocaleString(undefined, {
              minimumFractionDigits: isCNN ? 8 : 5,
              maximumFractionDigits: isCNN ? 8 : 5
            });
            const change = pair.priceChange?.h24 || 0;
            const sym = isCNN ? 'CNNUSDT' : 'PUMPUSDT';
            
            setPrices(prev => ({
              ...prev,
              [sym]: {
                symbol: isCNN ? 'CNN' : 'PUMP',
                price: `$${priceStr}`,
                changePercent: `${change > 0 ? '+' : ''}${change.toFixed(2)}%`
              }
            }));
          });
        }
      } catch (e) {
        console.error("DexScreener fetch error", e);
      }
    };
    
    fetchDexData();
    const dexInterval = setInterval(fetchDexData, 30000);

    const binanceSymbols = TARGET_SYMBOLS.filter(sym => sym !== 'PUMPUSDT' && sym !== 'CNNUSDT');
    // Create a single websocket connection to Binance for multiplexed streams
    const streamNames = binanceSymbols.map(sym => `${sym.toLowerCase()}@ticker`).join('/');
    const wsUrl = `wss://stream.binance.com:9443/ws/${streamNames}`;
    let socket: WebSocket;

    let retryTimeout: NodeJS.Timeout;

    const connect = () => {
      socket = new WebSocket(wsUrl);

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data && data.s && data.c && data.P) {
            const sym = data.s;
            const isMeme = sym.includes('PEPE') || sym.includes('SHIB') || sym.includes('BONK') || sym.includes('FLOKI');
            const price = parseFloat(data.c).toLocaleString(undefined, { 
                minimumFractionDigits: isMeme ? 6 : 2, 
                maximumFractionDigits: isMeme ? 8 : 2 
            });
            const changePercent = parseFloat(data.P).toFixed(2);

            setPrices(prev => ({
              ...prev,
              [sym]: {
                symbol: sym.replace('USDT', ''),
                price: `$${price}`,
                changePercent: `${parseFloat(changePercent) > 0 ? '+' : ''}${changePercent}%`
              }
            }));
          }
        } catch (e) {
          console.error("Error parsing ticker data", e);
        }
      };

      socket.onclose = () => {
        // Reconnect after 5 seconds if disconnected
        retryTimeout = setTimeout(() => {
            connect();
        }, 5000);
      };
    };

    connect();

    return () => {
      clearInterval(dexInterval);
      clearTimeout(retryTimeout);
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  return prices;
}

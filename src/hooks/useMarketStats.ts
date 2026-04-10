import { useState, useEffect } from 'react';

export function useMarketStats() {
  const [fearGreed, setFearGreed] = useState<{ value: number; classification: string }>({ value: 50, classification: 'Neutral' });
  const [altcoinIndex, setAltcoinIndex] = useState(32);
  const [prices, setPrices] = useState<Record<string, any>>({});

  // Market Sentiment (Fear & Greed Index)
  useEffect(() => {
    const fetchFNG = async () => {
      try {
        const res = await fetch('https://api.alternative.me/fng/');
        const data = await res.json();
        if (data.data && data.data[0]) {
          setFearGreed({
            value: parseInt(data.data[0].value),
            classification: data.data[0].value_classification
          });
        }
      } catch (e) {}
    };

    fetchFNG();
    // Refresh FNG every 15 minutes
    const fngInterval = setInterval(fetchFNG, 900000);
    return () => clearInterval(fngInterval);
  }, []);

  return { fearGreed, altcoinIndex };
}

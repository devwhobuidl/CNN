export interface NewsContent {
  headline: string;
  script: string;
  imageUrl: string;
}

export async function fetchCryptoNews(): Promise<NewsContent[]> {
  try {
    const response = await fetch('/api/news', { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("Internal News API failed");
    
    const news = await response.json();
    
    if (news && news.length > 0) {
      return news;
    }
    
    throw new Error("News API returned empty set");
    
  } catch (err) {
    console.error("News Engine fallback:", err);
    
    return [
      {
        headline: "Bitcoin Bulls Defend 70k Support Level",
        script: "Institutional interest continues to provide a strong floor for price action.",
        imageUrl: "https://resources.cryptocompare.com/news/82/default.png"
      }
    ];
  }
}

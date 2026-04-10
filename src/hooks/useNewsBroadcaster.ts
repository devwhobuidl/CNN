import { useState, useEffect, useRef } from 'react';
import { fetchCryptoNews, NewsContent } from '../services/newsService';

export function useNewsBroadcaster(autoStart: boolean = false) {
  const [news, setNews] = useState<NewsContent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initial news fetch
  useEffect(() => {
    const loadInitialNews = async () => {
      const data = await fetchCryptoNews();
      setNews(data);
    };
    loadInitialNews();
  }, []);

  const syncNews = async () => {
    setIsSyncing(true);
    try {
      // Trigger RSS sync on the backend first
      await fetch('/api/sync-news');
      // Then fetch the latest set from the DB
      const data = await fetchCryptoNews();
      setNews(data);
    } catch (e) {
      console.error("Sync failed", e);
    } finally {
      setIsSyncing(false);
    }
  };

  const speak = async (text: string) => {
    if (!text) return;
    
    setIsSpeaking(true);
    setSubtitle(text);

    try {
      const ttsUrl = `/api/tts?text=${encodeURIComponent(text)}`;
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(ttsUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsSpeaking(false);
        setSubtitle("");
        // Move to next after a delay
        setTimeout(() => {
          if (isBroadcasting) {
            setCurrentIndex(prev => (prev + 1) % news.length);
          }
        }, 1500);
      };

      await audio.play();
    } catch (err) {
      console.error("TTS Playback Error:", err);
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    if (isBroadcasting && news.length > 0 && !isSpeaking) {
      speak(news[currentIndex].script);
    }
  }, [isBroadcasting, currentIndex, news]);

  return {
    currentArticle: news[currentIndex] || null,
    isBroadcasting,
    isSpeaking,
    subtitle,
    isSyncing,
    startBroadcast: () => setIsBroadcasting(true),
    stopBroadcast: () => {
      setIsBroadcasting(false);
      if (audioRef.current) audioRef.current.pause();
      setIsSpeaking(false);
    },
    syncNews
  };
}

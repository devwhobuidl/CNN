import { createClient } from '@supabase/supabase-js';
import Parser from 'rss-parser';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://emjsikfdjzsoszwmqmil.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_hTnm1hw7-ERk1ApJ-qojmw_CnmrB89Y';
const supabase = createClient(supabaseUrl, supabaseKey);

const parser = new Parser();

const RSS_FEEDS = [
  "https://cointelegraph.com/rss",
  "https://cryptoslate.com/feed/",
  "https://decrypt.co/feed",
  "https://news.bitcoin.com/feed/",
  "https://bitcoinmagazine.com/feed",
  "https://cryptopotato.com/feed/",
  "https://www.coindesk.com/arc/outboundfeeds/rss/",
  "https://cryptonews.com/news/feed/",
  "https://blockworks.co/feed/",
  "https://dailyhodl.com/feed/"
];

const EXCLUDED_KEYWORDS = ['U.S. Treasury', 'IMF PIP', 'FEDS Note', 'Economic Uncertainty'];

function sanitizeText(text) {
  if (!text) return "";
  let clean = text.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
  const sentences = clean.match(/[^.!?]+[.!?]+/g) || [clean];
  return sentences.slice(0, 2).join(' ').trim();
}

export default async function handler(req, res) {
  console.log("Sync Engine: Starting RSS aggregation...");
  
  const results = [];
  
  for (const url of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(url);
      feed.items.forEach(item => {
        const isMacroBoring = EXCLUDED_KEYWORDS.some(kw => item.title.includes(kw));
        
        if (item.title && !isMacroBoring) {
          results.push({
            headline: item.title,
            script: sanitizeText(item.contentSnippet || item.content || item.title),
            image_url: item.enclosure?.url || null,
            source: feed.title || 'RSS'
          });
        }
      });
    } catch (e) {
      console.warn(`Failed to fetch ${url}:`, e.message);
    }
  }

  // Deduplicate and Upsert to Supabase
  if (results.length > 0) {
    const { error } = await supabase
      .from('news_articles')
      .upsert(results, { onConflict: 'headline' });

    if (error) {
       return res.status(500).json({ error: error.message });
    }
  }

  res.status(200).json({ 
    success: true, 
    added: results.length,
    timestamp: new Date().toISOString() 
  });
}

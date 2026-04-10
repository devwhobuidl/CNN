import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://emjsikfdjzsoszwmqmil.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_hTnm1hw7-ERk1ApJ-qojmw_CnmrB89Y';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select('headline, script, image_url')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    // Map back to the frontend format
    const news = data.map(article => ({
      headline: article.headline,
      script: article.script,
      imageUrl: article.image_url || "https://resources.cryptocompare.com/news/82/default.png"
    }));

    res.status(200).json(news);
  } catch (error) {
    console.error('Fetch News Error:', error);
    res.status(500).json({ error: error.message });
  }
}

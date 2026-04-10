import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { createClient } from '@supabase/supabase-js';
import Parser from 'rss-parser';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');

  const ttsProxyPlugin = () => ({
    name: 'tts-proxy',
    configureServer(server: any) {
      // 1. TTS Proxy
      server.middlewares.use('/api/tts', async (req: any, res: any) => {
        try {
          const url = new URL(req.url || '', `http://${req.headers.host}`);
          const text = url.searchParams.get('text');
          const apiKey = env.GOOGLE_CLOUD_API_KEY;

          if (!text) {
            res.statusCode = 400;
            return res.end('Missing text');
          }

          if (!apiKey) {
            res.statusCode = 500;
            return res.end('Missing GOOGLE_CLOUD_API_KEY');
          }

          const ttsUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
          const payload = {
            input: { text },
            voice: { languageCode: 'en-US', name: 'en-US-Neural2-D' },
            audioConfig: { audioEncoding: 'MP3' },
          };

          const ttsRes = await fetch(ttsUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          
          if (!ttsRes.ok) throw new Error(`Google TTS failed ${ttsRes.status}`);
          
          const data: any = await ttsRes.json();
          const audioBuffer = Buffer.from(data.audioContent, 'base64');

          res.setHeader('Content-Type', 'audio/mp3');
          res.end(audioBuffer);
        } catch (e: any) {
          res.statusCode = 500;
          res.end(e.message);
        }
      });

      // 2. News API (Mirroring api/news.js)
      server.middlewares.use('/api/news', async (req: any, res: any) => {
        if (req.method !== 'GET') return res.end();
        try {
          const supabaseUrl = env.VITE_SUPABASE_URL || 'https://emjsikfdjzsoszwmqmil.supabase.co';
          const supabaseKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_hTnm1hw7-ERk1ApJ-qojmw_CnmrB89Y';
          const supabase = createClient(supabaseUrl, supabaseKey);

          const { data, error } = await supabase
            .from('news_articles')
            .select('headline, script, image_url')
            .order('created_at', { ascending: false })
            .limit(100);

          if (error) throw error;

          const news = data.map((article: any) => ({
            headline: article.headline,
            script: article.script,
            imageUrl: article.image_url || "https://resources.cryptocompare.com/news/82/default.png"
          }));

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(news));
        } catch (error: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
        }
      });

      // 3. Sync News API (Mirroring api/sync-news.js)
      server.middlewares.use('/api/sync-news', async (req: any, res: any) => {
        try {
          const supabaseUrl = env.VITE_SUPABASE_URL || 'https://emjsikfdjzsoszwmqmil.supabase.co';
          const supabaseKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_hTnm1hw7-ERk1ApJ-qojmw_CnmrB89Y';
          const supabase = createClient(supabaseUrl, supabaseKey);
          const parser = new Parser();

          const RSS_FEEDS = [
            "https://cointelegraph.com/rss",
            "https://cryptoslate.com/feed/",
            "https://decrypt.co/feed"
          ];

          const results: any[] = [];
          for (const url of RSS_FEEDS) {
            try {
              const feed = await parser.parseURL(url);
              feed.items.forEach(item => {
                if (item.title) {
                  results.push({
                    headline: item.title,
                    script: item.contentSnippet || item.content || item.title,
                    image_url: (item as any).enclosure?.url || null,
                    source: feed.title || 'RSS'
                  });
                }
              });
            } catch (e) {}
          }

          if (results.length > 0) {
            await supabase.from('news_articles').upsert(results, { onConflict: 'headline' });
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, count: results.length }));
        } catch (error: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    }
  });

  return {
    plugins: [react(), tailwindcss(), ttsProxyPlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'node-fetch': path.resolve(__dirname, 'src/fetch-shim.ts'),
        'formdata-polyfill': path.resolve(__dirname, 'src/formdata-shim.ts'),
        'isomorphic-fetch': path.resolve(__dirname, 'src/fetch-shim.ts'),
        'cross-fetch': path.resolve(__dirname, 'src/fetch-shim.ts'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

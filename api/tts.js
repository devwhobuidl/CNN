export default async function handler(req, res) {
  try {
    const text = req.query.text;
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;

    if (!text) return res.status(400).send('Missing text');
    if (!apiKey) return res.status(500).send('Missing GOOGLE_CLOUD_API_KEY');

    const ttsUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
    const payload = {
      input: { text },
      voice: { 
        languageCode: 'en-US', 
        name: 'en-US-Neural2-D', // More stable, high quality
        ssmlGender: 'FEMALE'
      },
      audioConfig: { 
        audioEncoding: 'MP3',
        speakingRate: 1.18, // Faster news pace
        pitch: 1.5,        // More energetic tone
        volumeGainDb: 3.0   // Stronger presence
      },
    };

    const ttsRes = await fetch(ttsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!ttsRes.ok) {
        const errorData = await ttsRes.json();
        throw new Error(`Google TTS Provider failed: ${JSON.stringify(errorData)}`);
    }
    
    const data = await ttsRes.json();
    const audioBuffer = Buffer.from(data.audioContent, 'base64');
    
    res.setHeader('Content-Type', 'audio/mp3');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    
    return res.status(200).send(audioBuffer);
    
  } catch (error) {
    console.error("Vercel TTS Proxy Error: ", error);
    return res.status(500).send(error.message || "Internal Server Error");
  }
}

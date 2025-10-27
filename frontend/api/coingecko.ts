import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Serverless proxy endpoint for CoinGecko.
 * Used only in production to bypass browser CORS restrictions.
 * No API key needed for the free endpoint, but can add later
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { ids } = req.query;
    if (!ids) {
      res.status(400).json({ error: 'Missing ?ids=' });
      return;
    }

    const params = new URLSearchParams({
      ids: Array.isArray(ids) ? ids.join(',') : (ids as string),
      vs_currencies: 'usd',
    });

    // Optional: if you later add a secret in Vercel (COINGECKO_API_KEY)
    const headers: Record<string, string> = {};
    if (process.env.COINGECKO_API_KEY) {
      headers['x-cg-pro-api-key'] = process.env.COINGECKO_API_KEY;
    }

    const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?${params}`, { headers });
    const data = await r.json();

    res.status(r.ok ? 200 : r.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Failed to fetch from CoinGecko' });
  }
}

const COINGECKO_BASE = "https://api.coingecko.com/api/v3/simple/price";

export async function fetchCoinGeckoPrices(
  ids: string[],
  apiKey?: string // incorporate api key with vercel proxy - it's working for now without a key so wait until vercel host
): Promise<Record<string, number>> {

  if (ids.length === 0) return {};
  const params = new URLSearchParams({
    ids: ids.join(","),
    vs_currencies: "usd",
  });

  const headers: Record<string, string> = {};
  if (apiKey) {
    headers["x-cg-pro-api-key"] = apiKey;
  }

  const url = `${COINGECKO_BASE}?${params.toString()}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`CoinGecko API error ${res.status}`);
  }

  const data = await res.json();
  // Returns: { ethereum: { usd: 3200 }, aave: { usd: 100 }, ... }

  const flat: Record<string, number> = {};

  for (const id of Object.keys(data)) {
    flat[id] = data[id]?.usd ?? null;
  }

  return flat;
}
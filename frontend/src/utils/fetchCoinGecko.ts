const COINGECKO_BASE = "https://api.coingecko.com/api/v3/simple/price";

//In dev: calls CoinGecko directly.
//In prod (Vercel): routes through /api/coingecko to bypass CORS and hide any API key. 
export async function fetchCoinGeckoPrices(
  ids: string[]
): Promise<Record<string, number | null>> {
  if (ids.length === 0) return {};

  const params = new URLSearchParams({
    ids: ids.join(","),
    vs_currencies: "usd",
  });

  // Detect environment: Vite sets import.meta.env.PROD = true in build
  const baseUrl = import.meta.env.PROD
    ? "/api/coingecko"
    : COINGECKO_BASE;

  try {
    const res = await fetch(`${baseUrl}?${params.toString()}`);
    if (!res.ok) throw new Error(`CoinGecko API error ${res.status}`);

    const data = await res.json();
    const flat: Record<string, number | null> = {};

    for (const id of Object.keys(data)) {
      flat[id] = data[id]?.usd ?? null;
    }

    return flat;
  } catch (err) {
    console.error("CoinGecko fetch failed:", err);
    return {};
  }
}

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fetchCoinGeckoPrices } from "../utils/fetchCoinGecko";
import { COINGECKO_TOKENS } from "../constants/tokens";

type TokenDisplay = {
  symbol: string;
  name: string;
  id: string;
  price?: number | null;
  change24h?: number;
  volume24h?: number;
};

type PriceContextType = {
  tokens: TokenDisplay[];
  loading: boolean;
  refresh: () => void;
  lastUpdated: Date | null;
};

export const PriceContext = createContext<PriceContextType | undefined>(undefined);

const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<TokenDisplay[]>(COINGECKO_TOKENS);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const prices = await fetchCoinGeckoPrices(
        COINGECKO_TOKENS.map(t => t.id),
        import.meta.env.VITE_COINGECKO_API_KEY
      );
      const updated = COINGECKO_TOKENS.map((t) => ({
        ...t,
        price: prices[t.id],
        change24h: (Math.random() - 0.5) * 6,
        volume24h: Math.floor(1_000_000 + Math.random() * 9_000_000),
      }));
      setTokens(updated);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("CoinGecko fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    // eslint-disable-next-line
  }, []);

  return (
    <PriceContext.Provider value={{ tokens, loading, refresh: fetchPrices, lastUpdated }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePriceData = () => {
  const ctx = useContext(PriceContext);
  if (!ctx) throw new Error("usePriceData must be used within a PriceProvider");
  return ctx;
};

export default PriceProvider;
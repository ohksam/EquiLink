import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fetchCoinGeckoPrices } from "../utils/fetchCoinGecko";
import { COINGECKO_TOKENS } from "../constants/tokens";
import { useChainlinkPrices } from "../hooks/useChainlinkPrices";

// --- Types ---
type TokenDisplay = {
  symbol: string;
  name: string;
  id: string;
  price?: number | null;
  change24h?: number;
  volume24h?: number;
};

type ChainlinkPrices = {
  ETH?: number;
  BTC?: number;
  LINK?: number;
};

type PriceContextType = {
  tokens: TokenDisplay[];
  chainlink: ChainlinkPrices;
  loading: boolean;
  refresh: () => void;
  lastUpdated: Date | null;
};

// --- Context ---
export const PriceContext = createContext<PriceContextType | undefined>(undefined);

const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<TokenDisplay[]>(COINGECKO_TOKENS);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const { prices: chainlinkPrices, loading: chainlinkLoading } = useChainlinkPrices();

  // --- Fetch CoinGecko prices (mainnet data) ---
  const fetchPrices = async () => {
    setLoading(true);
    try {
      const prices = await fetchCoinGeckoPrices(COINGECKO_TOKENS.map((t) => t.id));

      const updated = COINGECKO_TOKENS.map((t) => ({
        ...t,
        price: prices[t.id] ?? null,
        change24h: (Math.random() - 0.5) * 6, // placeholder % change
        volume24h: Math.floor(1_000_000 + Math.random() * 9_000_000), // placeholder volume
      }));

      setTokens(updated);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("CoinGecko fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch on mount ---
  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <PriceContext.Provider
      value={{
        tokens,
        chainlink: chainlinkPrices ?? {},
        loading: loading || chainlinkLoading,
        refresh: fetchPrices,
        lastUpdated,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};

// --- Hook ---
export const usePriceData = () => {
  const ctx = useContext(PriceContext);
  if (!ctx) throw new Error("usePriceData must be used within a PriceProvider");
  return ctx;
};

export default PriceProvider;

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fetchCoinGeckoPrices } from "../utils/fetchCoinGecko";
import { COINGECKO_TOKENS } from "../constants/tokens";
import { useChainlinkPrices } from "../hooks/useChainlinkPrices";

// Mainnet prices from CoinGecko
type TokenDisplay = {
  symbol: string;
  name: string;
  id: string;
  price?: number | null;
  change24h?: number;
  volume24h?: number;
};

// Chainlink prices for simulation, pricecards, and converter/calculator
type ChainlinkPrices = {
  ETH?: number;
  BTC?: number;
  LINK?: number;
};

type PriceContextType = {
  tokens: TokenDisplay[];           // CoinGecko mainnet prices
  chainlink: ChainlinkPrices;       // Chainlink Sepolia prices
  loading: boolean;
  refresh: () => void;
  lastUpdated: Date | null;
};

export const PriceContext = createContext<PriceContextType | undefined>(undefined);

const PriceProvider = ({ children }: { children: ReactNode }) => {
  // --- Mainnet price state (CoinGecko) ---
  const [tokens, setTokens] = useState<TokenDisplay[]>(COINGECKO_TOKENS);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // --- Chainlink (testnet) price state ---
  const { prices: liveChainlinkPrices } = useChainlinkPrices();
  const [chainlink, setChainlink] = useState<ChainlinkPrices>({});

  // Store Chainlink feed values in stable state
  useEffect(() => {
    setChainlink(liveChainlinkPrices);
  }, [liveChainlinkPrices]);

  // --- Fetch live mainnet prices from CoinGecko ---
  const fetchPrices = async () => {
    setLoading(true);
    try {
      const prices = await fetchCoinGeckoPrices(
        COINGECKO_TOKENS.map((t) => t.id),
        import.meta.env.VITE_COINGECKO_API_KEY
      );

      const updated = COINGECKO_TOKENS.map((t) => ({
        ...t,
        price: prices[t.id],
        change24h: (Math.random() - 0.5) * 6, // random % swing for demo purposes
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

  // Fetch initial prices on mount
  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <PriceContext.Provider
      value={{
        tokens,
        chainlink,
        loading,
        refresh: fetchPrices,
        lastUpdated,
      }}
    >
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

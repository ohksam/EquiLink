import { useMemo } from "react";
import { useReadContract } from "wagmi";
import { aggregatorV3InterfaceABI } from "../constants/chainlinkAbi";

const FEEDS = {
  ETH: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  BTC: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
  LINK: "0xc59E3633BAAC79493d908e63626716e204A45EdF",
} as const;

const CHAIN_ID = 11155111;

// Helper to safely parse feed response
function parseRoundData(result: unknown): number | undefined {
  if (!Array.isArray(result) || result.length < 2) return undefined;
  const answer = Number(result[1]);
  return Number.isFinite(answer) ? answer / 1e8 : undefined;
}


// Reads Chainlink Sepolia price feeds for ETH/BTC/LINK.
// Returns latest prices + loading/error flags.

export function useChainlinkPrices() {
  const eth = useReadContract({
    address: FEEDS.ETH,
    abi: aggregatorV3InterfaceABI,
    functionName: "latestRoundData",
    chainId: CHAIN_ID,
  });

  const btc = useReadContract({
    address: FEEDS.BTC,
    abi: aggregatorV3InterfaceABI,
    functionName: "latestRoundData",
    chainId: CHAIN_ID,
  });

  const link = useReadContract({
    address: FEEDS.LINK,
    abi: aggregatorV3InterfaceABI,
    functionName: "latestRoundData",
    chainId: CHAIN_ID,
  });

  return useMemo(() => {
    const prices = {
      ETH: parseRoundData(eth.data),
      BTC: parseRoundData(btc.data),
      LINK: parseRoundData(link.data),
    };

    // unified state
    const loading = eth.isLoading || btc.isLoading || link.isLoading;
    const error = eth.error || btc.error || link.error;

    return { prices, loading, error };
  }, [
    eth.data,
    btc.data,
    link.data,
    eth.isLoading,
    btc.isLoading,
    link.isLoading,
    eth.error,
    btc.error,
    link.error,
  ]);
}

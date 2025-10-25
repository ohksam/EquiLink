import { useReadContract } from "wagmi";
import { aggregatorV3InterfaceABI } from "../constants/chainlinkAbi";

// sepolia feeds
const FEEDS = {
  ETH: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  BTC: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
  LINK: "0xc59E3633BAAC79493d908e63626716e204A45EdF",
} as const;

const CHAIN_ID = 11155111;

export function useChainlinkPrices() {
  // Single read per feed (could use multicall if you want later)
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

  // Parse results (8 decimals for price)
  const parsePrice = (data: any) =>
    data && data.result && data.result.answer
      ? Number(data.result.answer) / 1e8
      : undefined;

  return {
    prices: {
      ETH: parsePrice(eth),
      BTC: parsePrice(btc),
      LINK: parsePrice(link),
    },
    loading: eth.isLoading || btc.isLoading || link.isLoading,
    error: eth.error || btc.error || link.error,
  };
}

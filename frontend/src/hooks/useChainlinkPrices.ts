import { useReadContract } from "wagmi";
import { aggregatorV3InterfaceABI } from "../constants/chainlinkAbi";

const FEEDS = {
  ETH: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  BTC: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
  LINK: "0xc59E3633BAAC79493d908e63626716e204A45EdF",
} as const;

const CHAIN_ID = 11155111;

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

  // debugging
//   console.log("ETH:", eth.data, "BTC:", btc.data, "LINK:", link.data);

  const parsePrice = (result: any) =>
    result && result[1] !== undefined
      ? Number(result[1]) / 1e8
      : undefined;

  return {
    prices: {
      ETH: parsePrice(eth.data),
      BTC: parsePrice(btc.data),
      LINK: parsePrice(link.data),
    },
    loading: eth.isLoading || btc.isLoading || link.isLoading,
    error: eth.error || btc.error || link.error,
  };
}

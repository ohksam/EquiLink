import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";

// removed localhost for Vercel deploy**
// fork a new branch with localhost for local dev
export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/wZUBHLEtUEivYCl4U9nA0"),
  },
});

import { createConfig, http } from "wagmi";
import { sepolia, localhost } from "wagmi/chains";


export const config = createConfig({
    chains: [localhost, sepolia],
    transports: {
        [localhost.id]: http(),
        [sepolia.id]: http()
    },
})
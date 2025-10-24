import { useState, useEffect } from "react";

type Token = {
    symbol: string;
    name: string;
    price?: number;
    change24h?: number;
    volume24h?: number;
};

const initialTokens: Token[] = [
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "LINK", name: "Chainlink" },
    { symbol: "UNI", name: "Uniswap" },
    { symbol: "MATIC", name: "Polygon" },
    { symbol: "AAVE", name: "Aave" },
    { symbol: "USDC", name: "USD Coin" },
    { symbol: "DAI", name: "Dai" },
];

const Dashboard = () => {
    const [tokens, setTokens] = useState<Token[]>(initialTokens);
    const [network, setNetwork] = useState<"sepolia" | "ethereum">("sepolia");
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    // 🔄 placeholder fetch simulation
    const fetchPrices = async () => {
        setLoading(true);
        // simulate API delay
        await new Promise((res) => setTimeout(res, 1000));

        const randomize = (base: number) => base * (0.95 + Math.random() * 0.1);

        const updated = tokens.map((t) => ({
            ...t,
            price:
                t.symbol === "ETH"
                    ? randomize(3400)
                    : t.symbol === "BTC"
                        ? randomize(68000)
                        : t.symbol === "LINK"
                            ? randomize(18)
                            : t.symbol === "UNI"
                                ? randomize(7)
                                : t.symbol === "MATIC"
                                    ? randomize(0.9)
                                    : t.symbol === "AAVE"
                                        ? randomize(105)
                                        : t.symbol === "USDC" || t.symbol === "DAI"
                                            ? 1.0
                                            : undefined,
            change24h: (Math.random() - 0.5) * 6, // ±3%
            volume24h: Math.floor(1000000 + Math.random() * 9000000),
        }));

        setTokens(updated);
        setLastUpdated(new Date());
        setLoading(false);
    };

    useEffect(() => {
        fetchPrices();
    }, [network]);

    const formatTime = (date: Date) =>
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
        <div className="flex flex-col gap-6 w-full px-8 py-6 max-w-7xl mx-auto">
            {/* Header + controls */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800">Market Dashboard</h2>

                <div className="flex gap-3">
                    <button
                        onClick={() => setNetwork(network === "sepolia" ? "ethereum" : "sepolia")}
                        className="bg-cyan-500 text-white px-4 py-2 rounded-lg shadow hover:bg-cyan-600 transition"
                    >
                        {network === "sepolia" ? "Switch to Mainnet" : "Switch to Testnet"}
                    </button>

                    <button
                        onClick={fetchPrices}
                        disabled={loading}
                        className={`px-4 py-2 rounded-lg font-medium shadow ${loading
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                            }`}
                    >
                        {loading ? "Refreshing..." : "Refresh Prices"}
                    </button>
                </div>
            </div>

            <p className="text-gray-600">
                Live price data from{" "}
                <strong>Uniswap {network === "sepolia" ? "Sepolia Testnet" : "Mainnet"}</strong>.
            </p>

            {lastUpdated && (
                <p className="text-sm text-gray-500">
                    Last updated: {formatTime(lastUpdated)}
                </p>
            )}

            {/* Token grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tokens.map((token) => (
                    <div
                        key={token.symbol}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >
                        {loading ? (
                            // shimmer skeleton
                            <div className="animate-pulse space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {token.name}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        {token.symbol}
                                    </span>
                                </div>

                                <div className="mt-2">
                                    <p className="text-2xl font-semibold text-cyan-700">
                                        {token.price ? `$${token.price.toLocaleString()}` : "—"}
                                    </p>

                                    <p
                                        className={`text-sm ${token.change24h && token.change24h >= 0
                                                ? "text-green-600"
                                                : "text-red-500"
                                            }`}
                                    >
                                        {token.change24h
                                            ? `${token.change24h > 0 ? "+" : ""}${token.change24h.toFixed(2)}%`
                                            : "24h: —"}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Vol:{" "}
                                        {token.volume24h
                                            ? `$${token.volume24h.toLocaleString()}`
                                            : "—"}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

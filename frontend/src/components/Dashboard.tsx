import { usePriceData } from "../context/PriceContext";

const Dashboard = () => {
    const { tokens, loading, refresh, lastUpdated } = usePriceData();

    const formatTime = (date: Date) =>
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
        <div className="flex flex-col gap-6 w-full px-8 py-6 max-w-7xl mx-auto">
            {/* Header + controls */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800">Market Dashboard</h2>
                <button
                    onClick={refresh}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg font-medium shadow ${
                        loading
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                >
                    {loading ? "Refreshing..." : "Refresh Prices"}
                </button>
            </div>

            <p className="text-gray-600">
                Live price data from{" "}
                <strong>
                    CoinGecko
                </strong>. <br />
                <span className="text-xs">
                    Price data provided by{" "}
                    <a
                        href="https://www.coingecko.com/en/api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        CoinGecko
                    </a>
                    .
                </span>
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
                                    <span className="text-sm text-gray-500">{token.symbol}</span>
                                </div>
                                <div className="mt-2">
                                    <p className="text-2xl font-semibold text-cyan-700">
                                        {token.price !== undefined && token.price !== null
                                            ? `$${token.price.toLocaleString()}`
                                            : "—"}
                                    </p>
                                    <p
                                        className={`text-sm ${
                                            token.change24h && token.change24h >= 0
                                                ? "text-green-600"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {token.change24h !== undefined
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

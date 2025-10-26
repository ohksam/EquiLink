import { useState } from "react";
import { usePriceData } from "../context/PriceContext";
import type { ChangeEvent } from "react";

const assetOptions = [
    { label: "ETH", value: "ETH" },
    { label: "BTC", value: "BTC" },
    { label: "LINK", value: "LINK" },
];

const toFixedCrypto = (value: number) => value.toFixed(4);
const toFixedUSD = (value: number) => value.toFixed(2);

const SidebarConverter = () => {
    const { tokens, loading } = usePriceData();
    const [selected, setSelected] = useState<"ETH" | "BTC" | "LINK">("ETH");
    const [usd, setUsd] = useState("");
    const [crypto, setCrypto] = useState("");
    const [lastEdited, setLastEdited] = useState<"usd" | "crypto">("usd");

    const { chainlink } = usePriceData();
    const price = chainlink[selected];


    const handleUsdChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setUsd(val);
        setLastEdited("usd");
        const n = Number(val);
        if (price && !isNaN(n)) {
            setCrypto(n === 0 ? "" : toFixedCrypto(n / price));
        } else {
            setCrypto("");
        }
    };

    const handleCryptoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCrypto(val);
        setLastEdited("crypto");
        const n = Number(val);
        if (price && !isNaN(n)) {
            setUsd(n === 0 ? "" : toFixedUSD(n * price));
        } else {
            setUsd("");
        }
    };

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const next = e.target.value as "ETH" | "BTC" | "LINK";
        setSelected(next);
        const newToken = tokens.find(t => t.symbol === next);
        const newPrice = typeof newToken?.price === "number" ? newToken.price : undefined;

        if (!newPrice) {
            setUsd("");
            setCrypto("");
            return;
        }

        if (lastEdited === "usd") {
            const n = Number(usd);
            setCrypto(!isNaN(n) && n !== 0 ? toFixedCrypto(n / newPrice) : "");
        } else {
            const n = Number(crypto);
            setUsd(!isNaN(n) && n !== 0 ? toFixedUSD(n * newPrice) : "");
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-[230px] p-3 mb-2 rounded-xl bg-white shadow border border-teal-100">
            <div className="font-semibold mb-2 text-teal-800 text-center">Quick USD Converter</div>
            {loading || !price ? (
                <div className="text-xs text-gray-400">Loading prices...</div>
            ) : (
                <div className="flex flex-col gap-2 w-full items-center">
                    {/* USD input */}
                    <div className="flex flex-col w-full">
                        <label className="text-xs font-medium text-gray-600 mb-1" htmlFor="usd-input">USD</label>
                        <input
                            type="text"
                            inputMode="decimal"
                            id="usd-input"
                            value={usd}
                            onChange={handleUsdChange}
                            className="px-2 py-1 border rounded text-sm text-gray-700 focus:outline-teal-400 w-full text-right"
                            placeholder="0.00"
                        />
                    </div>
                    {/* Vertical swap arrow */}
                    <span className="text-2xl text-gray-300 my-0.5">⇅</span>
                    {/* Crypto select + input */}
                    <div className="flex flex-col w-full">
                        <label className="text-xs font-medium text-gray-600 mb-1" htmlFor="crypto-input">Crypto</label>
                        <div className="flex gap-2 w-full">
                            <select
                                value={selected}
                                onChange={handleSelect}
                                className="px-1 py-1 border rounded text-sm font-medium bg-white"
                            >
                                {assetOptions.map((a) => (
                                    <option key={a.value} value={a.value}>{a.label}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                inputMode="decimal"
                                id="crypto-input"
                                value={crypto}
                                onChange={handleCryptoChange}
                                className="px-2 py-1 border rounded text-sm text-gray-700 focus:outline-teal-400 w-full text-right"
                                placeholder="0.0000"
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="text-xs text-gray-500 mt-2 text-center">
                Prices update every refresh.
            </div>
        </div>
    );
};

export default SidebarConverter;

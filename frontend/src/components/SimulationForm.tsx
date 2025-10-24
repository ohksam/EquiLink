import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import ResultsCard from "./ResultsCard";
import type { SimulationResult } from "./ResultsCard";

type Asset = "eth" | "btc" | "link";

type Portfolio = {
    eth: string;
    btc: string;
    link: string;
};

type Rule = {
    entryPrice: string;
    thresholdPercentDrop: string;
    percentToSell: string;
};

type Rules = {
    eth: Rule;
    btc: Rule;
    link: Rule;
};

const initialPortfolio = { eth: "", btc: "", link: "" };
const initialRule = { entryPrice: "", thresholdPercentDrop: "", percentToSell: "" };
const initialRules = { eth: { ...initialRule }, btc: { ...initialRule }, link: { ...initialRule } };

const SimulationForm = () => {
    const [portfolio, setPortfolio] = useState<Portfolio>(initialPortfolio);
    const [rules, setRules] = useState<Rules>(initialRules);
    const [result, setResult] = useState<SimulationResult | null>(null);

    const handlePortfolioChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPortfolio((prev) => ({ ...prev, [name]: value }));
    };

    const handleRuleChange = (asset: Asset, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRules((prev) => ({
            ...prev,
            [asset]: { ...prev[asset], [name]: value }
        }));
    };

    const resultsRef = useRef<HTMLDivElement | null>(null);
    // Dummy simulation for now - replace with contract call
    const handleSimulate = () => {
        setResult({
            simulatedEthUsd: 1700,
            simulatedBtcUsd: 1800,
            simulatedLinkUsd: 900,
            hodlEthUsd: 1600,
            hodlBtcUsd: 1700,
            hodlLinkUsd: 900,
            hodlUsdValue: 4200,
            simulatedUsdValue: 4400,
        });

        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100); 
    };

    return (
        <div className="bg-teal-50 rounded-xl shadow p-6 mb-8 flex flex-col gap-6 w-full">
            <h2 className="text-3xl font-bold mb-1">Simulate Portfolio Rebalance</h2>
            <p className="mb-4 text-gray-600">
                Enter your balances and stop-loss rules for each asset to simulate your strategy.
            </p>
            {["eth", "btc", "link"].map((asset) => (
                <div key={asset} className="bg-white rounded-lg p-4 shadow flex flex-col gap-2 mb-2">
                    <div className="font-semibold text-lg uppercase text-teal-700 mb-1">{asset}</div>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex flex-col text-sm font-medium">
                            Balance
                            <input
                                type="number"
                                name={asset}
                                value={portfolio[asset as Asset]}
                                onChange={handlePortfolioChange}
                                placeholder={`e.g. 1.5`}
                                className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                            />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Entry Price (USD)
                            <input
                                type="number"
                                name="entryPrice"
                                value={rules[asset as Asset].entryPrice}
                                onChange={(e) => handleRuleChange(asset as Asset, e)}
                                placeholder="e.g. 2500"
                                className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                            />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            % Drop to Trigger
                            <input
                                type="number"
                                name="thresholdPercentDrop"
                                value={rules[asset as Asset].thresholdPercentDrop}
                                onChange={(e) => handleRuleChange(asset as Asset, e)}
                                placeholder="e.g. 15"
                                className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                            />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            % to Sell
                            <input
                                type="number"
                                name="percentToSell"
                                value={rules[asset as Asset].percentToSell}
                                onChange={(e) => handleRuleChange(asset as Asset, e)}
                                placeholder="e.g. 20"
                                className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                            />
                        </label>
                    </div>
                </div>
            ))}

            <button
                className="bg-cyan-500 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-cyan-600 transition"
                onClick={handleSimulate}
            >
                Simulate Rebalance
            </button>

            {result && (<div ref={resultsRef}><ResultsCard result={result} /></div>)}
        </div>
    );
};

export default SimulationForm;

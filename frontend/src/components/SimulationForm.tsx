import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { usePriceData } from "../context/PriceContext";
import { useReadContract } from "wagmi";
import ResultsCard from "./ResultsCard";
import type { SimulationResult } from "./ResultsCard";
import { EQUILINK_ADDRESS } from "../constants/contract";
import EquiLinkAbi from "../abi/EquiLink.json";

type Asset = "eth" | "btc" | "link";
type Portfolio = { eth: string; btc: string; link: string };
type Rule = { entryPrice: string; thresholdPercentDrop: string; percentToSell: string };
type Rules = { eth: Rule; btc: Rule; link: Rule };

const initialPortfolio = { eth: "", btc: "", link: "" };
const initialRule = { entryPrice: "", thresholdPercentDrop: "", percentToSell: "" };
const initialRules = { eth: { ...initialRule }, btc: { ...initialRule }, link: { ...initialRule } };

const forceDropEntry = (current: number, threshold: number) => {
    const buffer = 0.1 + Math.random();
    return (current * (1 + threshold / 100 + buffer)).toFixed(2);
};

const SimulationForm = () => {
    const [portfolio, setPortfolio] = useState<Portfolio>(initialPortfolio);
    const [rules, setRules] = useState<Rules>(initialRules);
    const [result, setResult] = useState<SimulationResult | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);
    const resultsRef = useRef<HTMLDivElement | null>(null);
    const { chainlink } = usePriceData();

    const handlePortfolioChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPortfolio((prev) => ({ ...prev, [name]: value }));
    };

    const handleRuleChange = (asset: Asset, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRules((prev) => ({
            ...prev,
            [asset]: { ...prev[asset], [name]: value },
        }));
    };

    const handleDemo = () => {
        setPortfolio({ eth: "1", btc: "1", link: "1" });
        setRules({
            eth: {
                entryPrice: chainlink.ETH ? forceDropEntry(chainlink.ETH, 20) : "4100",
                thresholdPercentDrop: "20",
                percentToSell: "50",
            },
            btc: {
                entryPrice: chainlink.BTC ? forceDropEntry(chainlink.BTC, 10) : "115000",
                thresholdPercentDrop: "10",
                percentToSell: "40",
            },
            link: {
                entryPrice: chainlink.LINK ? forceDropEntry(chainlink.LINK, 15) : "18.5",
                thresholdPercentDrop: "15",
                percentToSell: "30",
            },
        });
    };

    const portfolioStruct = {
        ethAmount: BigInt(Math.floor(Number(portfolio.eth) * 1e18) || 0),
        btcAmount: BigInt(Math.floor(Number(portfolio.btc) * 1e18) || 0),
        linkAmount: BigInt(Math.floor(Number(portfolio.link) * 1e18) || 0),
    };

    const makeRule = (r: Rule) => ({
        entryPrice: BigInt(Math.floor(Number(r.entryPrice) * 1e18) || 0),
        thresholdPercentDrop: BigInt(Number(r.thresholdPercentDrop) || 0),
        percentToSell: BigInt(Number(r.percentToSell) || 0),
    });

    const { data, error, isLoading, refetch } = useReadContract({
        address: EQUILINK_ADDRESS,
        abi: EquiLinkAbi,
        functionName: "simulateRebalance",
        args: [
            portfolioStruct,
            makeRule(rules.eth),
            makeRule(rules.btc),
            makeRule(rules.link),
        ],
        query: { enabled: false },
    });

    const handleSimulate = async () => {
        setIsSimulating(true);
        setResult(null);
        const res = await refetch();
        if (res.data) {
            const [
                newEthUsd,
                newBtcUsd,
                newLinkUsd,
                hodlEthUsd,
                hodlBtcUsd,
                hodlLinkUsd,
                hodlUsdValue,
                simulatedUsdValue,
            ] = res.data as bigint[];
            setResult({
                simulatedEthUsd: Number(newEthUsd) / 1e18,
                simulatedBtcUsd: Number(newBtcUsd) / 1e18,
                simulatedLinkUsd: Number(newLinkUsd) / 1e18,
                hodlEthUsd: Number(hodlEthUsd) / 1e18,
                hodlBtcUsd: Number(hodlBtcUsd) / 1e18,
                hodlLinkUsd: Number(hodlLinkUsd) / 1e18,
                hodlUsdValue: Number(hodlUsdValue) / 1e18,
                simulatedUsdValue: Number(simulatedUsdValue) / 1e18,
            });
            setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }
        setIsSimulating(false);
    };

    const anyFieldFilled =
        Object.values(portfolio).some((val) => val.trim() !== "") ||
        Object.values(rules).some((rule) =>
            Object.values(rule).some((val) => val.trim() !== "")
        );

    return (
        <div className="bg-teal-50 rounded-xl shadow p-6 mb-8 flex flex-col gap-6 w-full">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Simulate Portfolio Rebalance</h2>
                <button
                    onClick={handleDemo}
                    className="text-sm font-semibold text-cyan-700 border border-cyan-700 px-3 py-1 rounded-lg hover:bg-cyan-100 transition pulse-once"
                >
                    Demo
                </button>
            </div>

            <p className="mb-4 text-gray-600">
                Enter your balances and stop-loss rules for each asset to simulate your strategy,
                or click <span className="font-semibold">Demo</span> to auto-fill sample data.
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
                                placeholder="e.g. 1.5"
                                className="no-arrows mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                            />
                        </label>

                        {["entryPrice", "thresholdPercentDrop", "percentToSell"].map((field) => (
                            <label key={field} className="flex flex-col text-sm font-medium">
                                {field === "entryPrice"
                                    ? "Entry Price (USD)"
                                    : field === "thresholdPercentDrop"
                                        ? "% Drop to Trigger"
                                        : "% to Sell"}
                                <input
                                    type="number"
                                    name={field}
                                    value={rules[asset as Asset][field as keyof Rule]}
                                    onChange={(e) => handleRuleChange(asset as Asset, e)}
                                    placeholder={
                                        field === "entryPrice"
                                            ? "e.g. 2500"
                                            : field === "thresholdPercentDrop"
                                                ? "e.g. 15"
                                                : "e.g. 20"
                                    }
                                    className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                                />
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <button
                className={`bg-cyan-500 text-white font-bold px-6 py-2 rounded-xl shadow transition ${!anyFieldFilled || isSimulating ? "opacity-60 cursor-not-allowed" : "hover:bg-cyan-600"
                    }`}
                onClick={handleSimulate}
                disabled={!anyFieldFilled || isSimulating}
            >
                {isSimulating ? "Simulating..." : "Simulate Rebalance"}
            </button>

            {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}

            {result && (
                <div ref={resultsRef}>
                    <ResultsCard result={result} />
                </div>
            )}
        </div>
    );
};

export default SimulationForm;

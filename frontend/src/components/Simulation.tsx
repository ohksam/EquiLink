import { useState } from "react";
import type { ChangeEvent } from "react";
import PriceCard from "./PriceCard";

type Balances = {
  eth: string;
  btc: string;
  link: string;
};

type Result = {
  eth: number;
  btc: number;
  link: number;
};

const prices = {
  ETH: 3342.5,
  BTC: 62200.1,
  LINK: 18.05,
};

const Simulation = () => {
  const [balances, setBalances] = useState<Balances>({
    eth: "",
    btc: "",
    link: "",
  });
  const [result, setResult] = useState<Result | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setBalances((b) => ({
      ...b,
      [name]: value,
    }));
  }

  function handleSimulate() {
    setResult({
      eth: parseFloat(balances.eth) || 0,
      btc: parseFloat(balances.btc) || 0,
      link: parseFloat(balances.link) || 0,
    });
  }

  return (
    <main className="flex flex-col items-center w-full h-full px-12 py-6 gap-8">
      {/* Price Cards Row */}
      <div className="flex gap-6 mb-0">
        <PriceCard asset="ETH" price={prices.ETH} />
        <PriceCard asset="BTC" price={prices.BTC} />
        <PriceCard asset="LINK" price={prices.LINK} />
      </div>

      {/* Portfolio Section */}
      <div className="w-full max-w-xl">


        <div className="bg-teal-50 rounded-xl shadow p-6 mb-8 flex flex-col gap-4 w-full">
          <h2 className="text-3xl font-bold mb-1">Simulate Portfolio Rebalance</h2>
          <p className="mb-6 text-gray-600">
            Enter your asset balances and simulate how EquiLink would rebalance your portfolio using real Chainlink price feeds.
          </p>
          {/* Input fields */}
          <label className="flex flex-col font-medium">
            ETH Balance
            <input
              type="number"
              name="eth"
              value={balances.eth}
              onChange={handleChange}
              placeholder="e.g. 1.5"
              className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
          </label>

          <label className="flex flex-col font-medium">
            BTC Balance
            <input
              type="number"
              name="btc"
              value={balances.btc}
              onChange={handleChange}
              placeholder="e.g. 0.08"
              className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
          </label>

          <label className="flex flex-col font-medium">
            LINK Balance
            <input
              type="number"
              name="link"
              value={balances.link}
              onChange={handleChange}
              placeholder="e.g. 100"
              className="mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
          </label>

          <button
            className="bg-cyan-500 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-cyan-600 transition"
            onClick={handleSimulate}
          >
            Simulate Rebalance
          </button>
        </div>

        {result && (
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 shadow w-full">
            <h3 className="text-xl font-semibold mb-2">Simulation Result</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-600">
                  <th className="py-1">Asset</th>
                  <th className="py-1">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1">ETH</td>
                  <td className="py-1">{result.eth}</td>
                </tr>
                <tr>
                  <td className="py-1">BTC</td>
                  <td className="py-1">{result.btc}</td>
                </tr>
                <tr>
                  <td className="py-1">LINK</td>
                  <td className="py-1">{result.link}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

export default Simulation;

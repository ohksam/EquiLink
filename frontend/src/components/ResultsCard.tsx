export type SimulationResult = {
  simulatedEthUsd: number;
  simulatedBtcUsd: number;
  simulatedLinkUsd: number;
  hodlEthUsd: number;
  hodlBtcUsd: number;
  hodlLinkUsd: number;
  hodlUsdValue: number;
  simulatedUsdValue: number;
};

type Props = {
  result: SimulationResult;
};

const assetNames = [
  { key: "Eth", label: "ETH" },
  { key: "Btc", label: "BTC" },
  { key: "Link", label: "LINK" },
];

const ResultsCard = ({ result }: Props) => {
  const diffs = [
    result.simulatedEthUsd - result.hodlEthUsd,
    result.simulatedBtcUsd - result.hodlBtcUsd,
    result.simulatedLinkUsd - result.hodlLinkUsd,
  ];

  const diffTotal = result.simulatedUsdValue - result.hodlUsdValue;

  return (
    <div className="bg-white/70 border border-teal-100 rounded-lg p-6 shadow w-full mt-8 backdrop-blur-md">
      <h3 className="text-xl font-semibold mb-3">Simulation Result</h3>
      <table className="w-full text-left mb-3">
        <thead>
          <tr className="text-gray-600">
            <th>Asset</th>
            <th>HODL Value</th>
            <th>Stop-Loss Value</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          {assetNames.map((asset, i) => (
            <tr key={asset.label}>
              <td className="font-bold">{asset.label}</td>
              <td>${result[`hodl${asset.key}Usd` as keyof SimulationResult].toFixed(2)}</td>
              <td>${result[`simulated${asset.key}Usd` as keyof SimulationResult].toFixed(2)}</td>
              <td
                className={`font-semibold ${
                  diffs[i] >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {(diffs[i] >= 0 ? "+" : "") + diffs[i].toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold border-t">
            <td>Total</td>
            <td>${result.hodlUsdValue.toFixed(2)}</td>
            <td>${result.simulatedUsdValue.toFixed(2)}</td>
            <td
              className={`font-bold ${
                diffTotal >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {(diffTotal >= 0 ? "+" : "") + diffTotal.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="text-gray-500 text-sm">
        <span className="font-semibold">Note:</span> All values in USD. This simulation compares what your portfolio would be worth if you simply held (“HODL”) vs. using your stop-loss strategy.
      </div>
    </div>
  );
};

export default ResultsCard;

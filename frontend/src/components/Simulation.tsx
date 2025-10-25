import { useContext } from "react";
import { PriceContext } from "../context/PriceContext";
import PriceCard from "./PriceCard";
import SimulationForm from "./SimulationForm";

const Simulation = () => {
  const prices = useContext(PriceContext);

  // Loading state or error
  if (!prices || prices.loading) {
    return (
      <main className="flex flex-col items-center w-full h-full px-12 py-6 gap-8">
        <div className="flex gap-6 mb-0">
          <PriceCard asset="ETH" price="—" />
          <PriceCard asset="BTC" price="—" />
          <PriceCard asset="LINK" price="—" />
        </div>
        <div className="w-full max-w-xl">
          <SimulationForm />
        </div>
      </main>
    );
  }

  // Helper: get Chainlink Sepolia price for a token
  const getChainlinkPrice = (symbol: "ETH" | "BTC" | "LINK") =>
    prices.chainlink[symbol] !== undefined
      ? prices.chainlink[symbol]
      : "—";

  return (
    <main className="flex flex-col items-center w-full h-full px-12 py-6 gap-8">
      {/* Price Cards Row (using Chainlink Sepolia prices) */}
      <div className="flex gap-6 mb-0">
        <PriceCard asset="ETH" price={getChainlinkPrice("ETH")} />
        <PriceCard asset="BTC" price={getChainlinkPrice("BTC")} />
        <PriceCard asset="LINK" price={getChainlinkPrice("LINK")} />
      </div>
      {/* Simulation Form + Results */}
      <div className="w-full max-w-xl">
        <SimulationForm />
      </div>
    </main>
  );
};

export default Simulation;

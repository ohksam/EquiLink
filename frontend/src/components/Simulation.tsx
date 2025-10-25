import { useContext } from "react";
import { PriceContext } from "../context/PriceContext";
import PriceCard from "./PriceCard";
import SimulationForm from "./SimulationForm";

const Simulation = () => {
  const prices = useContext(PriceContext);

  // Show loading or error fallback if prices aren't loaded yet
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

  // Helper function to get price by asset symbol
  const getPrice = (symbol: "ETH" | "BTC" | "LINK") =>
    prices.tokens.find((t) => t.symbol === symbol)?.price ?? "—";

  return (
    <main className="flex flex-col items-center w-full h-full px-12 py-6 gap-8">
      {/* Price Cards Row */}
      <div className="flex gap-6 mb-0">
        <PriceCard asset="ETH" price={getPrice("ETH")} />
        <PriceCard asset="BTC" price={getPrice("BTC")} />
        <PriceCard asset="LINK" price={getPrice("LINK")} />
      </div>
      {/* Simulation Form + Results (all logic is inside SimulationForm) */}
      <div className="w-full max-w-xl">
        <SimulationForm />
      </div>
    </main>
  );
};

export default Simulation;

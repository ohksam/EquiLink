import PriceCard from "./PriceCard";
import SimulationForm from "./SimulationForm";

const prices = {
  ETH: 3342.5,
  BTC: 62200.1,
  LINK: 18.05,
};

const Simulation = () => (
  <main className="flex flex-col items-center w-full h-full px-12 py-6 gap-8">
    {/* Price Cards Row */}
    <div className="flex gap-6 mb-0">
      <PriceCard asset="ETH" price={prices.ETH} />
      <PriceCard asset="BTC" price={prices.BTC} />
      <PriceCard asset="LINK" price={prices.LINK} />
    </div>
    {/* Simulation Form + Results (all logic is inside SimulationForm) */}
    <div className="w-full max-w-xl">
      <SimulationForm />
    </div>
  </main>
);

export default Simulation;

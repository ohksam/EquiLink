import { Link } from "react-router";

const Home = () => (
  <main className="w-full max-w-2xl mx-auto p-8 flex flex-col gap-8">
    <section>
      <h1 className="text-3xl font-bold text-teal-800 mb-2">Welcome to EquiLink!</h1>
      <p className="text-lg text-gray-700">
        EquiLink is a portfolio project built to showcase practical Web3 skills: secure Chainlink price feed consumption, open market API integration, and clean React UI engineering.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">How to Use</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>
          Use the sidebar to navigate between <span className="font-semibold">Simulate Portfolio</span> (rebalance simulator), <span className="font-semibold">Market</span> (live prices and stats for major cryptocurrencies), <span className="font-semibold">About</span>, and this Home page.
        </li>
        <li>
          On the <span className="font-semibold">Simulate Portfolio</span> page, enter your starting portfolio and custom rules, then click simulate to see how automated rebalancing would affect performance.
        </li>
        <li>
          Check current prices and 24-hour stats for ETH, BTC, LINK, and other leading cryptos on the <span className="font-semibold">Market</span> page.
        </li>
        <li>
          Need to convert between USD and crypto? Use the <span className="font-semibold">Quick USD Converter</span> in the sidebar.
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">Thank You!</h2>
      <p className="text-gray-700">
        Thanks for checking out EquiLink. For technical details, smart contract info, and data sources, see the <Link to="/about" className="text-teal-700 underline">About</Link> page or click the GitHub icon in the sidebar to view the code repo.
      </p>
    </section>
  </main>
);

export default Home;

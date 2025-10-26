const About = () => (
  <main className="w-full max-w-2xl mx-auto p-8 flex flex-col gap-8">
    <section>
      <h1 className="text-3xl font-bold text-teal-800 mb-2">About EquiLink</h1>
      <p className="text-lg text-gray-700">
        EquiLink is a demo web app for simulating crypto portfolio rebalancing and viewing real-time market data for Ethereum (ETH), Bitcoin (BTC), and Chainlink (LINK).
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">How It Works</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>
          <span className="font-semibold">Portfolio Simulation:</span> Uses official Chainlink price feeds (Sepolia testnet) for accurate, decentralized pricing during rebalancing simulations.
        </li>
        <li>
          <span className="font-semibold">Market Data:</span> Live price cards and dashboard use CoinGecko's public API for up-to-date quotes and market stats.
        </li>
        <li>
          <span className="font-semibold">Quick Converter:</span> Instantly converts between USD and supported tokens (ETH, BTC, LINK) using the latest prices.
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">Why EquiLink?</h2>
      <p className="text-gray-700">
        This project was built to showcase modern Web3 engineering and frontend design, and to make crypto simulation and market data more transparent and user-friendly.
      </p>
      <p className="text-gray-700 mt-2">
        It's a hands-on demo for learning, portfolio presentation, and exploring real-world integration of blockchain data and open APIs.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">Data Sources & Tech</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>
          <span className="font-semibold">Simulation pricing:</span> Chainlink Price Feeds (Sepolia testnet)
        </li>
        <li>
          <span className="font-semibold">Dashboard market data:</span> CoinGecko API
        </li>
        <li>
          <span className="font-semibold">Stack:</span> React, TypeScript, Tailwind CSS, Vite, wagmi, viem, Chainlink, and more
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">Disclaimer</h2>
      <p className="text-gray-700">
        This is a demo app for educational and portfolio purposes only. Data is for demonstration; not financial advice.
      </p>
    </section>
  </main>
);

export default About;

const About = () => (
  <main className="w-full max-w-2xl mx-auto p-8 flex flex-col gap-8">
    <section>
      <h1 className="text-3xl font-bold text-teal-800 mb-2">About EquiLink</h1>
      <p className="text-lg text-gray-700">
        <b>EquiLink</b> is a hands-on demo web app for exploring crypto rebalancing strategies and viewing live market data for Ethereum (ETH), Bitcoin (BTC), Chainlink (LINK), and more.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">Smart Contract Details</h2>
      <p className="text-gray-700">
        The EquiLink smart contract is written in Solidity and powers the portfolio simulation logic. It securely consumes Chainlink price feeds using constructor-injected addresses, normalizes price data, and checks for stale or missing values. The contract lets users simulate custom portfolios and stop-loss rules, and tracks value moved to a stablecoin when a rule triggers. This approach demonstrates safe oracle integration, clear event handling, and practical Web3 contract patterns for real-world use cases.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">How It Works</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>
          <span className="font-semibold">Portfolio Simulation:</span> Simulates automated rebalancing using <b>official Chainlink price feeds (Sepolia testnet)</b>. When your stop-loss triggers, EquiLink simulates selling that asset into a stablecoin like USDC, preserving your value from further drops.
        </li>
        <li>
          <span className="font-semibold">Market Data:</span> The <span className="font-semibold">Market</span> dashboard uses <b>CoinGecko's public API</b> for up-to-date real-world quotes and stats. These are displayed separately from simulation results.
        </li>
        <li>
          <span className="font-semibold">Quick Converter:</span> Instantly converts between USD and supported tokens using the latest <b>Sepolia testnet prices</b> for simulation purposes.
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">Why EquiLink?</h2>
      <p className="text-gray-700">
        EquiLink was built as a portfolio project to demonstrate secure, real-world integration of Chainlink price feeds using safe patterns in smart contracts, along with open market APIs and modern React Web3 design. It is a hands-on platform for building, consuming, and presenting blockchain-driven data in a transparent and reliable way.
      </p>
      <p className="text-gray-700 mt-2">
        <b>Future plans:</b> The current version focuses on stop-loss rules and stablecoin preservation. In the future, the app may add high-upside strategies like taking profit during price spikes, support for more tokens, and advanced simulation options.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">Data Sources & Tech</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>
          <span className="font-semibold">Simulation pricing:</span> <b>Chainlink Price Feeds (Sepolia testnet only)</b>
        </li>
        <li>
          <span className="font-semibold">Dashboard market data:</span> <b>CoinGecko API (real-world, public)</b>
        </li>
        <li>
          <span className="font-semibold">Stack:</span> React, TypeScript, Tailwind CSS, Vite, wagmi, viem, Chainlink, and more
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">Disclaimer</h2>
      <p className="text-gray-700">
        This is a demo app for educational and portfolio purposes only. Data is for demonstration, not financial advice, and not connected to real funds or mainnet.
      </p>
    </section>
  </main>
);

export default About;

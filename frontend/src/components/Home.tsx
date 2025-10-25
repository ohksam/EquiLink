import { Link } from "react-router";

const Home = () => (
  <main className="w-full max-w-2xl mx-auto p-8 flex flex-col gap-8">
    <section>
      <h1 className="text-3xl font-bold text-teal-800 mb-2">Welcome to EquiLink!</h1>
      <p className="text-lg text-gray-700">
        EquiLink is a crypto portfolio simulator and live market dashboard built to help you explore portfolio rebalancing with real-time price feeds.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">How to Use</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>
          Use the sidebar to navigate between <span className="font-semibold">Simulate Portfolio</span> (rebalance simulator), <span className="font-semibold">Dashboard</span> (live prices & stats), and this Home page.
        </li>
        <li>
          On the <span className="font-semibold">Simulate Portfolio</span> page, enter your initial portfolio and custom rebalance rules, then click simulate to see how your assets would perform.
        </li>
        <li>
          Check current market prices and 24-hour stats for ETH, BTC, and LINK on the <span className="font-semibold">Dashboard</span>.
        </li>
        <li>
          Need to convert between USD and crypto? Use the <span className="font-semibold">Quick USD Converter</span> in the sidebar.
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-teal-700 mb-1">Thank You</h2>
      <p className="text-gray-700">
        Thanks for checking out EquiLink! For more details on how the app works and where the data comes from, see the <Link to="/about" className="text-teal-700 underline">About</Link> page.
      </p>
    </section>
  </main>
);

export default Home;

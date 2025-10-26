# EquiLink

**A crypto portfolio strategy simulator using real on-chain data.**

EquiLink lets users simulate rebalancing strategies (e.g., stop-loss triggers) on a crypto portfolio using live Chainlink price feeds — all without risking real funds. It’s a fast, safe, and flexible way to test what would’ve happened *if* you had implemented a specific risk management plan.

---

## 🌐 Live Demo

> Coming soon...

---

## 🧠 What It Does

- 🔮 **Simulates stop-loss strategies**: Sell a % of an asset if it drops below a threshold.
- 📈 **Compares outcomes**: See how your portfolio performs *with* and *without* your strategy.
- 🔗 **Powered by Chainlink**: Uses real-time, decentralized price feeds for ETH, BTC, etc.
- 🔒 **Stateless & Safe**: Nothing is stored, no transactions executed — pure simulation.
- ⚡ **Fast results**: Enter your inputs and see simulated performance in seconds.

---

## 🧪 Example Use Case

> “I want to see what would’ve happened if I sold 20% of my ETH when it dropped 15% from my entry price.”

Input:
- Portfolio: $500 ETH, $500 BTC
- Rule: “If ETH drops 15%, sell 20% to USDC”

Output:
- Simulated value with stop-loss: `$945.00`
- Value if HODLed: `$910.00`
- Difference: `+$35.00` gain from strategy

---

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| Smart Contract | Solidity, Chainlink Price Feeds |
| Frontend | React, TypeScript, Vite |
| Wallet / Read Ops | wagmi + viem |
| Styling | TailwindCSS |

---

## 🛠️ Features

### ✅ MVP (Completed)
- Input simulated portfolio in USD
- Set custom stop-loss triggers per asset
- Chainlink price feeds pulled at simulate-time
- Compare strategy vs HODL portfolio value
- Stateless simulation — no real funds touched
- Simple, responsive frontend

### 🧭 Future Roadmap
- [ ] Simulate converting from one crypto to another (e.g., ETH → BTC)
- [ ] “Surge Detection” mode: small allocation gambles on price spikes
- [ ] Backtesting with historical data (e.g. from dune.xyz or CCXT)
- [ ] Support gas fee estimation and slippage modeling
- [ ] Preset strategy templates (e.g. rebalancing bands, DCA exits)
- [ ] Share or save strategy runs
- [ ] Integrate Chainlink Functions for external signals (e.g. sentiment, volatility)
- [ ] Deploy safe live contract with optional real trading hooks (via delegate vault or multisig)

---

## 🔐 Disclaimers

- This app does **not** execute any real trades.
- All simulations are run locally in your browser or via view-only smart contract calls.
- Price feeds are pulled at the time of simulation and may not reflect future price movement.
- This is a research/education project — not financial advice or production trading software.

---

## 🧑‍💻 Author

**Sam Oh**  
Built as a learning project for Solidity, Chainlink integration, and frontend ↔ smart contract architecture.
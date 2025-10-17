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

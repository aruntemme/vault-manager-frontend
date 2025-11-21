# Day 3 Continued: The Full Stack dApp (Next.js + RainbowKit)

Transitioning from terminal scripts to a production-grade **Decentralized Application (dApp)**. We built a React frontend that allows a "Master" to interact with the Vault contract via a UI, closing the loop between the User, the Smart Contract, and the Bot.

## What We Did

1.  **Initialized the Frontend Stack:** Created a Next.js App Router project pre-configured with **RainbowKit** (Wallet UI), **Wagmi** (React Hooks), and **Tailwind CSS**.
2.  **Resolved Dependency Conflicts:** Fixed version mismatches between Viem, Wagmi, and RainbowKit using a clean install strategy and webpack config overrides.
3.  **Built the "Write" Logic:** Implemented `useWriteContract` to allow users to set an allowance for the Agent directly from the browser.
4.  **Built the "Read" Logic:** Implemented `useReadContract` with auto-refetching to display live blockchain data (Current Allowance) that updates in real-time.
5.  **The Full Stack Loop:** Successfully demonstrated the complete cycle:
      * **UI:** User sets allowance of 10 peUSDC.
      * **Contract:** Updates state on Base Sepolia.
      * **Bot:** Detects change and auto-claims funds.
      * **UI:** Auto-updates allowance back to 0.

## Prerequisites

  * **Node.js & NPM**
  * **Deployed Contracts** (From Day 2)
  * **Running Bot** (From Day 3 - required to see the full automation cycle)

## How to Run

1.  **Navigate to Folder:**

    ```bash
    cd day4-frontend
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Start the Development Server:**

    ```bash
    npm run dev
    ```

    *Open `http://localhost:3000` in your browser.*

4.  **Simulate the Ecosystem:**

      * **Terminal A:** Run the Frontend (`npm run dev`).
      * **Terminal B:** Run the Bot (check https://github.com/aruntemme/smart-contracts-init for the bot code) (`npx ts-node bot.ts`).
      * **Action:** Connect Wallet on localhost -\> Approve Agent -\> Watch Bot drain it.

## Key Learnings

### 1\. The "Wagmi" Abstraction

  * **Concept:** While `Viem` is great for scripts, `Wagmi` provides React Hooks that manage the lifecycle of a transaction (Pending -\> Confirming -\> Success) automatically.
  * **Usage:** We used `useWriteContract` for transactions (costs gas) and `useReadContract` for fetching data (free).

### 2\. The "Keeper" Architecture (Real World Application)

We learned that the system we built (Contract + Allowance + Bot) is the exact architecture used by billion-dollar DeFi protocols:

  * **Lending (Aave):** Bots liquidate risky loans based on health factor.
  * **DEXs (1inch/CoW Swap):** Solvers fill "Intent" orders based on signed allowances.
  * **Yield (Yearn):** Harvester bots auto-compound interest for users.

## Proof of Work

**Live Deployment:** https://vault-manager-frontend-one.vercel.app/



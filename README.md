## RaveCoin – Decentralized Stablecoin Platform

RaveCoin is a **collateral‑backed, over‑collateralized stablecoin** built on Ethereum.

It lets you:
- **Deposit** blue‑chip assets (WETH / WBTC)
- **Mint** a decentralized stablecoin (DSC)
- **Redeem / Burn** to unlock collateral
- **Liquidate** risky positions – fully on‑chain, enforced by smart contracts

The project includes:
- **Smart contracts** (Foundry)
- A **modern React + Vite frontend** with an Apple‑inspired, black & silver “timepiece” UI
- **Sepolia deployment tooling** and full docs

---

## 1. Concepts (Plain English)

- **DSC (Decentralized StableCoin)**  
  ERC20 token meant to track around **\$1**, backed by more value in collateral than is minted.

- **Collateral (WETH / WBTC)**  
  You lock WETH or WBTC into the `DSCEngine` contract. This collateral is valued via **Chainlink price feeds**.

- **Health Factor**  
  A number that tells you how safe your position is.  
  - **> 1** → safe  
  - **≤ 1** → can be liquidated

- **Minting DSC**  
  You can only mint DSC if your **collateral value / DSC debt** keeps your **health factor above the minimum**.

- **Redeeming / Burning**  
  - **Redeem collateral**: return DSC (burn) → receive your WETH / WBTC back.  
  - **Burn DSC**: reduces your debt and improves your health factor.

- **Liquidation**  
  If someone’s health factor goes too low, another user can **liquidate** their position, repaying their DSC and taking a portion of their collateral with a small bonus.

---

## 2. Project Structure

- `src/`
  - `DecentralizedStableCoin.sol` – ERC20 stablecoin implementation
  - `DSCEngine.sol` – core protocol logic: deposit, mint, redeem, burn, liquidations, health factor checks
  - `libraries/OracleLib.sol` – price feed helpers and sanity checks

- `script/`
  - `DeployDSC.s.sol` – deploys DSC + DSCEngine
  - `HelperConfig.s.sol` – network‑specific addresses (Anvil / Sepolia)
  - `DeployAndUpdateFrontend.s.sol` – deploys contracts and prints `.env` values for the frontend

- `frontend/`
  - React + Vite app
  - Uses **ethers.js** and your `.env` contract addresses
  - Apple‑style **landing page** + full **dashboard** for DSCEngine

- `test/`
  - Unit tests (`unit/DSCEngine.t.sol`)
  - Fuzz & invariant tests (`fuzz/`)

---

## 3. Smart Contract Features

- **Collateral Management**
  - Deposit WETH / WBTC
  - Redeem collateral if your health factor remains safe

- **Stablecoin Logic (`DSCEngine`)**
  - `depositCollateral` / `redeemCollateral`
  - `mintDsc` / `burnDsc`
  - `liquidate` under‑collateralized positions
  - Health factor checks before risky actions

- **Price Feeds (Chainlink)**
  - WETH / USD
  - WBTC / USD

- **Security Patterns**
  - Over‑collateralization
  - Health factor calculations
  - Only allowed collateral tokens

For deeper protocol details, check the contract comments in `src/DSCEngine.sol`.

---

## 4. Frontend – What You Get

The frontend is a **React + Vite** single‑page app that:

- **Landing Page**
  - Black & silver “endless timepiece” hero with animated orbital rings
  - Live‑feel **global market ticker** (BTC / ETH / SOL / AVAX / LINK / ARB) using live data from CoinGecko
  - Clear explanation of:
    - What RaveCoin is
    - Features
    - Use cases
    - How it works (3‑step flow)
  - Silver meteor background effects behind key sections

- **Wallet & Network**
  - Connect / disconnect with **MetaMask**
  - Uses `wallet_requestPermissions` to allow account switching
  - Remembers explicit disconnect via `localStorage` so MetaMask doesn’t auto‑reconnect
  - Auto‑switches to **Sepolia** and can add the network if missing

- **Dashboard (once connected)**
  - **Account Overview**
    - Health factor (color‑coded)
    - Total collateral value (USD)
    - DSC minted
  - **Collateral Positions**
    - Per‑token:
      - Deposited amount
      - Wallet balance
      - Token symbol & address (WETH / WBTC)
  - **Actions**
    - Deposit collateral (WETH / WBTC)
    - Mint DSC
    - Redeem collateral
    - Burn DSC
    - Liquidate unhealthy positions
  - Loading overlay for pending transactions

All contract interactions are wired via custom hooks:
- `useWeb3` – wallet / provider
- `useDSCEngine` – reads & writes to the engine and DSC token

---

## 5. Requirements

- **Node.js** (LTS recommended)
- **pnpm / npm / yarn** (any works; examples use `npm`)
- **Foundry** (for contracts)
- **MetaMask** (or compatible wallet)

Environment:
- For local: Anvil (comes with Foundry)
- For testnet: Sepolia RPC (e.g. Infura / Alchemy)

---

## 6. Backend Setup (Contracts)

### 6.1 Install Foundry (if not already)

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 6.2 Install dependencies

From the project root:

```bash
forge install
```

### 6.3 Local: Run Anvil

```bash
anvil
```

This starts a local Ethereum node at `http://localhost:8545` with test accounts.

### 6.4 Local: Deploy contracts + generate frontend config

From the project root:

```bash
forge script script/DeployAndUpdateFrontend.s.sol:DeployAndUpdateFrontend \
  --rpc-url http://localhost:8545 \
  --broadcast
```

The script will:
- Deploy `DecentralizedStableCoin` + `DSCEngine`
- Log addresses in the console in a ready‑to‑copy `.env` format, like:

```text
VITE_DSC_ENGINE_ADDRESS=0x...
VITE_DSC_TOKEN_ADDRESS=0x...
VITE_WETH_ADDRESS=0x...
VITE_WBTC_ADDRESS=0x...
VITE_CHAIN_ID=31337
```

Copy these for the frontend `.env`.

---

## 7. Sepolia Deployment

All details: see **`DEPLOY_SEPOLIA.md`**.  
Here’s the quick path.

### 7.1 Set environment variables

```bash
export PRIVATE_KEY=your_private_key_without_0x
export SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

### 7.2 Run the deploy script

```bash
./deploy-sepolia.sh
```

The script will:
- Deploy to Sepolia using `DeployAndUpdateFrontend.s.sol`
- Print the contract addresses as `VITE_...` lines for your frontend `.env`

Use those values in `frontend/.env` and set:

```env
VITE_CHAIN_ID=11155111
```

---

## 8. Frontend Setup & Run

From the project root:

```bash
cd frontend
npm install
```

### 8.1 Create `.env` in `frontend/`

```env
VITE_DSC_ENGINE_ADDRESS=0xYourEngineOnSepoliaOrLocal
VITE_DSC_TOKEN_ADDRESS=0xYourDSCOnSepoliaOrLocal
VITE_WETH_ADDRESS=0xYourWETH
VITE_WBTC_ADDRESS=0xYourWBTC
VITE_CHAIN_ID=11155111   # Sepolia
```

**Important:**
- No spaces around `=` (e.g. `VITE_WETH_ADDRESS=0x...`, not `= 0x...`)
- Make sure these addresses match what your deploy script printed.

### 8.2 Start the dev server

```bash
cd frontend
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

---

## 9. Using the App (Flow)

1. **Open the site (disconnected)**  
   - You see the **landing page**:
     - Orbital logo
     - Explanation sections
     - Live market ticker
2. **Click “Connect Wallet”**
   - MetaMask pops up (with account selection enforced)
   - On success, the app switches to **connected dashboard**
3. **Deposit collateral**
   - Go to **Deposit** tab
   - Choose WETH / WBTC and amount
   - Approve + deposit
4. **Mint DSC**
   - Go to **Mint DSC** tab
   - Choose amount (stay above minimum health factor)
5. **Redeem / Burn**
   - Redeem: withdraw collateral  
   - Burn: reduce DSC debt
6. **Liquidate**
   - If a position is unhealthy, use the **Liquidate** tab to repay their DSC and receive collateral.

All major DSCEngine functions are wired into the UI so you can test the full lifecycle: **deposit → mint → redeem / burn → liquidation**.

---

## 10. Extra Docs

- `FRONTEND_SETUP.md` – step‑by‑step frontend details
- `DEPLOY_SEPOLIA.md` – full Sepolia deployment guide
- `GET_ADDRESSES.md` – how to obtain and manage contract addresses
- `SEPOLIA_QUICK_START.md` – quick reference for Sepolia

---

## 11. Notes & Tips

- If the frontend doesn’t reflect `.env` changes, restart `npm run dev`.
- If MetaMask keeps auto‑connecting the wrong account, use MetaMask “Connected sites” to disconnect, then:
  - Use the **Disconnect** button in the app
  - Reconnect – our frontend forces the account picker when possible.
- For any UI issues, the main styling lives in:
  - `frontend/src/App.css`
  - `frontend/src/index.css`

Enjoy exploring RaveCoin – a minimal, bold, and fully interactive decentralized stablecoin platform. 💠
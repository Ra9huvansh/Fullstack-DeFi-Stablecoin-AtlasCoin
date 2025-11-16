# RaveCoin - Decentralized Stablecoin

A decentralized stablecoin protocol similar to DAI, backed by WETH and WBTC collateral.

## Features

1. **Relative Stability**: Anchored or Pegged -> $1.00
   - Chainlink Price Feed
   - Set a function to exchange ETH & BTC -> $$$
2. **Stability Mechanism (Minting)**: Algorithmic (Decentralized)
   - People can only mint the stablecoin with enough collateral (coded)
3. **Collateral**: Exogenous (Crypto)
   - wETH
   - wBTC

## Quick Start

### Local Development (Anvil)

1. Start Anvil:
   ```bash
   anvil
   ```

2. Deploy contracts:
   ```bash
   forge script script/DeployAndUpdateFrontend.s.sol:DeployAndUpdateFrontend --rpc-url http://localhost:8545 --broadcast
   ```

3. Configure frontend (see `FRONTEND_SETUP.md`)

### Sepolia Testnet Deployment

See `DEPLOY_SEPOLIA.md` for complete Sepolia deployment guide.

Quick deploy:
```bash
export PRIVATE_KEY=your_private_key
export SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
./deploy-sepolia.sh
```

## Frontend

The frontend is a React application with all DSCEngine functions integrated.

- See `FRONTEND_SETUP.md` for setup instructions
- See `DEPLOY_SEPOLIA.md` for Sepolia deployment
- See `GET_ADDRESSES.md` for getting contract addresses

## Project Structure

- `src/` - Smart contracts
- `frontend/` - React frontend application
- `script/` - Deployment scripts
- `test/` - Foundry tests
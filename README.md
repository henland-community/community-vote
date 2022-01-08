# Community Vote
### A voting tool for "Hic Et Nunc Community"

Originally developed with the help of [TzConnect](https://github.com/tzConnectBerlin) and Hicathon for hicetnunc

Currently deployed on mainnet at [https://vote.hencommunity.quest]()

## Prerequisite

1. Nodejs
2. Yarn

## Deploying smart contract

1. Create `.env` file using example.

   - `cp .env.example .env`
   - update the .env file

2. Run: `yarn deploy`
3. Update the `.env` file with contract address received from above command.

## React App

Update the `.env` file to include below fields:

- REACT_APP_NETWORK: Network where contract is deployed. Available options: "MAINNET" | "DELPHINET" | "EDONET" | "FLORENCENET" | "GRANADANET" | "CUSTOM"
- REACT_APP_RPC_URL: RPC url to connect to. Default: https://florencenet.smartpy.io/
- REACT_APP_CONTRACT_ADDRESS: Contract address received from the deployment step above.

### Available Scripts

- `yarn build`: To build the production app.
- `yarn start`: To start the app in local dev setup.

# Sample Hardhat Project

This is an starting project with all the configuration needed.

## Environment Variables

Create a .env file will the following Environment Variables:

```js
SEPOLIA_INFURA_RPC_URL="you infura api key to connect to sepolia rpc node"  // ex: https://sepolia.infura.io/v3/xdad1dasd1x12x13
PRIVATE_KEY="you wallet private key for deployments in any testnet or mainnet" 
COINMARKETCAP_API_KEY="coinmarketcap key use for the gas-reporter utility"
LOCALHOST_PRIVATE_KEY="a private key for any of the hardhat node wallets to test locally"
ETHERSCAN_API_KEY="an etherscan apikey to validate your contracts"
```

## Deploy

There are 3 networks configured in this project. (see "hardhat.config.ts" file)

- sepolia
- polygon
- localhost

You can add more networks or change the configuration in the "hardhat.config.ts" file.
In order to deploy you contract to one of this networks use:

npm:

```shell
npx hardhat deploy --network localhost
npx hardhat deploy --network sepolia
npx hardhat deploy --network polygon
```

yarn:

```shell
yarn hardhat deploy --network localhost 
yarn hardhat deploy --network sepolia
yarn hardhat deploy --network polygon
```

To deploy to localhost make sure you have your hardhat node running

npm:

```shell
npx hardhat node
```

yarn:

```shell
yarn hardhat node
```

## hardhat-deploy

This package will run all your scripts inside the deploy folder when you use deploy:

installation:

```shell
yarn add -dev hardhat-deploy
```

running scripts inside the deploy folder:

```shell
yarn hardhat deploy --network localhost
```

## hardhat-gas-reporter

gas reporter utility

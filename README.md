# Donate Crypto

## Prerequisites

Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), the free and open source distributed Version Control System.  
Install [Node.js](https://nodejs.org/) which includes Node Package Manager.  
Install [Yarn](https://yarnpkg.com) Package Manager.  

## Clone the Project

Run `git clone https://github.com/orbanszlrd/donate-crypto.git` to clone te project from [GitHub](https://github.com/orbanszlrd/donate-crypto)

## Install Dependencies

Run `yarn install` or `npm install` to install the dependencies.

## Compile Smart Contracts

The command below compiles every *.sol* file in your contracts folder.

```shell
npm run compile
```

You can find the compiled contracts in the *artifacts* folder

## Deploy Smart Contracts to different Networks

To deploy a contract to a remote network you need a url and a private key.  

- For getting a url, go to [Alchemy](https://alchemy.com/?r=7b980bb14402be0b), sign up, create a new App in its dashboard

- For the private key you need to install [MetaMask](https://metamask.io/), create an account and export its private key

- To verify your smart contracts, sign up to [Etherscan](https://etherscan.io/) and create an API Key

### Hardhat (Default)

Hardhat comes built-in with Hardhat Network, a local Ethereum network node designed for development

```shell
npm run deploy
```

### Hardhat (Localhost)

```shell
npm run deploy:localhost
```

### Ganache

[Ganache](https://trufflesuite.com/ganache/) is a personal blockchain running on your own mashine on port 7545.

```shell
npm run deploy:ganache
```

### Goerli

[Goerli](https://goerli.net/) is an Ethereum test network that allows for blockchain development testing before deployment on Mainnet, the main Ethereum network.

```shell
npm run deploy:goerli
```

## Testing Smart Contracts

Writing automated tests when building smart contracts is of crucial importance.
We can use [Mocha](https://mochajs.org/) test runner and the [Chai](https://www.chaijs.com/) assertion library.

### Running Tests

```shell
npm run test
```

### Running Tests with Coverage

For test coverage you need to install the [solidity-coverage](https://www.npmjs.com/package/solidity-coverage) package.

```shell
npm run coverage
```

## Further Help

[Alchemy - The Web3 Development Platform](https://alchemy.com/?r=7b980bb14402be0b)  
[Ethereum - Technology powering the Cryptocurrency Ether](https://ethereum.org/)  
[Ethers.js - Library for interacting with the Ethereum Blockchain](https://docs.ethers.io/)  
[Etherscan - The Ethereum Blockchain Explorer](https://etherscan.io/)  
[Hardhat - Ethereum Development Environment for Professionals](https://hardhat.org/)  
[MetaMask - A Crypto Wallet & Gateway to Blockchain Apps](https://metamask.io/)  
[Solidity - Programming Language for implementing Smart Contracts](https://docs.soliditylang.org/)  
[Ganache - Personal Blockchain for Ethereum development](https://trufflesuite.com/ganache/)  

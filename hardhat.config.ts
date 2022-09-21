import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-etherscan';
import 'dotenv/config';
import 'hardhat-gas-reporter';
import 'hardhat-deploy';
import 'solidity-coverage';

const GANACHE_RPC_URL = process.env.GANACHE_RPC_URL || '';
const GANACHE_PRIVATE_KEY = process.env.GANACHE_PRIVATE_KEY || '';

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || '';
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY || '';

const config: HardhatUserConfig = {
    defaultNetwork: 'hardhat',
    etherscan: {
        apiKey: process.env.ETERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
    },
    networks: {
        localhost: {
            url: 'http://127.0.0.1:8545',
            chainId: 31337,
        },
        ganache: {
            url: GANACHE_RPC_URL,
            accounts: [GANACHE_PRIVATE_KEY],
            chainId: 1337,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [ACCOUNT_PRIVATE_KEY],
            chainId: 5,
        },
    },
    solidity: '0.8.17',
};

export default config;

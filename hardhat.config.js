require('dotenv').config();

require('@nomiclabs/hardhat-waffle');
require('./tasks/faucet');
require('@babel/register');
require('@nomiclabs/hardhat-web3');
require('hardhat-gas-reporter');
require('@nomiclabs/hardhat-etherscan');

const chainIds = {
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

module.exports = {
  solidity: {
    version: '0.8.10',
    settings: {
      // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 1,
      },
    },
  },
  defaultNetwork: 'mainnet',
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.INFURA_API_KEY}`,
        blockNumber: 12926836,
      },
      chainId: chainIds.hardhat,
    },
    testnet: {
      chainId: chainIds.ropsten,
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
    },
    mainnet: {
      chainId: chainIds.mainnet,
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
    },
  },
  gasReporter: {
    currency: 'USD',
    outputFile: './gas_report.txt',
    noColors: true,
    gasPrice: 100,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

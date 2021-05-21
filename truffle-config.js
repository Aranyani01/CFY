const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "floor mixed narrow glide legend strong doctor bench strong kind true rebel";

module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/6ba6f1f72b954dc894e9d117fa37e013")
      },
      network_id: 4
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/6ba6f1f72b954dc894e9d117fa37e013")
      },
      network_id: 1,
      from: '0xEF5dc33A53DD2ED3F670B53F07cEc5ADD4D80504'
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    matictest: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      from: '0xEF5dc33A53DD2ED3F670B53F07cEc5ADD4D80504'

    },
    maticmain: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mainnet.matic.network`),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      symbol: 'MATIC',
      from: '0xEF5dc33A53DD2ED3F670B53F07cEc5ADD4D80504'
    }
  },
  compilers:{
  solc: {
    version: "0.6.3"

  }

}
};

require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  defaultNetwork: "celo",
  networks: {
   celo: {
     url: "https://forno.celo.org",
     accounts: [process.env.PRIVATE_KEY],
     chainId: 42220
   }
  }
};

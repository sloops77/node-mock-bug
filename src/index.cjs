const ethers = require('ethers');

const createNetworkCjs = (chainId) => {
  return chainId ? ethers.Network.from(chainId) : undefined;
}

module.exports = { createNetworkCjs }
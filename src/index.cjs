const ethers = require('ethers');
const {nanoid} = require('nanoid')

const createNetworkCjs = (chainId) => {
  return chainId ? ethers.Network.from(chainId) : undefined;
}

const createNanoidCjs = () => nanoid()

module.exports = { createNetworkCjs, createNanoidCjs }
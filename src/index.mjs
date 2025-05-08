import ethers from 'ethers';

export const createNetworkEsm = (chainId) => {
  return chainId ? ethers.Network.from(chainId) : undefined;
}
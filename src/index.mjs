import ethers from 'ethers';
import {nanoid} from "nanoid";

export const createNetworkEsm = (chainId) => {
  return chainId ? ethers.Network.from(chainId) : undefined;
}

export const createNanoidEsm = () => nanoid()
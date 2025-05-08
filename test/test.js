const {describe, it, mock} = require("node:test");
const assert = require("node:assert");

class Network {
  static from(chainId) {
    return `mock-network-${chainId}`;
  }
}

mock.module('ethers', {
  defaultExport: {
    Network
  },
});

const { createNetworkCjs } = require('../src/index.cjs')
const { createNetworkEsm } = require('../src/index.mjs')

describe('create-network', () => {
  it('mocking problem in cjs', () => {
    assert.strictEqual(createNetworkCjs('1234'), 'mock-network-1234'); // fails
  })

  it('mocking works for esm', () => {
    assert.strictEqual(createNetworkEsm('1234'), 'mock-network-1234');
  })
})
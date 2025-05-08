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


mock.module('nanoid', {
  namedExports: {
    nanoid() {
      return '1234'
    }
  },
});

const { createNetworkCjs, createNanoidCjs } = require('../src/index.cjs')
const { createNetworkEsm, createNanoidEsm } = require('../src/index.mjs')

describe('create-network', () => {
  it('mocking problem in cjs', () => {
    assert.strictEqual(createNetworkCjs('1234'), 'mock-network-1234'); // fails
  })

  it('mocking works for esm', () => {
    assert.strictEqual(createNetworkEsm('1234'), 'mock-network-1234');
  })
})

describe('nanoid', () => {
  it('mocking problem in cjs', () => {
    assert.strictEqual(createNanoidCjs(), '1234'); // fails
  })

  it('mocking works for esm', () => {
    assert.strictEqual(createNanoidEsm(), '1234');
  })
})
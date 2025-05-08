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

describe('create-network', (t) => {
  it('mocking problem in cjs', () => {
    const ethers = require('ethers');
    assert.strictEqual(ethers.Network.from('1234'), 'mock-network-1234'); // fails
  })

  it('mocking works for esm', async () => {
    const {default: ethers} = await import('ethers');
    assert.strictEqual(ethers.Network.from('1234'), 'mock-network-1234');
  })
})


mock.module('nanoid', {
  namedExports: {
    nanoid() {
      return '1234'
    }
  },
});
describe('nanoid', () => {
  it('mocking problem in cjs', () => {
    const {nanoid} = require('nanoid')
    assert.strictEqual(nanoid(), '1234'); // fails
  })

  it('mocking works for esm', async () => {
    const {nanoid} = await import('nanoid')
    assert.strictEqual(nanoid(), '1234');
  })
})

it('readline', async (t) => {
  const mock = t.mock.module('node:readline', {
    namedExports: { fn() { return 42; } },
  });

  let esmImpl = await import('node:readline');
  let cjsImpl = require('node:readline');

  // cursorTo() is an export of the original 'node:readline' module.
  assert.strictEqual(esmImpl.cursorTo, undefined);
  assert.strictEqual(cjsImpl.cursorTo, undefined);
  assert.strictEqual(esmImpl.fn(), 42); // works
  assert.strictEqual(cjsImpl.fn(), 42); // works
})
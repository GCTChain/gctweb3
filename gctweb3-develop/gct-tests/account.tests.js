/* eslint-disable no-underscore-dangle, max-len */
const { assert } = require('chai');

const { getDefaultEcocAddress, getDefaultEcocPrivKey } = require('../test/utils');
const gctcjs = require('../src/gctcjs');
const Account = require('../src/account');

describe('Account', () => {
  let accout;

  describe('Testnet', () => {
    it('create testnet account object', async () => {
      accout = new Account('Testnet');
      assert.isDefined(accout.network);
      assert.isDefined(accout.utxoList);
      assert.equal(accout.network, gctcjs.networks.gctc_testnet);
    });

    it('can export or import from wif', async () => {
      accout = new Account('Testnet');
      accout.fromWIF(getDefaultEcocPrivKey());
      assert.equal(accout.toAddr(), getDefaultEcocAddress());
      assert.equal(accout.toWIF(), getDefaultEcocPrivKey());
    });
    it('can generate new address', async () => {
      accout = new Account('Testnet');
      accout.createNewAddress();
      assert.equal(accout.toAddr()[0], 'e');
      assert.isDefined(accout.toPubkey());
    });
    it('throws if dont have any keyPair', () => {
      accout = new Account('Testnet');
      assert.throws(() => accout.toPubkey());
      assert.throws(() => accout.toWIF());
      assert.throws(() => accout.toAddr());
      assert.throws(() => accout.getKeypair());
    });
    it('throws if create or importing an existed keyPair', () => {
      accout = new Account('Testnet');
      accout.fromWIF(getDefaultEcocPrivKey());
      assert.throws(() => accout.fromWIF(getDefaultEcocPrivKey()));
      assert.throws(() => accout.createNewAddress());
    });
  });

  describe('Mainnet', () => {
    it('create testnet account object', async () => {
      accout = new Account('Mainnet');
      assert.isDefined(accout.network);
      assert.isDefined(accout.utxoList);
      assert.equal(accout.network, gctcjs.networks.gctc);
    });

    it('can generate new address', async () => {
      accout = new Account('Mainnet');
      accout.createNewAddress();
      assert.equal(accout.toAddr()[0], 'E');
      assert.isDefined(accout.toPubkey());
    });
    it('throws if dont have any keyPair', () => {
      accout = new Account('Mainnet');
      assert.throws(() => accout.toPubkey());
      assert.throws(() => accout.toWIF());
      assert.throws(() => accout.toAddr());
      assert.throws(() => accout.getKeypair());
    });
    it('throws if wrong wif network', () => {
      accout = new Account('Mainnet');
      assert.throws(() => accout.fromWIF(getDefaultEcocPrivKey()));
    });
  });
});
/* eslint-enable no-underscore-dangle, max-len */

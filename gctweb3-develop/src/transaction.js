const gctcjs = require('./gctcjs');

class Transaction {
  constructor(Network) {
    const network = (typeof Network === 'string') ? gctcjs.getNetwork(Network) : Network;
    this.network = network;
    this.script = gctcjs.script;
    this.selectUTXO = gctcjs.utils.selectTxs;
    this.buildPubKeyHash = gctcjs.utils.buildPubKeyHashTransaction;
    this.buildCreateContract = gctcjs.utils.buildCreateContractTransaction;
    this.buildSendToContract = gctcjs.utils.buildSendToContractTransaction;
  }

  TxBuilder() {
    return new gctcjs.TransactionBuilder(this.network);
  }

  TxFromHex(rawtx) {
    return gctcjs.Transaction.fromHex(rawtx);
  }

  TxFromBuffer(rawtx) {
    return gctcjs.Transaction.fromBuffer(rawtx);
  }
}

module.exports = Transaction;

const { Server, Keypair, TransactionBuilder, Networks, Operation, Asset } = require('stellar-sdk');

class CharityDonation {
  constructor(serverUrl, contractId, networkPassphrase) {
    this.server = new Server(serverUrl);
    this.contractId = contractId;
    this.networkPassphrase = networkPassphrase;
  }

  async initializeCharity(charityAddress, signerKeypair) {
    const account = await this.server.loadAccount(signerKeypair.publicKey());
    const transaction = new TransactionBuilder(account, {
      fee: await this.server.fetchBaseFee(),
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(Operation.manageData({
        name: `initialize_charity_${charityAddress}`,
        value: charityAddress,
      }))
      .setTimeout(30)
      .build();

    transaction.sign(signerKeypair);
    return this.server.submitTransaction(transaction);
  }

  async removeCharity(charityAddress, signerKeypair) {
    const account = await this.server.loadAccount(signerKeypair.publicKey());
    const transaction = new TransactionBuilder(account, {
      fee: await this.server.fetchBaseFee(),
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(Operation.manageData({
        name: `remove_charity_${charityAddress}`,
        value: null,
      }))
      .setTimeout(30)
      .build();

    transaction.sign(signerKeypair);
    return this.server.submitTransaction(transaction);
  }

  async donate(userKeypair, charityAddress, amount, roundUp) {
    const userAccount = await this.server.loadAccount(userKeypair.publicKey());
    const donationAmount = roundUp ? Math.ceil(amount) : amount;

    const transaction = new TransactionBuilder(userAccount, {
      fee: await this.server.fetchBaseFee(),
      networkPassphrase: this.network


const CharityDonation = require('charity-donation');
const { Keypair } = require('stellar-sdk');

// Replace these values with your actual data
const serverUrl = 'https://horizon-testnet.stellar.org';
const contractId = 'GA1234...'; // replace with your contract ID
const networkPassphrase = Networks.TESTNET;
const signerKeypair = Keypair.fromSecret('S...'); // replace with your secret key

const charityDonation = new CharityDonation(serverUrl, contractId, networkPassphrase);

// Initialize a charity
const charityAddress = 'GDEF5678DEF5678DEF5678DEF5678DEF5678DEF5678DEF5678DEF5678';
charityDonation.initializeCharity(charityAddress, signerKeypair)
  .then(result => console.log('Charity initialized:', result))
  .catch(err => console.error('Error initializing charity:', err));

// Remove a charity
charityDonation.removeCharity(charityAddress, signerKeypair)
  .then(result => console.log('Charity removed:', result))
  .catch(err => console.error('Error removing charity:', err));

// Make a donation
const userKeypair = Keypair.fromSecret('S...');
const amount = 100;
const roundUp = true;
charityDonation.donate(userKeypair, charityAddress, amount, roundUp)
  .then(result => console.log('Donation successful:', result))
  .catch(err => console.error('Error making donation:', err));

// Get list of charities
charityDonation.getCharities()
  .then(charities => console.log('Charities:', charities))
  .catch(err => console.error('Error fetching charities:', err));

// Get user donations
const userAddress = 'GHIJ9012HIJ9012HIJ9012HIJ9012HIJ9012HIJ9012HIJ9012HIJ9012';
charityDonation.getUserDonations(userAddress)
  .then(donations => console.log('User donations:', donations))
  .catch(err => console.error('Error fetching donations:', err));

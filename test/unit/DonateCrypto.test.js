const { assert } = require('chai');
const { ethers, network } = require('hardhat');

console.log(`Test started on network ${network.name}`);

const testNetworks = ['goerli'];

testNetworks.includes(network.name)
    ? describe.skip
    : describe('DonateCrypto', function () {
          const sentAmount = ethers.utils.parseEther('1');

          let deployer;
          let donateCrypto;

          beforeEach(async () => {
              deployer = await ethers.provider.getSigner().getAddress();

              const DonateCryptoFactory = await ethers.getContractFactory(
                  'DonateCrypto'
              );
              donateCrypto = await DonateCryptoFactory.deploy();
              await donateCrypto.deployed();
          });

          it('Should return the contract owner', async () => {
              const contractOwner = await donateCrypto.getContractOwner();
              assert.equal(contractOwner, deployer);
          });

          it('Should return the number of donors', async () => {
              let numberOfDonors;

              numberOfDonors = await donateCrypto.getNumberOfDonors();
              assert.equal(numberOfDonors, 0);

              await donateCrypto.donate({ value: sentAmount });
              assert.equal(numberOfDonors, 0);
          });

          it('Should return the donated amount', async () => {
              await donateCrypto.donate({ value: sentAmount });
              const amount = await donateCrypto.getDonatedAmount(deployer);
              assert.equal(amount.toString(), sentAmount.toString());
          });

          it('Should update the balance', async () => {
              await donateCrypto.donate({ value: sentAmount });
              const balance = await donateCrypto.provider.getBalance(
                  donateCrypto.address
              );
              assert.equal(balance.toString(), sentAmount.toString());
          });

          it('Should return the donors', async () => {
              let donors;

              donors = await donateCrypto.getDonors();
              assert.equal(donors.length, 0);

              await donateCrypto.donate({ value: sentAmount });

              donors = await donateCrypto.getDonors();
              assert.equal(donors.length, 1);

              assert.equal(donors[0], deployer);
          });

          it('Should withdraw the donated amount', async () => {
              await donateCrypto.donate({ value: sentAmount });
              await donateCrypto.withdraw();

              const balance = await donateCrypto.provider.getBalance(
                  donateCrypto.address
              );

              assert.equal(balance.toString(), '0');
          });
      });

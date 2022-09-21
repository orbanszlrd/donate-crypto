// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

error DonateCrypto__NotOwner();

/**
 * @title Donate Crypto
 * @author Szilard Orban
 */
contract DonateCrypto {
    address private immutable owner;

    address[] private donors;

    mapping(address => uint256) private addressToAmount;

    modifier onlyOwner() {
        if (msg.sender != owner) revert DonateCrypto__NotOwner();
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        donate();
    }

    fallback() external payable {
        donate();
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function getNumberOfDonors() public view returns (uint256) {
        return donors.length;
    }

    function getDonors() public view returns (address[] memory) {
        return donors;
    }

    function getDonatedAmount(address donor) public view returns (uint256) {
        return addressToAmount[donor];
    }

    function donate() public payable {
        require(msg.value > 0, 'Invalid amount');

        if (addressToAmount[msg.sender] == 0) {
            donors.push(msg.sender);
        }

        addressToAmount[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        for (uint256 i = 0; i < donors.length; i++) {
            address donor = donors[i];
            addressToAmount[donor] = 0;
        }

        donors = new address[](0);

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }('');

        require(callSuccess, 'Call failed');
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

error DonateCrypto__NotOwner();

/**
 * @title Donate Crypto
 * @author Szilard Orban
 */
contract DonateCrypto {
    address private immutable i_owner;

    address[] private s_donors;

    mapping(address => uint256) private s_addressToAmount;

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert DonateCrypto__NotOwner();
        _;
    }

    constructor() {
        i_owner = msg.sender;
    }

    receive() external payable {
        donate();
    }

    fallback() external payable {
        donate();
    }

    function getContractOwner() public view returns (address) {
        return i_owner;
    }

    function getNumberOfDonors() public view returns (uint256) {
        return s_donors.length;
    }

    function getDonors() public view returns (address[] memory) {
        return s_donors;
    }

    function getDonatedAmount(address donor) public view returns (uint256) {
        return s_addressToAmount[donor];
    }

    function donate() public payable {
        require(msg.value > 0);

        if (s_addressToAmount[msg.sender] == 0) {
            s_donors.push(msg.sender);
        }

        s_addressToAmount[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        address[] memory donors = s_donors;

        for (uint256 i = 0; i < donors.length; i++) {
            address donor = donors[i];
            s_addressToAmount[donor] = 0;
        }

        s_donors = new address[](0);

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }('');

        require(callSuccess, 'Call failed');
    }
}

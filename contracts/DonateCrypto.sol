// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

error NotOwner();

contract DonateCrypto {
    address public immutable i_owner;

    address[] public donors;

    mapping(address => uint256) public addressToAmount;

    constructor() {
        i_owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }

    function count() public view returns (uint256) {
        return donors.length;
    }

    function getAllDonors() public view returns (address[] memory) {
        return donors;
    }

    function donate() public payable {
        addressToAmount[msg.sender] += msg.value;
        donors.push(msg.sender);
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

    fallback() external payable {
        donate();
    }

    receive() external payable {
        donate();
    }
}

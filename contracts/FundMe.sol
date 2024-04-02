// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './PriceConverter.sol';
import '@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol';

error NotOwner();

contract FundMe {
	using PriceConverter for uint256;
	AggregatorV3Interface priceFeed;

	mapping(address => uint256) public addressToAmountFunded;
	address[] public funders;

	// Could we make this constant?  /* hint: no! We should make it immutable! */
	address public owner;
	uint256 public constant MINIMUM_USD = 50 * 10 ** 18;

	constructor(address priceFeedAddress) {
		owner = msg.sender;
		priceFeed = AggregatorV3Interface(priceFeedAddress);
	}

	function fund() public payable {
		require(
			msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
			'You need to spend more ETH!'
		);

		addressToAmountFunded[msg.sender] += msg.value;
		funders.push(msg.sender);
	}

	function getVersion() public view returns (uint256) {
		// ETH/USD price feed address of Sepolia Network.
		return priceFeed.version();
	}

	modifier onlyOwner() {
		// require(msg.sender == owner);
		if (msg.sender != owner) revert NotOwner();
		_;
	}

	function withdraw() public onlyOwner {
		for (
			uint256 funderIndex = 0;
			funderIndex < funders.length;
			funderIndex++
		) {
			address funder = funders[funderIndex];
			addressToAmountFunded[funder] = 0;
		}
		funders = new address[](0);

		(bool callSuccess, ) = payable(msg.sender).call{
			value: address(this).balance
		}('');
		require(callSuccess, 'Call failed');
	}

	fallback() external payable {
		fund();
	}

	receive() external payable {
		fund();
	}
}

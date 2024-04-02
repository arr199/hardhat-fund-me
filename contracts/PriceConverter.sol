// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import '@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol';

library PriceConverter {
	// 1000000000
	function getConversionRate(
		uint256 ethAmount,
		AggregatorV3Interface priceFeed
	) internal view returns (uint256) {
		(, int256 answer, , , ) = priceFeed.latestRoundData();
		uint256 ethPrice = uint256(answer * 10000000000);
		uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000;
		// or (Both will do the same thing)
		// uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18; // 1 * 10 ** 18 == 1000000000000000000
		// the actual ETH/USD conversion rate, after adjusting the extra 0s.
		return ethAmountInUsd;
	}
}

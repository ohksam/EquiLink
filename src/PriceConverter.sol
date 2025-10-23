// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
// import "../lib/chainlink-brownie-contracts/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

// custom errors
error InvalidPrice();
error RoundIncomplete();
error StalePrice();

library PriceConverter {
    function getPrice(address feedAddress) internal view returns (uint256) {
        (, int256 price,, uint256 updatedAt,) = AggregatorV3Interface(feedAddress).latestRoundData();
        if (price <= 0) revert InvalidPrice();
        if (updatedAt == 0) revert RoundIncomplete();
        if (block.timestamp - updatedAt >= 1 hours) revert StalePrice();

        return uint256(price) * 1e10;
    }
}
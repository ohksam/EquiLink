// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

// import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "../lib/chainlink-brownie-contracts/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(address feedAddress) internal view returns (uint256) {
        (, int256 price,, uint256 updatedAt,) = AggregatorV3Interface(feedAddress).latestRoundData();
        require(price > 0, "Invalid price");
        require(updatedAt > 0, "Round not complete");
        require(block.timestamp - updatedAt < 1 hours, "Stale price");
        return uint256(price) * 1e10;
    }
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {PriceConverter, InvalidPrice, RoundIncomplete, StalePrice} from "./PriceConverter.sol";

contract EquiLink {
    using PriceConverter for address;

    address public immutable ethUsdFeed;
    address public immutable btcUsdFeed;
    address public immutable linkUsdFeed;

    constructor(address _ethUsdFeed, address _btcUsdFeed, address _linkUsdFeed) {
        ethUsdFeed = _ethUsdFeed;
        btcUsdFeed = _btcUsdFeed;
        linkUsdFeed = _linkUsdFeed;
    }

    // eth and link in wei; btc in satoshi
    struct Portfolio {uint256 ethAmount; uint256 btcAmount; uint256 linkAmount;}

    struct Rule {uint256 entryPrice; uint256 thresholdPercentDrop; uint256 percentToSell;}

    function simulateRebalance(
        Portfolio calldata portfolio,
        Rule calldata ethRule,
        Rule calldata btcRule,
        Rule calldata linkRule
    ) external view returns (uint256 originalUsdValue, uint256 simulatedUsdValue) {
        uint256 newEthUsd = _applyRule(portfolio.ethAmount, ethRule, ethUsdFeed.getPrice());
        uint256 newBtcUsd = _applyRule(portfolio.btcAmount, btcRule, btcUsdFeed.getPrice());
        uint256 newLinkUsd = _applyRule(portfolio.linkAmount, linkRule, linkUsdFeed.getPrice());

        originalUsdValue = (
            (portfolio.ethAmount * ethUsdFeed.getPrice()) / 1e18 +
            (portfolio.btcAmount * btcUsdFeed.getPrice()) / 1e18 +
            (portfolio.linkAmount * linkUsdFeed.getPrice()) / 1e18
        );

        simulatedUsdValue = newEthUsd + newBtcUsd + newLinkUsd;
    }

    function _applyRule(uint256 tokenAmount, Rule memory rule, uint256 currentPrice) internal pure returns (uint256) {
        if (rule.entryPrice == 0) return (tokenAmount * currentPrice) / 1e18;

        uint256 thresholdPrice = (rule.entryPrice * (100 - rule.thresholdPercentDrop)) / 100;

        if (currentPrice < thresholdPrice) {
            uint256 tokensToSell = (tokenAmount * rule.percentToSell) / 100;
            uint256 tokensKept = (tokenAmount - tokensToSell);

            uint256 valueSoldToStable = (tokensToSell * thresholdPrice) / 1e18;
            uint256 valueKept = (tokensKept * currentPrice) / 1e18;

            return valueSoldToStable + valueKept;
        } else {
            return (tokenAmount * currentPrice) / 1e18;
        }
    }
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import { PriceConverter } from "./PriceConverter.sol";

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
    
    // output: 
    // (newEthUsd, newBtcUsd, newLinkUsd, holdEthUsd, holdBtcUsd, holdLinkUsd, holdTotalUsd, simulatedTotalUsd)

    function simulateRebalance(
        Portfolio calldata portfolio,
        Rule calldata ethRule,
        Rule calldata btcRule,
        Rule calldata linkRule
    ) external view returns (
        uint256 newEthUsd,
        uint256 newBtcUsd,
        uint256 newLinkUsd,
        uint256 hodlEthUsd,
        uint256 hodlBtcUsd,
        uint256 hodlLinkUsd,
        uint256 hodlUsdValue, 
        uint256 simulatedUsdValue
        ) {
        
        // calculate dollar value of each token amount after stop-loss
        newEthUsd = _applyRule(portfolio.ethAmount, ethRule, ethUsdFeed.getPrice());
        newBtcUsd = _applyRule(portfolio.btcAmount, btcRule, btcUsdFeed.getPrice()); 
        newLinkUsd = _applyRule(portfolio.linkAmount, linkRule, linkUsdFeed.getPrice());

        // calculate HODL value
        hodlEthUsd = (portfolio.ethAmount * ethUsdFeed.getPrice()) / 1e18;
        hodlBtcUsd = (portfolio.btcAmount * btcUsdFeed.getPrice()) / 1e18;
        hodlLinkUsd = (portfolio.linkAmount * linkUsdFeed.getPrice()) / 1e18;
        
        // totals
        hodlUsdValue = hodlEthUsd + hodlBtcUsd + hodlLinkUsd;
        simulatedUsdValue = newEthUsd + newBtcUsd + newLinkUsd;
    }


    // helper
    function _applyRule(uint256 tokenAmount, Rule memory rule, uint256 currentPrice) internal pure returns (uint256) {
        if (rule.entryPrice == 0) return (tokenAmount * currentPrice) / 1e18;

        uint256 thresholdPrice = (rule.entryPrice * (100 - rule.thresholdPercentDrop)) / 100;

        if (currentPrice <= thresholdPrice) {
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
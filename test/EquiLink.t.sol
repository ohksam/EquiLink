// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "forge-std/Test.sol";
import {EquiLink} from "../src/EquiLink.sol";
import {PriceConverter} from "../src/PriceConverter.sol";
import {MockV3Aggregator} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/tests/MockV3Aggregator.sol";

contract EquiLinkTest is Test {
    using PriceConverter for address;

    EquiLink public equiLink;

    MockV3Aggregator public mockEthFeed;
    MockV3Aggregator public mockBtcFeed;
    MockV3Aggregator public mockLinkFeed;

    uint8 public constant FEED_DECIMALS = 8;

    EquiLink.Portfolio public portfolio;
    EquiLink.Rule public emptyRule;

    function setUp() public {
        // Deploy mock feeds with 8 decimals (matching Chainlink)
        mockEthFeed = new MockV3Aggregator(FEED_DECIMALS, 2000e8);
        mockBtcFeed = new MockV3Aggregator(FEED_DECIMALS, 40000e8);
        mockLinkFeed = new MockV3Aggregator(FEED_DECIMALS, 10e8);

        // Deploy contract with mock feed addresses
        equiLink = new EquiLink(
            address(mockEthFeed),
            address(mockBtcFeed),
            address(mockLinkFeed)
        );

        // Initialize default portfolio and rules
        portfolio = EquiLink.Portfolio({
            ethAmount: 1 ether,
            btcAmount: 1 ether,
            linkAmount: 1 ether
        });

        emptyRule = EquiLink.Rule({
            entryPrice: 0,
            thresholdPercentDrop: 0,
            percentToSell: 0
        });
    }

// ******SHORTEN YOUR TEST NAMES*******
    // 1. Test for EquiLink constructor
    // Not crucial tbh. Just making sure addresses match.

    function test_ConstructorSetsFeeds() public {
        assertEq(equiLink.ethUsdFeed(), address(mockEthFeed));
        assertEq(equiLink.btcUsdFeed(), address(mockBtcFeed));
        assertEq(equiLink.linkUsdFeed(), address(mockLinkFeed));
    }

    // 2. Tests for PriceConverter interactions

    // decimal-place check
    function test_GetPriceNormalizesTo18Decimals() public {
        uint256 price = PriceConverter.getPrice(address(mockEthFeed));
        assertEq(price, 2000e18);
    }

    // safety check
    function test_RevertIfPriceZero() public {
        mockEthFeed.updateAnswer(0);
        vm.expectRevert("Invalid price");
        PriceConverter.getPrice(address(mockEthFeed));
    }

    // price freshness check
    function test_RevertIfStalePrice() public {
        // Data params (roundId, answer, startedAt, updatedAt)
        mockEthFeed.updateRoundData(
            1,
            2000e8,
            block.timestamp - 2 hours,
            block.timestamp - 2 hours
        );
        vm.expectRevert("Stale price");
        PriceConverter.getPrice(address(mockEthFeed));
    }

    // 3. Tests for simulateRebalance function

    // Just making sure that our values don't magically change when going in/out of rebalance without any rules
    function test_SimulateWithoutRules() public {
        (uint256 original, uint256 simulated) = equiLink.simulateRebalance(portfolio, emptyRule, emptyRule, emptyRule);
        assertEq(original, simulated);
    }

    // testing rebalance trigger on drop
    function test_RebalanceTriggersPastThreshold() public {
        // drop ETH from 2000 to 1500 (25% drop)
        mockEthFeed.updateAnswer(1500e8);

        // trigger transfer at >= 20% drop
        EquiLink.Rule memory ethRule = EquiLink.Rule({
            entryPrice: 2000e18,
            thresholdPercentDrop: 20,
            percentToSell: 50
        });

        (uint256 original, uint256 simulated) = equiLink.simulateRebalance(portfolio, ethRule, emptyRule, emptyRule);

        // simulated value should be higher as it mitigated losses
        assertGt(simulated, original);
    }

    // testing *no* trigger on drop
    function test_RebalanceDoesNotTrigger() public {
        // drop ETH from 2000 to 1900 (5%)
        mockEthFeed.updateAnswer(1900e8);

        EquiLink.Rule memory ethRule = EquiLink.Rule({
            entryPrice: 2000e18,
            thresholdPercentDrop: 20,
            percentToSell: 50
        });

        (uint256 original, uint256 simulated) = equiLink.simulateRebalance(portfolio, ethRule, emptyRule, emptyRule);

        // nothing should change since the transfer threshold is not hit
        assertEq(simulated, original);
    }

    // testing trigger on exact % drop
    function test_RebalanceTriggersEqualToThreshold() public {
        // exactly 10% drop from 10
        mockLinkFeed.updateAnswer(9e8); 
        EquiLink.Rule memory linkRule = EquiLink.Rule(10e18, 10, 50);
        (uint256 original, uint256 simulated) = equiLink.simulateRebalance(portfolio, emptyRule, emptyRule, linkRule);
        assertGt(simulated, original);
    }

    // 4. Multi-asset aggregation
    // Honestly, not super necessary. Similar to first test in #3 but also checking addition accuracy/preservation.
    function test_ValueAggregation() public {
        (uint256 original, uint256 simulated) = equiLink.simulateRebalance(portfolio, emptyRule, emptyRule, emptyRule);
        assertEq(original, simulated);

        uint256 expected = ((1 ether * 2000e18) / 1e18) +
            ((1 ether * 40000e18) / 1e18) +
            ((1 ether * 10e18) / 1e18);

        assertEq(original, expected);
    }

    // 5. Mixed rule test
    // testing that rebalances are triggered with varying conditions
    function test_MixedRulesPartialTriggers() public {
        mockEthFeed.updateAnswer(1500e8); // YES DROP (25% drop, 20% threshold)
        mockBtcFeed.updateAnswer(38000e8); // NO DROP (5% drop, 10% threshold)
        mockLinkFeed.updateAnswer(9e8); // YES DROP (10% drop, 10% threshold)

        EquiLink.Rule memory ethRule = EquiLink.Rule(2000e18, 20, 50);
        EquiLink.Rule memory btcRule = EquiLink.Rule(40000e18, 10, 50);
        EquiLink.Rule memory linkRule = EquiLink.Rule(10e18, 10, 50);

        (uint256 original, uint256 simulated) = equiLink.simulateRebalance(portfolio, ethRule, btcRule, linkRule);

        assertGt(simulated, original);
    }
}

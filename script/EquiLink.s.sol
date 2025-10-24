// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {EquiLink} from "../src/EquiLink.sol";
import "forge-std/console.sol";

contract DeployEquiLink is Script {
    // Sepolia addresses
    address constant ETH_USD_FEED = 0x694AA1769357215DE4FAC081bf1f309aDC325306;
    address constant BTC_USD_FEED = 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43;
    address constant LINK_USD_FEED = 0xc59E3633BAAC79493d908e63626716e204A45EdF;

    
    function run() external {
        vm.startBroadcast();

        EquiLink equilink = new EquiLink(ETH_USD_FEED, BTC_USD_FEED, LINK_USD_FEED);

        vm.stopBroadcast();

        console.log("Deployed EquiLink at:", address(equilink));
        console.log("ETH/USD Feed:", ETH_USD_FEED);
        console.log("BTC/USD Feed:", BTC_USD_FEED);
        console.log("LINK/USD Feed:", LINK_USD_FEED);
    }
}

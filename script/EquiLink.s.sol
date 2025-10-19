// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {EquiLink} from "../src/EquiLink.sol";
import "forge-std/console.sol";

contract DeployEquiLink is Script {
    address constant ETH_USD_FEED = 0x694AA1769357215DE4FAC081bf1f309aDC325306; // Sepolia
    address constant BTC_USD_FEED = 0x5741306c21795FdCBb9b265Ea0255F499DFe515C; // Sepolia
    address constant LINK_USD_FEED = 0xd9FFdb71EbE7496cC440152d43986Aae0AB76665; // Sepolia
    
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

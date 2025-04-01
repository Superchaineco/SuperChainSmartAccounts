// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {SuperChainBadges} from "../../src/SuperChainBadges/SuperChainBadgesV2.sol";

contract UpgradeBadges is Script {

    function run() external {
        vm.startBroadcast();
        SuperChainBadges newBadges = new SuperChainBadges();
        vm.stopBroadcast();
        address proxyAddress = vm.envAddress("PROXY_ADDRESS");
        upgradeBadges(proxyAddress, address(newBadges));
    }

    function upgradeBadges(
        address proxyAddress,
        address newBadges
    ) public returns (address) {
        vm.startBroadcast();
        SuperChainBadges badgesProxy = SuperChainBadges(proxyAddress);
        badgesProxy.upgradeToAndCall(address(newBadges), "");
        vm.stopBroadcast();

        return address(badgesProxy);
    }
}

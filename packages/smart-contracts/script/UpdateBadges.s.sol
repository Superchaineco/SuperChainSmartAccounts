// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import {Script, console} from "forge-std/Script.sol";
import "./JSONReader.s.sol";
import {SuperChainBadges, BadgeMetadata, BadgeTierMetadata} from "../src/SuperChainBadges.sol";

contract UpdateBadges is Script {
    function setUp() public {}

    function run() public returns (address) {
        address badgesProxy = vm.envAddress("BADGES_ADDRESS");
        JSONReader jsonReader = new JSONReader();
        (JSON memory badgesJson, uint256 tierCount) = jsonReader.run();

        vm.startBroadcast();

        for (uint256 i = 0; i < badgesJson.badges.length; i++) {
            SuperChainBadges(badgesProxy).setBadgeMetadata(
                badgesJson.badges[i].id,
                badgesJson.badges[i].URI
            );
        }

        for (uint256 i = 0; i < badgesJson.badges.length; i++) {
            for (uint256 j = 0; j < badgesJson.badges[i].levels.length; j++) {
                SuperChainBadges(badgesProxy).setBadgeTier(
                    badgesJson.badges[i].id,
                    j + 1,
                    badgesJson.badges[i].levels[j].URI,
                    badgesJson.badges[i].levels[j].points
                );
            }
        }

        vm.stopBroadcast();
    }
}

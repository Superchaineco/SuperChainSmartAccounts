// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import {Script, console} from "forge-std/Script.sol";
import "./JSONReader.s.sol";
import {SuperChainBadges, BadgeMetadata, BadgeTierMetadata} from "../src/SuperChainBadges/SuperChainBadgesV2.sol";

contract UpdateBadges is Script {
    function setUp() public {}

    function run() public returns (address) {
        address badgesProxy = vm.envAddress("BADGES_ADDRESS");
        JSONReader jsonReader = new JSONReader();
        (JSON memory badgesJson, uint256 tierCount) = jsonReader.run();

        vm.startBroadcast();

        for (uint256 i = 0; i < badgesJson.badges.length; i++) {
            string memory currentURI = SuperChainBadges(badgesProxy).getGeneralBadgeURI(badgesJson.badges[i].id);
            if (bytes(currentURI).length == 0) {
                SuperChainBadges(badgesProxy).setBadgeMetadata(
                    badgesJson.badges[i].id,
                    badgesJson.badges[i].URI
                );
            } else {
                SuperChainBadges(badgesProxy).updateBadgeMetadata(
                    badgesJson.badges[i].id,
                    badgesJson.badges[i].URI
                );
            }
        }

        for (uint256 i = 0; i < badgesJson.badges.length; i++) {
            for (uint256 j = 0; j < badgesJson.badges[i].levels.length; j++) {
                uint256 tier = j + 1;
                uint256 highestTier = SuperChainBadges(badgesProxy).getHighestBadgeTier(badgesJson.badges[i].id);
                if (tier > highestTier) {
                    SuperChainBadges(badgesProxy).setBadgeTier(
                        badgesJson.badges[i].id,
                        tier,
                        badgesJson.badges[i].levels[j].URI,
                        badgesJson.badges[i].levels[j].points
                    );
                } else {
                    SuperChainBadges(badgesProxy).updateBadgeTierMetadata(
                        badgesJson.badges[i].id,
                        tier,
                        badgesJson.badges[i].levels[j].URI
                    );
                }
            }
        }

        vm.stopBroadcast();
    }
}

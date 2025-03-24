// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import {Script, console} from "forge-std/Script.sol";
import {SuperChainModuleUpgradeable} from "../src/SuperChainModuleUpgradeable.sol";
import {SuperChainResolver} from "../src/SuperChainResolver.sol";
import {IEAS} from "eas-contracts/IEAS.sol";
import "./DeployJSONReader.s.sol";
import {SuperChainBadges, BadgeMetadata, BadgeTierMetadata} from "../src/SuperChainBadges.sol";

contract PostDeployBadges is Script {
    function setUp() public {}

    function run() public  returns (address){
        string memory network = vm.envString("NETWORK");
        address badgesProxy = vm.envAddress("BADGES_ADDRESS");
        address easAddress;
        JSONReader jsonReader = new JSONReader();
        (JSON memory badgesJson, uint256 tierCount) = jsonReader.run();
        BadgeMetadata[] memory badges = new BadgeMetadata[](
            badgesJson.badges.length
        );
        BadgeTierMetadata[] memory badgeTiers = new BadgeTierMetadata[](
            tierCount
        );
        for (uint256 i = 0; i < badgesJson.badges.length; i++) {
            badges[i] = BadgeMetadata({
                badgeId: i + 1,
                generalURI: badgesJson.badges[i].URI
            });
        }
        uint256 tierIndex = 0;
        for (uint256 i = 0; i < badgesJson.badges.length; i++) {
            for (uint256 j = 0; j < badgesJson.badges[i].levels.length; j++) {
                badgeTiers[tierIndex] = BadgeTierMetadata({
                    badgeId: i + 1,
                    tier: j + 1,
                    newURI: badgesJson.badges[i].levels[j].URI,
                    points: badgesJson.badges[i].levels[j].points
                });
                tierIndex++;
            }
        }
        if (keccak256(bytes(network)) == keccak256("sepolia")) {
            easAddress = vm.envAddress("EAS_ADDRESS_SEPOLIA");
        } else if (keccak256(bytes(network)) == keccak256("optimism")) {
            easAddress = vm.envAddress("EAS_ADDRESS_OPTIMISM");
        } else {
            revert("Unsupported network");
        }
        require(
            easAddress != address(0),
            "EAS address is not set for this network"
        );
        vm.startBroadcast();

        SuperChainBadges(badgesProxy).setBadgesAndTiers(badges, badgeTiers);

        SuperChainResolver resolver = new SuperChainResolver(
            IEAS(easAddress),
            msg.sender,
            SuperChainBadges(badgesProxy),
            msg.sender
        );

        SuperChainBadges(badgesProxy).setResolver(address(resolver));
        vm.stopBroadcast();
        return address(resolver);

    }

 
}

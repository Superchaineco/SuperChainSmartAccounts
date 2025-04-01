import {Script, console} from "forge-std/Script.sol";
import {DeployBadges} from "./DeployBadges.s.sol";
import {DeployModule} from "./DeployModule.s.sol";
import {SuperChainBadges, BadgeMetadata, BadgeTierMetadata} from "../src/SuperChainBadges/SuperChainBadges.sol";
import {SuperChainModuleUpgradeable} from "../src/SuperChainModuleUpgradeable.sol";
import {SuperChainResolver} from "../src/SuperChainResolver.sol";
import {JSONReader, JSON} from "./JSONReader.s.sol";

contract E2EDeployment is Script {
    DeployBadges badgesDeployment;
    DeployModule moduleDeployment;
    function setUp() public {
        badgesDeployment = new DeployBadges();
        moduleDeployment = new DeployModule();
    }

    function run() public returns (address) {
        console.log("Sender: ", msg.sender);
        address sender = 0x8835669696Fb92839aB198cD80ce9f0d35F45aD5;
        (address badgesProxy, address resolver) = badgesDeployment.run(sender);
        address moduleProxy = moduleDeployment.run(resolver, sender);
        vm.startBroadcast();
        setBadgesAndTiers(badgesProxy, resolver);
        setupModule(resolver, moduleProxy);
        console.log("End of deployment");
        vm.stopBroadcast();
    }

    function setupModule(address resolver, address moduleProxy) public {
        SuperChainResolver(payable(resolver)).updateSuperChainAccountsManager(
            SuperChainModuleUpgradeable(moduleProxy)
        );

        SuperChainModuleUpgradeable module = SuperChainModuleUpgradeable(
            moduleProxy
        );
        uint256[] memory tresholds = new uint256[](10);
        tresholds[0] = 50;
        tresholds[1] = 150;
        tresholds[2] = 400;
        tresholds[3] = 750;
        tresholds[4] = 1250;
        tresholds[5] = 2000;
        tresholds[6] = 3250;
        tresholds[7] = 5000;
        tresholds[8] = 7000;
        tresholds[9] = 10000;
        module.addTiersTreshold(tresholds);
    }

    function setBadgesAndTiers(address proxyAddress, address resolver) public {
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
                badgeId: badgesJson.badges[i].id,
                generalURI: badgesJson.badges[i].URI
            });
        }
        uint256 tierIndex = 0;
        for (uint256 i = 0; i < badgesJson.badges.length; i++) {
            for (uint256 j = 0; j < badgesJson.badges[i].levels.length; j++) {
                badgeTiers[tierIndex] = BadgeTierMetadata({
                    badgeId: badgesJson.badges[i].id,
                    tier: j + 1,
                    newURI: badgesJson.badges[i].levels[j].URI,
                    points: badgesJson.badges[i].levels[j].points
                });
                tierIndex++;
            }
        }

        SuperChainBadges(proxyAddress).setBadgesAndTiers(badges, badgeTiers);
        SuperChainBadges(proxyAddress).setResolver(address(resolver));
    }
}

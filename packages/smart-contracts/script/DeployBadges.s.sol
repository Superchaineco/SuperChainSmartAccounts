import {SuperChainBadges, BadgeMetadata, BadgeTierMetadata} from "../src/SuperChainBadges.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import {Script, console} from "forge-std/Script.sol";
import {DeployResolver} from "./DeployResolver.s.sol";
import {JSONReader, JSON} from "./DeployJSONReader.s.sol";

contract DeployBadges is Script {
    address proxyAddress;
    function setUp() public {}

    function run() public returns (address, address) {
        proxyAddress = deployBadges();
        address resolver = new DeployResolver().run(proxyAddress);
        setBadgesAndTiers(resolver);
        console.log("Badges proxy deployed at", proxyAddress);
        console.log("Resolver deployed at", resolver);
        return (proxyAddress, resolver);
    }

    function deployBadges() public returns (address) {
        vm.startBroadcast();
        SuperChainBadges badges = new SuperChainBadges();
        ERC1967Proxy proxy = new ERC1967Proxy(
            address(badges),
            abi.encodeCall(SuperChainBadges.initialize, msg.sender)
        );
        vm.stopBroadcast();
        return address(proxy);
    }

    function setBadgesAndTiers(address resolver) public {
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
        vm.startBroadcast();

        SuperChainBadges(proxyAddress).setBadgesAndTiers(badges, badgeTiers);
        SuperChainBadges(proxyAddress).setResolver(address(resolver));
        vm.stopBroadcast();
    }
}

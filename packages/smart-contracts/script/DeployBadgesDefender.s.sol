import "./JSONReader.s.sol";
import {Defender, ApprovalProcessResponse} from "openzeppelin-foundry-upgrades/Defender.sol";
import {Upgrades, Options} from "openzeppelin-foundry-upgrades/Upgrades.sol";
import {SuperChainBadges, BadgeMetadata, BadgeTierMetadata} from "../src/SuperChainBadges.sol";
import {Script, console} from "forge-std/Script.sol";

contract DeployBadges is Script {
    function setUp() public {}

    function run() public returns (address) {
        ApprovalProcessResponse memory upgradeApprovalProcess = Defender
            .getUpgradeApprovalProcess();
        if (upgradeApprovalProcess.via == address(0)) {
            revert(
                string.concat(
                    "Upgrade approval process with id ",
                    upgradeApprovalProcess.approvalProcessId,
                    " has no assigned address"
                )
            );
        }
        Options memory opts;
        opts.defender.useDefenderDeploy = true;

        address badgesProxy = Upgrades.deployUUPSProxy(
            "SuperChainBadges.sol",
            abi.encodeCall(SuperChainBadges.initialize, msg.sender),
            opts
        );
        console.log("Badges proxy", badgesProxy);

        return badgesProxy;
    }
}

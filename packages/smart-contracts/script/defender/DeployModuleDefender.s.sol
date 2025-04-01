// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Defender, ApprovalProcessResponse} from "openzeppelin-foundry-upgrades/Defender.sol";
import {Upgrades, Options} from "openzeppelin-foundry-upgrades/Upgrades.sol";
import {Script, console} from "forge-std/Script.sol";
import {SuperChainModuleUpgradeable} from "../../src/SuperChainModuleUpgradeable.sol";

contract DeployModule is Script {
    function setUp() public {}

    function run() public returns (address) {
        address resolver = vm.envAddress("RESOLVER_ADDRESS");
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

        address moduleProxy = Upgrades.deployUUPSProxy(
            "SuperChainModuleUpgradeable.sol",
            abi.encodeCall(
                SuperChainModuleUpgradeable.initialize,
                (resolver, msg.sender)
            ),
            opts
        );

        console.log("Module proxy", moduleProxy);
        return moduleProxy;
    }
}

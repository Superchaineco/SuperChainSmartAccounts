// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Defender, ApprovalProcessResponse} from "openzeppelin-foundry-upgrades/Defender.sol";
import {Upgrades, Options} from "openzeppelin-foundry-upgrades/Upgrades.sol";
import {Script, console} from "forge-std/Script.sol";
import {SuperChainModuleUpgradeable} from "../src/SuperChainModuleUpgradeable.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import {SuperChainResolver} from "../src/SuperChainResolver.sol";

contract DeployModule is Script {
    function setUp() public {}

    function run(address resolver, address owner) public returns (address) {
        vm.startBroadcast();
        address moduleProxy = deployModule(resolver, owner);
        console.log("SuperChainModule deployed at", moduleProxy);
        vm.stopBroadcast();
        return moduleProxy;
    }

    function deployModule(address resolver, address owner) public returns (address) {
        SuperChainModuleUpgradeable module = new SuperChainModuleUpgradeable();
        ERC1967Proxy proxy = new ERC1967Proxy(address(module), abi.encodeCall(SuperChainModuleUpgradeable.initialize, (resolver, owner)));
        return address(proxy);
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
}

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

    function run(address resolver) public returns (address) {
        address moduleProxy = deployModule(resolver);
        console.log("SuperChainModule deployed at", moduleProxy);
        setupModule(resolver, moduleProxy);
        return moduleProxy;
    }

    function deployModule(address resolver) public returns (address) {
        vm.startBroadcast();
        SuperChainModuleUpgradeable module = new SuperChainModuleUpgradeable();
        ERC1967Proxy proxy = new ERC1967Proxy(address(module), abi.encodeCall(SuperChainModuleUpgradeable.initialize, (resolver, msg.sender)));
        vm.stopBroadcast();
        return address(proxy);
    }

    function setupModule(address resolver, address moduleProxy) public {
        vm.startBroadcast();
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
        vm.stopBroadcast();
    }
}

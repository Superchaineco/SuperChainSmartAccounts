// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";

import {SuperChainModuleUpgradeable} from "../../src/SuperChainModuleUpgradeable.sol";

import {ProposeUpgradeResponse, Defender, Options} from "openzeppelin-foundry-upgrades/Defender.sol";

contract Upgrade is Script {
    function setUp() public {}

    function run() public {
        address proxy = vm.envAddress("PROXY_ADDRESS");
        Options memory opts;
        ProposeUpgradeResponse memory response = Defender.proposeUpgrade(
            proxy,
            "SuperChainModuleUpgradeable.sol",
            opts
        );
        console.log("Proposal id", response.proposalId);
        console.log("Url", response.url);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {SuperChainResolver} from "../../src/SuperChainResolver.sol";
import {SuperChainModuleUpgradeable} from "../../src/SuperChainModuleUpgradeable.sol";
import {Script, console} from "forge-std/Script.sol";
import {SuperChainBadges} from "../../src/SuperChainBadges/SuperChainBadges.sol";

contract PostDeployModule is Script {
    function setUp() public {}

    function run() public {
        address resolver = vm.envAddress("RESOLVER_ADDRESS");
        address badgesProxy = vm.envAddress("BADGES_ADDRESS");
        address moduleProxy = vm.envAddress("MODULE_ADDRESS");
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


        logs(badgesProxy, moduleProxy, resolver );
    }

       function logs(
        address badgesProxy,
        address moduleProxy,
        address resolver
    ) public {
        string memory badgesConstructorArgs = vm.toString(
            abi.encodeCall(SuperChainBadges.initialize, msg.sender)
        );
        string memory moduleProxyAddress = vm.toString(moduleProxy);
        string memory badgesProxyAddress = vm.toString(badgesProxy);
        string memory moduleConstructorArgs = vm.toString(
            abi.encodeCall(
                SuperChainModuleUpgradeable.initialize,
                (resolver, msg.sender)
            )
        );

        string memory filePath = "deploy_data_upgradeable.txt";
        vm.writeFile(
            filePath,
            string.concat(
                "Proxy Address: ",
                moduleProxyAddress,
                "\n",
                "Constructor Args: ",
                moduleConstructorArgs,
                "\n",
                "Badges Proxy Address: ",
                badgesProxyAddress,
                "\n",
                "Badges Constructor Args: ",
                badgesConstructorArgs
            )
        );

        console.log("Deployed moduleProxy to address", moduleProxy);
        console.log("Deployed badgesProxy to address", badgesProxy);
        console.logString(
            string.concat(
                "\n",
                "SuperChainResolver deployed at: ",
                vm.toString(resolver)
            )
        );
    }
}

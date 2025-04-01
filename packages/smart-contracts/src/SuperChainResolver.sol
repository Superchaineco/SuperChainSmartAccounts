// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {SchemaResolver} from "eas-contracts/resolver/SchemaResolver.sol";
import {IEAS, Attestation} from "eas-contracts/IEAS.sol";
import {SuperChainModuleUpgradeable} from "./SuperChainModuleUpgradeable.sol";
import {SuperChainBadges, BadgeUpdate} from "./SuperChainBadges/SuperChainBadges.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract SuperChainResolver is SchemaResolver, Ownable {
    SuperChainModuleUpgradeable public superChainModule;
    SuperChainBadges public superChainBadges;
    address public attestator;

    constructor(
        IEAS eas,
        address _attestator,
        SuperChainBadges _superChainBadges,
        address owner
    ) Ownable(owner) SchemaResolver(eas) {
        attestator = _attestator;
        superChainBadges = _superChainBadges;
    }

    // This might be onlyOwner
    function updateSuperChainAccountsManager(
        SuperChainModuleUpgradeable _superChainModule
    ) public onlyOwner {
        superChainModule = _superChainModule;
    }

    function updateAttestator(address _attestator) public onlyOwner {
        attestator = _attestator;
    }

    function updateSuperChainBadges(
        SuperChainBadges _superChainBadges
    ) public onlyOwner {
        superChainBadges = _superChainBadges;
    }

    function onAttest(
        Attestation calldata attestation,
        uint256 /*value*/
    ) internal override returns (bool) {
        if (attestation.attester != attestator) {
            return false;
        }
        BadgeUpdate[] memory badgeUpdates = abi.decode(
            attestation.data,
            (BadgeUpdate[])
        );
        uint256 points = superChainBadges.updateOrMintBadges(
            attestation.recipient,
            badgeUpdates
        );

        superChainModule.incrementSuperChainPoints(
            points,
            attestation.recipient
        );
        return true;
    }

    function onRevoke(
        Attestation calldata,
        /*attestation*/ uint256 /*value*/
    ) internal pure override returns (bool) {
        return true;
    }
}

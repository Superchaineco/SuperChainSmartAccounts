import {Script, console} from "forge-std/Script.sol";
import {SuperChainResolver} from "../src/SuperChainResolver.sol";
import {SuperChainBadges} from "../src/SuperChainBadges/SuperChainBadges.sol";
import {IEAS} from "eas-contracts/IEAS.sol";

contract DeployResolver is Script {
    function run(address badgesProxy, address owner) public returns (address) {
        address easAddress = 0x4200000000000000000000000000000000000021;
        SuperChainResolver resolver = new SuperChainResolver(
            IEAS(easAddress),
            owner,
            SuperChainBadges(badgesProxy),
            owner
        );
        console.log("Resolver deployed at", address(resolver));
        return address(resolver);
    }
}

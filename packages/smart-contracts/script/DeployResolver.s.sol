import {Script, console} from "forge-std/Script.sol";
import {SuperChainResolver} from "../src/SuperChainResolver.sol";
import {SuperChainBadges} from "../src/SuperChainBadges.sol";
import {IEAS} from "eas-contracts/IEAS.sol";

contract DeployResolver is Script {
    address easAddress;
    function setUp() public {
        easAddress = vm.envAddress("EAS_ADDRESS_OPTIMISM");
    }

    function run(address badgesProxy) public returns (address) {
        SuperChainResolver resolver = new SuperChainResolver(
            IEAS(easAddress),
            msg.sender,
            SuperChainBadges(badgesProxy),
            msg.sender
        );
        console.log("Resolver deployed at", address(resolver));
        return address(resolver);
    }
}

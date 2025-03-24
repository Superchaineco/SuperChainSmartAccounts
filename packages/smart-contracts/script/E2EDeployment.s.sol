import {Script, console} from "forge-std/Script.sol";
import {DeployBadges} from "./DeployBadges.s.sol";
import {DeployModule} from "./DeployModule.s.sol";

contract E2EDeployment is Script {
    DeployBadges badgesDeployment;
    DeployModule moduleDeployment;
    function setUp() public {
        badgesDeployment = new DeployBadges();
        moduleDeployment = new DeployModule();
    }

    function run() public returns (address) {
        (address badgesProxy, address resolver) = badgesDeployment.run();
        address moduleProxy = moduleDeployment.run(resolver);
        console.log("End of deployment");
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

struct BadgeTier {
    string image2D;
    string image3D;
    string URI;
    uint256 minValue;
    uint256 points;
}

struct Badge {
    string URI;
    string chain;
    string condition;
    string description;
    BadgeTier[] levels;
    string name;
    string platform;
}

struct JSON {
    Badge[] badges;
}

contract JSONReader is Script {
    function setUp() public {}

    function run() public  view returns (JSON memory, uint256) {
        string memory json = vm.readFile("badges.json");
        bytes memory data = vm.parseJson(json);
        JSON memory badgesJson = abi.decode(data, (JSON));
        uint256 tierCount = 0;

        for (uint256 i = 0; i < badgesJson.badges.length; i++) {
            // console.log("Badge Name:", badgesJson.badges[i].name);
            // console.log("Badge Description:", badgesJson.badges[i].description);
            // console.log("Badge Platform:", badgesJson.badges[i].platform);
            // console.log("Badge Chain:", badgesJson.badges[i].chain);
            // console.log("Badge Condition:", badgesJson.badges[i].condition);
            // console.log("Badge URI:", badgesJson.badges[i].URI);
            for (uint256 j = 0; j < badgesJson.badges[i].levels.length; j++) {
                tierCount++;
                // console.log("Badge 2D Image:", badgesJson.badges[i].levels[j].image2D);
                // console.log("Badge 3D Image:", badgesJson.badges[i].levels[j].image3D);
                // console.log("Badge Min Value:", badgesJson.badges[i].levels[j].minValue);
                // console.log("Badge Points:", badgesJson.badges[i].levels[j].points);
                // console.log("Badge URI:", badgesJson.badges[i].levels[j].URI);
            }
        }

        return (badgesJson, tierCount);

    }
}

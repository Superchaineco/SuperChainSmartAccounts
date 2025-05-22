# DPG-Accounts
DPG Accounts is an open-source solution by Kolektivo Labs built on Safe{Core} Protocol that creates native accounts for EVM-compatable Blockchain ecosystems and dApps to engage active users and reward meaningful participation. 

Updating badges metadata
1. In utils run npm run pin-file (Need to param in .env the pinata api key)
2. Copy de hash to generateMetadata.js
3. npm run generate-uri
4. Then go to smart-contracts tun forge compile
5. Copy the badges-with-uris.json to smart-contracts folder and/or change the badges.json depending the use
6. Use the UpdatesBadges (for all badges) or DeployNewBadges (for new badges or single badge updating)
7. e.g for SA: BADGES_ADDRESS=0x03e2c563cf77e3Cdc0b7663cEE117dA14ea60848 forge script script/DeployNewBadges.s.sol --rpc-url optimism --account <ACCOUNT> --broadcast
8. e.g. for BADGE_ADDRESS=0xd47C56513E640E394024FaCBBe5032cf604Bb699 forge script script/UpdateBadges.s.sol --rpc-url celo --account <ACCOUNT> --broadcast
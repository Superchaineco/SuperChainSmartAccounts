# DPG-Accounts
DPG Accounts is an open-source solution by Kolektivo Labs built on Safe{Core} Protocol that creates native accounts for EVM-compatable Blockchain ecosystems and dApps to engage active users and reward meaningful participation. 

Updating badges metadata
1. npm run pin-file (Need to param in .env the pinata api key)
2. npm run generate-uri
3. forge compile
4. Copy the badges-with-uris.json to smart-contracts folder and/or change the badges.json depending the use
5. Use the UpdatesBadges (for all badges) or DeployNewBadges (for new badges or single badge updating)
6. e.g: BADGES_ADDRESS=0x03e2c563cf77e3Cdc0b7663cEE117dA14ea60848 forge script script/DeployNewBadges.s.sol --rpc-url optimism --account <ACCOUNT> --broadcast
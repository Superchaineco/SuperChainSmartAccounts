# DPG-Accounts
DPG Accounts is an open-source solution by Kolektivo Labs built on Safe{Core} Protocol that creates native accounts for EVM-compatable Blockchain ecosystems and dApps to engage active users and reward meaningful participation. 

Updating badges metadata
1. In utils/badges-metadata modify the badges.json and run 'npm run pin-file' (Need to param in .env the pinata api key)
2. Copy de hash to utils/badges-metadata/src/generate-uris.js
3. npm run generate-uris
4. Then go to smart-contracts run 'forge compile'
5. Copy the badges-with-uris.json to smart-contracts folder and/or change the badges.json depending the use (badges.sjon for some badges update or add and the other for full update)
6. Use the UpdatesBadges (for all badges) or DeployNewBadges (for new badges or single badge updating)
e.g for SA: BADGES_ADDRESS=0x03e2c563cf77e3Cdc0b7663cEE117dA14ea60848 forge script script/DeployNewBadges.s.sol --rpc-url optimism --account <ACCOUNT> --broadcast

Account is the keystore file
SA Staging
BADGES_ADDRESS=0xbC24012488BFCFe44875a139299595879c43C2CD forge script script/DeployNewBadges.s.sol --rpc-url optimism --account pp-pk --broadcast
SA prod
BADGES_ADDRESS=0x03e2c563cf77e3Cdc0b7663cEE117dA14ea60848 forge script script/DeployNewBadges.s.sol --rpc-url optimism --account pp-pk --broadcast
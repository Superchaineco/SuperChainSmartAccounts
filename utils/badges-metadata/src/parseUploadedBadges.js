import fs from 'fs';

const BADGES_FILE_PATH = './badges.json';
const OUTPUT_FOLDER = './data/super-chain-badges-to-deploy';
const generateUri = (ipfsBaseHash, badgeId, tierId) => {
    // Format: ipfs/<ipfsBaseHash>/[64-char id][64-char tierId].json
    const badgeIdHex = badgeId.toString().padStart(64, '0');
    const tierIdHex = tierId.toString().padStart(64, '0');
    return `ipfs/${ipfsBaseHash}/${badgeIdHex}${tierIdHex}.json`;
  };

function parseUploadedBadges(ipfsHash) {
    const badgesData = JSON.parse(fs.readFileSync( BADGES_FILE_PATH, 'utf-8'));
    badgesData.badges.forEach((badge, badgeIndex) => {
        const badgeId = badgeIndex + 1;
      
        // Genera el URI para la badge (tierId es 0 para el badge en general)
        badge.URI = generateUri(ipfsHash, badgeId, 0);
      
        // Añade el URI para cada nivel (tier)
        badge.levels.forEach((level, levelIndex) => {
          const tierId = levelIndex + 1;
      
          // Genera el URI para cada nivel (tier) en la badge
          level.URI = generateUri(ipfsHash, badgeId, tierId);
        });
      });
      fs.writeFileSync(OUTPUT_FOLDER, JSON.stringify(badgesData, null, 2), 'utf-8');
}

parseUploadedBadges(process.argv[2])
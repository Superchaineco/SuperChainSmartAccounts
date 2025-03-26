import fs from 'fs';
import path from 'path';

const BADGES_FILE_PATH = './badges.json';
const OUTPUT_FILE = './badges-with-uris.json';
const IPFS_BASE_URI = 'ipfs/QmZwGU3UjbGffjYaMwhDGNGyWprejH2FpKWDxrgS7TzRKm';

function generateFileName(badgeId, levelId) {
  const paddedBadgeId = badgeId.toString().padStart(64, '0');
  const paddedLevelId = levelId.toString().padStart(64, '0');
  return `${paddedBadgeId.substring(0, 63 - paddedLevelId.length)}${paddedBadgeId}${paddedLevelId}.json`;
}



async function generateBadgesWithUris() {
  const badges = JSON.parse(fs.readFileSync(BADGES_FILE_PATH, 'utf8')).badges;
  const badgesWithUris = [];

  for (let i = 0; i < badges.length; i++) {
    const badgeId = i + 1;
    const badge = badges[i];
    
    const levels = badge.levels.map((level, index) => {
      const levelId = index + 1;
      const fileName = generateFileName(badgeId, levelId);
      
      return {
        minValue: level.minValue,
        points: level.points,
        URI: `${IPFS_BASE_URI}/${fileName}`
      };
    });

    const generalFileName = generateFileName(badgeId, 0);
    
    badgesWithUris.push({
      name: badge.name,
      description: badge.description,
      platform: badge.platform,
      levels: levels,
      condition: badge.condition,
      chains: badge.chains,
      id: badgeId,
      URI: `${IPFS_BASE_URI}/${generalFileName}`,
      image: badge.image,
      'stack-image': badge['stack-image'],
      season: badge.season
    });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ badges: badgesWithUris }, null, 2));
  console.log(`Generated ${OUTPUT_FILE} with ${badgesWithUris.length} badges`);
}

generateBadgesWithUris().catch(console.error); 
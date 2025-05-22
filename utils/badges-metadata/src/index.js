import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import rfs from 'recursive-fs';
import basePathConverter from 'base-path-converter';
import got from 'got';
import * as dotenv from 'dotenv';

dotenv.config();


const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;

const BADGES_FILE_PATH = './badges.json';
const OUTPUT_FOLDER = './data/super-chain-badges-v1.3';

async function uploadFolderToIPFS(folderPath) {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const src = folderPath;

  var status = 0;
  try {
    const { dirs, files } = await rfs.read(src);

    let data = new FormData();

    for (const file of files) {
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(src, file),
      });
    }

    const response = await got(url, {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_API_SECRET
      },
      body: data,
    }).on('uploadProgress', (progress) => {
      console.log(progress);
    });

    console.log(JSON.parse(response.body));
  } catch (error) {
    console.log(error);
  }
}

async function generateAndPinBadges() {
  if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER);
  }

  const badges = JSON.parse(fs.readFileSync(BADGES_FILE_PATH, 'utf8')).badges;

  for (let i = 0; i < badges.length; i++) {
    const badgeId = i + 1;
    const badge = badges[i];
    const paddedBadgeId = badgeId.toString().padStart(64, '0');

    const generalMetadata = {
      name: badge.name,
      description: badge.description,
      platform: badge.platform,
      chains: badge.chains,
      condition: badge.condition,
      image: badge.image,
      'stack-image': badge['stack-image'],
      season: badge.season,
    };

    const paddedLevelId = '0'.padStart(64, '0');
    const generalFileName = `${paddedBadgeId.substring(
      0,
      63 - paddedLevelId.length
    )}${paddedBadgeId}${paddedLevelId}.json`;

    fs.writeFileSync(
      path.join(OUTPUT_FOLDER, generalFileName),
      JSON.stringify(generalMetadata, null, 2)
    );

    for (let j = 0; j < badge.levels.length; j++) {
      const levelId = j + 1;
      const paddedLevelId = levelId.toString().padStart(64, '0');
      const levelMetadata = {
        badgeId: badgeId,
        level: levelId,
        minValue: badge.levels[j].minValue,
        points: badge.levels[j].points,
      };

      const levelFileName = `${paddedBadgeId.substring(
        0,
        63 - paddedLevelId.length
      )}${paddedBadgeId}${paddedLevelId}.json`;
      fs.writeFileSync(
        path.join(OUTPUT_FOLDER, levelFileName),
        JSON.stringify(levelMetadata, null, 2)
      );
    }
  }

  await uploadFolderToIPFS(OUTPUT_FOLDER);
}

generateAndPinBadges().catch(console.error);

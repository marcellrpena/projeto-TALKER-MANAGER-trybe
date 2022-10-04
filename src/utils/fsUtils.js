const fs = require('fs').promises;
const path = require('path');
const CryptoJS = require('crypto');

const PATH_NAMES = path.resolve(__dirname, '../talker.json');

const readAllTalkers = async () => {
  const request = await fs.readFile(PATH_NAMES);
  const data = await JSON.parse(request);
  return data;
};

const readIdTalker = async (id) => {
  const request = await fs.readFile(PATH_NAMES);
  const data = await JSON.parse(request);
  return data.find((e) => e.id === id);
};

const randomToken = () => CryptoJS.randomBytes(8).toString('hex');

module.exports = {
  readAllTalkers,
  readIdTalker,
  randomToken,
};
const fs = require('fs').promises;
const path = require('path');

const PATH_NAMES = path.resolve(__dirname, '../talker.json');

const readAllTalkers = async () => {
  const request = await fs.readFile(PATH_NAMES);
  const data = await JSON.parse(request);
  return data;
};

module.exports = {
  readAllTalkers,
};
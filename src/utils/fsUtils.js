const fs = require('fs').promises;
const path = require('path');

const PATH_NAMES = path.resolve(__dirname, '../talker.json');

const readAllTalkers = async () => {
  const request = await fs.readFile(PATH_NAMES);
  const data = await JSON.parse(request);
  return data;
};

const readIdTalker = async (id) => {
  const request = await fs.readFile(PATH_NAMES);
  const data = await JSON.parse(request);
  console.log(data.find((e) => e.id === id));
  return data.find((e) => e.id === id);
};

module.exports = {
  readAllTalkers,
  readIdTalker,
};
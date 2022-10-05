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

const writeTalker = async (talker) => {
  const talkers = await readAllTalkers();
  const id = talkers.length + 1;
  const newTalkers = [...talkers, { id, ...talker }];
  await fs.writeFile(PATH_NAMES, JSON.stringify(newTalkers));
  const data = { id, ...talker };
  return data;
};

const randomToken = () => CryptoJS.randomBytes(8).toString('hex');

module.exports = {
  readAllTalkers,
  readIdTalker,
  randomToken,
  writeTalker,
};
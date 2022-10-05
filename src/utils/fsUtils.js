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

const updateTalker = async (talker) => {
  const { id } = talker;
  const oldTalkers = await readAllTalkers();
  const filteredTalkers = oldTalkers.filter((e) => e.id !== id); 
  const newTalkers = [...filteredTalkers, talker];
  await fs.writeFile(PATH_NAMES, JSON.stringify(newTalkers));
};

const randomToken = () => CryptoJS.randomBytes(8).toString('hex');

const requiredTalk = (data) => {
  const watchedAt = 'watchedAt' in data.talk && data.talk.watchedAt.length !== 0;
  const rate = 'rate' in data.talk;
  if (!watchedAt) {
    return { status: true, message: 'O campo "watchedAt" é obrigatório' };
  }
  if (!rate) {
    return { status: true, message: 'O campo "rate" é obrigatório' };
  }
  return { status: false };
};

const correctData = (data) => {
  const validData = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/i;
  const watchedAt = validData.test(data.talk.watchedAt);
  const rate = data.talk.rate >= 1 && data.talk.rate <= 5;
  if (!watchedAt) {
    return { status: true, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  if (!rate) {
    return { status: true, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return { status: false };
};

module.exports = {
  readAllTalkers,
  readIdTalker,
  randomToken,
  writeTalker,
  correctData,
  requiredTalk,
  updateTalker,
};
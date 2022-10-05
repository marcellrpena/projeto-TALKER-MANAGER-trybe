// const { readAllTalkers } = require('../utils/fsUtils');

function validateName(req, res, next) {
  const required = 'name';
  const { name = [] } = req.body;
  const bodyTrue = required in req.body;
  const checkNameEmpty = name.length === 0;
  const checkNameLength = name.length >= 3;
  if (!bodyTrue && checkNameEmpty) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } else if (!checkNameLength) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else {
    next();
  }
}

function validateAge(req, res, next) {
  const required = 'age';
  const { age = [] } = req.body;
  const bodyTrue = required in req.body;
  const checkAgeEmpty = age.length === 0;
  const checkAgeLength = age >= 18;
  if (!bodyTrue && checkAgeEmpty) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } else if (!checkAgeLength) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } else {
    next();
  }
}

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

function validateTalk(req, res, next) {
  const data = { ...req.body };
  const checkTalkEmpty = 'talk' in req.body;
  if (!checkTalkEmpty) {
    res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  const required = requiredTalk(data);
  const correct = correctData(data);
  if (required.status) {
    res.status(400).json({ message: required.message });
  } else if (correct.status) {
    res.status(400).json({ message: correct.message });
  } else {
    next();
  }
}
/* function teste() {
  // const invalidTokens = [99999999, '99999999', undefined, '123456789012345'];
  const token = '123456789012345';
  const wrongLength = token.length === 16;
  const isNumber = Number.isNaN(Number(token));
  return isNumber && wrongLength;
}

console.log(teste()); */

function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  const wrongLength = authorization.length === 16;
  const isNumber = Number.isNaN(Number(authorization));
  if (isNumber && wrongLength) {
    next();
  } else {
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = {
  validateName,
  validateAge,
  validateTalk,
  validateToken,
};
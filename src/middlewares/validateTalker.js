const { correctData, requiredTalk } = require('../utils/fsUtils');

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
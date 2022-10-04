const { readAllTalkers } = require('../utils/fsUtils');

async function testIdExist(req, res, next) {
  const data = await readAllTalkers();
  const { id } = req.params;
  try {
  if (!data.some((e) => e.id === Number(id))) throw new Error('Pessoa palestrante não encontrada');
  next();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

function validateEmail(req, res, next) {
  const required = 'email';
  const emailValid = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i;
  const { email = [] } = req.body;
  const bodyTrue = required in req.body;
  const checkEmailExist = email.length !== 0;
  const checkEmailValid = emailValid.test(email);
    if (!(bodyTrue && checkEmailExist)) {
      res.status(400).json({ message: 'O campo "email" é obrigatório' });
    } else if (!checkEmailValid) {
      res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    } else {
    next();
  }
}

function validatePassword(req, res, next) {
  const required = 'password';
  const { password = [] } = req.body;
  const bodyTrue = required in req.body;
  const checkPasswordEmpty = password.length === 0;
  const checkPasswordLength = password.length >= 6;
  if (!bodyTrue && checkPasswordEmpty) {
      res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else if (!checkPasswordLength) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } else {
    next();
  }
}

module.exports = {
  testIdExist,
  validateEmail,
  validatePassword,
};
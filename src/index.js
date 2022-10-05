const express = require('express');
const bodyParser = require('body-parser');
const { readAllTalkers, readIdTalker, randomToken, writeTalker } = require('./utils/fsUtils');
const { testIdExist, validateEmail, validatePassword } = require('./middlewares/getterTalkers');
const { 
validateName, validateAge, validateTalk, validateToken } = require('./middlewares/validateTalker');
// const fs = require('fs').promises;
// const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const data = await readAllTalkers();
  res.status(200).json(data);
});

app.get('/talker/:id', testIdExist, async (req, res) => {
  const { id } = req.params;
  const data = await readIdTalker(Number(id));
  res.status(200).json(data);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = randomToken();
  req.headers.authorization = token;
  res.status(200).json({ token });
});

app.post('/talker', validateToken, validateName, validateAge, validateTalk, async (req, res) => {
  const talker = { ...req.body };
  const newTalker = await writeTalker(talker);
  res.status(201).json(newTalker);
});
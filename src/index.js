const express = require('express');
const bodyParser = require('body-parser');
const { 
readAllTalkers, readIdTalker,
randomToken, writeTalker,
updateTalker, deleteTalker, searchTalker } = require('./utils/fsUtils');
const {
testIdExist, validateEmail,
validatePassword, 
getValidSearch } = require('./middlewares/getterTalkers');
const { 
validateName, validateAge,
validateTalk, validateToken } = require('./middlewares/validateTalker');
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

app.get('/talker/search', validateToken, getValidSearch, async (req, res) => {
  const { q } = req.query;
  const resultSearchTalker = await searchTalker(q);
  res.status(200).json(resultSearchTalker);
});

app.get('/talker/:id', testIdExist, async (req, res) => {
  const { id } = req.params;
  console.log('aqui');
  const data = await readIdTalker(Number(id));
  res.status(200).json(data);
});

app.get('/talker', async (_req, res) => {
  const data = await readAllTalkers();
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

app.put('/talker/:id', validateToken, validateName, validateAge, validateTalk, async (req, res) => {
  const talker = { ...req.body, id: Number(req.params.id) };
  await updateTalker(talker);
  res.status(200).json(talker);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const idTalker = Number(req.params.id);
  await deleteTalker(idTalker);
  res.sendStatus(204);
});
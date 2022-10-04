const express = require('express');
const bodyParser = require('body-parser');
const { readAllTalkers } = require('./utils/fsUtils');
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

app.get('/talker', async (req, res) => {
  const data = await readAllTalkers();
  res.status(200).json(data);
});
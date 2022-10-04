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

module.exports = {
  testIdExist,
};
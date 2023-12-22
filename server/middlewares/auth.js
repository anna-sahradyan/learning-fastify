require('dotenv').config();

async function auth(req, replay) {
  if (['GET', 'HEAD'].includes(req.method)) {
    return;
  }
  const apiKey = req.headers['x-api-key'];
  const knownKey = process.env.APIKEY;
  if (!apiKey || apiKey !== knownKey) {
    return replay.code(401).send({ error: 'Unauthorized' });
  }
}

module.exports = auth;

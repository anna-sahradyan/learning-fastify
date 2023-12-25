const User = require('../models/user-model');
require('dotenv').config();

async function apiKeyAuth(req, replay) {
  if (['GET', 'HEAD'].includes(req.method)) {
    return;
  }
  const apiKey = req.headers['x-api-key'];
  const knownKey = process.env.APIKEY;
  if (!apiKey || apiKey !== knownKey) {
    return replay.code(401).send({ error: 'Unauthorized' });
  }
}

async function basicAuth(req, replay) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return replay.status(401).send({ error: 'No Authorization header' });
  }
  const [authType, authKey] = authHeader.split(' ');
  if (authType !== 'Basic') {
    return replay.status(401).send({ error: 'Require Basic Auth (username/password)' });
  }
  const [email, password] = Buffer.from(authKey, 'base64').toString('ascii').split(':');
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return replay.status(500).send({ error: ' User not found' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return replay.status(401).send({error:'Incorrect Password'});
    }
  } catch (err) {
    console.error(err);
    return replay.status(500).send({ error: 'An Error occurred during authorization ' });
  }

}

module.exports = { apiKeyAuth, basicAuth };



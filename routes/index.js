const axios = require('axios');
const express = require('express');

const router = express.Router();
const to = require('../lib/to');

// const arduinoIpAddress = '192.168.86.207';
const getUrl = (id) => `http://192.168.86.${id}`;

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/status', (req, res) => {
  res.sendStatus(200);
});

router.get('/arduino-status', async (req, res) => {
  const { id } = req.query;

  if (!id) return res.json({ error: 'No Arduino ID specified, please include an `id` parameter specifying the last 3 digits of the IP address.' });

  const [err] = await to(axios.get(getUrl(id)));

  if (err) {
    return res.json({ error: err });
  }

  return res.json({});
});

// Forward request directly to arduino on local network
router.post('/forward-directly-to-arduino', async (req, res) => {
  const { id } = req.body; // e.g. '192.168.10.130';

  if (!id) return res.json({ error: 'No Arduino ID specified, please include an `id` parameter specifying the last 3 digits of the IP address.' });

  const [err] = await to(axios.post(getUrl(id), req.body));

  if (err) {
    return res.json({ error: err });
  }

  return res.sendStatus(200);
});

module.exports = router;

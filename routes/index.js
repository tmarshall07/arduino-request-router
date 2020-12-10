const axios = require('axios');
const express = require('express');

const router = express.Router();
const rp = require('request-promise');
const to = require('../lib/to');

const arduinoIpAddress = '192.168.86.207';
const arduinoUrl = `http://${arduinoIpAddress}`;

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/status', (req, res) => {
  res.sendStatus(200);
});

router.get('/arduino-status', async (req, res) => {
  const [err, arduinoRes] = await to(axios.get(arduinoUrl));

  if (err) {
    return res.json({ error: err });
  }

  return res.json(arduinoRes);
});

// Forward request directly to arduino on local network
router.post('/forward-directly-to-arduino', async (req, res) => {
  const [err] = await to(axios.post(arduinoUrl, req.body));

  if (err) {
    return res.json({ error: err });
  }

  res.sendStatus(200);
});

// Send request to correct device based on a request parameter named device
router.post('/complex-request/:device', async (req, res) => {
  // TODO: Replace these with the local IP addresses of your arduinos
  const arduino1Url = 'http://192.168.10.130';
  const arduino2Url = 'http://192.168.10.131';

  // get the device from the request parameters
  const deviceToSendCommandTo = req.params.device;
  const requestJson = req.body;

  const requestOptions = {
    method: 'POST',
    body: requestJson,
    json: true,
  };

  // send request to Arduino 1
  if (deviceToSendCommandTo === '1') {
    requestOptions.uri = arduino1Url;
    await rp(requestOptions);
  }
  // send request to Arduino 2
  else if (deviceToSendCommandTo === '2') {
    requestOptions.uri = arduino2Url;
    await rp(requestOptions);
  }
  // if paramter is anything else, send request to both Arduinos
  else {
    // Send request to Arduino 1
    requestOptions.uri = arduino1Url;
    await rp(requestOptions);

    // Send request to Arduino 2
    requestOptions.uri = arduino2Url;
    await rp(requestOptions);
  }

  res.sendStatus(200);
});

module.exports = router;

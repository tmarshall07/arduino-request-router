const express = require('express');
const router = express.Router();
const rp = require('request-promise');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

// Forward request directly to arduino on local network
router.post('/forward-directly-to-arduino', async function (req, res) {
    // TODO: Replace this with the local IP address of your arduino
    const arduinoIpAddress = '192.168.10.136';
    const arduinoUrl = 'http://' + arduinoIpAddress;
    const requestJson = req.body;

    const requestOptions = {
        method: 'POST',
        uri: arduinoUrl,
        body: requestJson,
        json: true
    };

    await rp(requestOptions);

    res.send(200);
});

// Send request to correct device based on a request parameter named device
router.post('/complex-request/:device', async function (req, res) {
    // TODO: Replace these with the local IP addresses of your arduinos
    const arduino1Url = 'http://192.168.10.136';
    const arduino2Url = 'http://192.168.10.137';

    // get the device from the request parameters
    const deviceToSendCommandTo = req.params.device;

    const requestOptions = {
        method: 'POST',
        body: {
            action: 'off'
        },
        json: true
    };

    // send request to arduino 1
    if (deviceToSendCommandTo === '1') {
        requestOptions.uri = arduino1Url;
        await rp(requestOptions);
    }
    // send request to arduino 2
    else if (deviceToSendCommandTo === '2') {
        requestOptions.uri = arduino2Url;
        await rp(requestOptions);
    }

    res.send(200);
});

module.exports = router;

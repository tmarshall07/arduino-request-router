## SETUP GUIDE
https://kunzleigh.com/command-your-arduino-from-anywhere-part-2-ngrok-middleman-server/

## Server

This setup uses `pm2` to manage the server staying up at all times.

### Restarting

`pm2 restart all`

### List all

`pm2 list`

> [`pm2` cheatsheet](https://pm2.keymetrics.io/docs/usage/quick-start/#cheatsheet)

## SSH into Pi server
`ssh pi@192.168.86.36`

password: {RASPBERRY_PI_PASSWORD}

## Ngrok tunnel
[https://chowmeow.ngrok.io](https://chowmeow.ngrok.io)
[http://chowmeow.ngrok.io](http://chowmeow.ngrok.io)
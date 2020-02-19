const express = require('express');
const app = express();
const logger = require('pino')();

// Pino logger level. Set to 'info' for PROD versions
logger.level = 'info';

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    logger.info('gazelle-analyser-api listening in port 3000!');
});

const { createWriteStream} = require('pino-http-send');
const pino = require('pino');

const url = `http://${process.env.COLLECTOR_HOSTNAME}:${process.env.COLLECTOR_PORT}`
const stream = createWriteStream({
    url: url,
});

const logger = pino(
    {
        level: 'info',
    },
    stream,
);

module.exports = {logger};


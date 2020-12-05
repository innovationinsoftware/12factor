require('dotenv').config();
const http = require('http');
const uuidv4 = require('uuid/v4');
const faker = require('faker');
const port = process.env.PINGER_PORT || 3000;

const handleRequest = (request, response)  => {
    response.setHeader("Content-Type", "application/json");

    const correlationId = uuidv4();
    response.setHeader("x-correlation-id", correlationId);

    const rslt = {};
    rslt.appName = 'Pinger';
    rslt.currentTime = new Date();
    rslt.PINGER_PORT = port;
    rslt.randomMessage = faker.lorem.words(5);
    rslt.correlationId = correlationId;

    const str = JSON.stringify(rslt, null, 4);

    response.writeHead(200);
    response.end(str);
    console.log(rslt);
};

const server = http.createServer(handleRequest);

server.listen(port, () => {
    console.log(`API Server is listening on port ${port}`);
});

const shutdown = () => {
    console.log(`Server shutting down at ${new Date()}`);
    server.close();
};

module.exports = {server,shutdown};

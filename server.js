require('dotenv').config();
const http = require('http');
const port = process.env.PINGER_PORT || 3000;
const uuidv4 = require('uuid/v4');


const handleRequest = (request, response)  => {
    response.setHeader("Content-Type", "application/json");
    response.setHeader("x-correlation-id", uuidv4());

    const rslt = {appName: 'Pinger', currentTime: new Date(), PINGER_PORT: port }
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

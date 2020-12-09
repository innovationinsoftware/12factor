require('dotenv').config();
const http = require('http');
const uuidv4 = require('uuid/v4');
const faker = require('faker');
const {logger} = require('./logger');

const port = process.env.PINGER_PORT || 3000;
const isAdmin = (process.env.PINGER_ADMIN === "true") || (process.env.PINGER_ADMIN === "TRUE");

if(!process.env.COLLECTOR_HOSTNAME) throw new Error('The required environment variable,COLLECTOR_HOSTNAME is not set');
if(!process.env.COLLECTOR_PORT) throw new Error('The required environment variable,COLLECTOR_PORT is not set');

const collectorHostname = process.env.COLLECTOR_HOSTNAME;
const collectorPort = process.env.COLLECTOR_PORT;

/*
This is a utility function that gathers environment information
at runtime
 */
const getRuntimeInfo = () =>{
    let networkInfo;
    try {
        networkInfo = require('os').networkInterfaces();
    } catch (e) {
        networkInfo = 'UNKNOWN_OR_INACCESSIBLE';
    }
    const vers = process.env.CURRENT_VERSION || 'UNDEFINED';
    return {
        APIVersion: vers,
        processId: process.pid,
        memoryUsage: process.memoryUsage(),
        networkInfo
    };
}

const handleRequest = async (request, response)  => {
    logger.info(request);
    response.setHeader("Content-Type", "application/json");

    const correlationId = uuidv4();
    response.setHeader("x-correlation-id", correlationId);

    const rslt = {};
    rslt.appName = 'Pinger';
    rslt.currentTime = new Date();
    rslt.PINGER_PORT = port;
    rslt.randomMessage = faker.lorem.words(5);
    rslt.correlationId = correlationId;

    if(isAdmin){
        const obj = getRuntimeInfo();
        rslt.APIVersion = obj.APIVersion;
        rslt.processId = obj.processId;
        rslt.memoryUsage = obj.memoryUsage;
        rslt.networkInfo = obj.networkInfo
    }
    //logger.info(rslt)
    const str = JSON.stringify(rslt, null, 4);

    response.writeHead(200);
    response.end(str);
    logger.info(response)
    //console.log(rslt);
};

const server = http.createServer(handleRequest);

server.listen(port, () => {
    logger.info(`Pinger is listening on port ${port}`);
});

const shutdown = () => {
    logger.info(`Pinger is shutting down at ${new Date()}`);
    server.close();
};

module.exports = {server,shutdown};

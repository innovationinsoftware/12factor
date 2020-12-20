require('dotenv').config();
const http = require('http');
const uuidv4 = require('uuid/v4');
const faker = require('faker');

const port = process.env.SECRET_SOCIETY_PORT || 3050;
const agent = process.env.SECRET_SOCIETY_AGENT || 'Unknown';
const region = process.env.SECRET_SOCIETY_REGION || 'US_WEST';

const getMessage = ()=> {
    const msg = {}
    msg.secretAgent = agent;
    msg.secretMessage = faker.lorem.words(5);
    msg.id = uuidv4();
    msg.created = new Date();
    msg.region = region;
    return msg;
}

const handleRequest = (request, response)  => {
    response.setHeader("Content-Type", "application/json");
    response.setHeader("x-correlation-id", uuidv4());

    const str = JSON.stringify(getMessage(), null, 4);
    response.writeHead(200);
    response.end(str);
    console.log(str);
};

const server = http.createServer(handleRequest);

server.listen(port, () => {
    console.log(`Secret Society Server is listening on port ${port} at ${new Date()}`);
});

const shutdown = () => {
    console.log(`Secret Society shutting down at ${new Date()}`);
    server.close();
};

module.exports = {server,shutdown};

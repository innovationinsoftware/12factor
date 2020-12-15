const express = require('express');
const uuidv4 = require('uuid/v4');

const {write, read} = require('./datastore')

if(!process.env.COLLECTOR_PORT)throw Error('The required environment variable, COLLECTOR_PORT is not defined.')
const port = process.env.COLLECTOR_PORT;

const app = express();
// Handling JSON data
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended:true})); // to support URL-encoded bodies

// POST
app.post("/", async (request, response) => {
    const correlationId = request.header('x-correlation-id') || uuidv4();
    // our unix timestamp
    const unixTimeCreated = new Date().getTime();
    // add our unix time as a "created" property and add it to our request.body
    const newData = Object.assign({"created": unixTimeCreated}, request.body);
    newData.correlationId = correlationId;
    const rslt = await write(newData);

    response.writeHead(200);
    response.end(JSON.stringify(rslt));
    console.log(rslt);
})

//GET
app.get("/", async (request, response) => {
    const correlationId = request.header('x-correlation-id') || uuidv4();
    const key = request.query.key
    const rslt = await read(key);
    response.writeHead(200);
    response.end(JSON.stringify(rslt));
    console.log(rslt);
})




const server = app.listen(port, () => {
    console.log(`Collector Server started on port ${port} at ${new Date()}`)
})

const shutdown = async => {
    console.log(`Collector is shutting down at ${new Date()}`);
    server.close()
};
module.exports = {server, shutdown};
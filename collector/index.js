require('dotenv').config();
const express = require('express');
const uuidv4 = require('uuid/v4');

const port = process.env.COLLECTOR_PORT || 4000;
const isAdmin = (process.env.COLLECTOR__ADMIN === "true") || (process.env.COLLECTOR_ADMIN === "TRUE");
const collectorHost = process.env.COLLECTOR_DELEGATE_HOSTNAME || "localhost";
const collectorPort = process.env.COLLECTOR_DELEGATE_PORT || 6379;

const {write, read} = require('./datastore')



const app = express();
// Handling JSON data
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended:true})); // to support URL-encoded bodies

// our API
// GET - /api
app.get("/api", (request, response) => {

});

// POST - /api
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
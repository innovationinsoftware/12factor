const http = require('http');
require('dotenv').config()
const port = process.env.APP_PORT || 3000;
const {logger} = require('./logger');

const restaurant = 'Burger Queen';

if(!process.env.COLLECTOR_PORT)throw Error(`The required environment variable, COLLECTOR_PORT is not defined in ${restaurant}.`);
if(!process.env.COLLECTOR_HOSTNAME)throw Error(`The required environment variable, COLLECTOR_HOSTNAME is not defined in ${restaurant}.`);


const foods = ['burger', 'fries', 'whooper', 'onion rings']

const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};

const shutdown = async (signal) => {
    let shutdownMessage;

    if(!signal){
        shutdownMessage = (`${restaurant} API Server shutting down at ${new Date()}`);
    }else{
        shutdownMessage = (`Signal ${signal} : ${restaurant} API Server shutting down at ${new Date()}`);
    }
    const obj = {status:'SHUTDOWN', shutdownMessage, pid:process.pid};
    await server.close(function () {
        console.log(obj);
        process.exit(0);
    }).catch(err => {
        console.error(err);
        return {status:'ERROR',err}
    })

};

const server = http.createServer((request, response) => {
    logger.info(request);
    const order = sample(foods) ;
    const res = {restaurant, order}
    logger.info({res});
    const str = JSON.stringify({restaurant, order})
    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);
    response.end(str);
}).listen(port, (err) => {
    console.log(`${restaurant}, API Server is started on ${port}  at ${new Date()}, with pid ${process.pid}`);
});

process.on('SIGTERM', function () {
    shutdown('SIGTERM');
});

process.on('SIGINT', function () {
    shutdown('SIGINT');
});


module.exports = {server,shutdown};

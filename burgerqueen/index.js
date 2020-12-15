const http = require('http');
const port = process.env.APP_PORT || 3000;
const {logger} = require('./logger');

if(!process.env.COLLECTOR_PORT)throw Error('The required environment variable, COLLECTOR_PORT is not defined.');
if(!process.env.COLLECTOR_HOSTNAME)throw Error('The required environment variable, COLLECTOR_HOSTNAME is not defined.');

const restaurant = 'Burger Queen';

const foods = ['burger', 'fries', 'whooper', 'onion rings']

const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};

const shutdown = (signal) => {
    if(!signal){
        console.log(`${restaurant} API Server shutting down at ${new Date()}`);
    }else{
        console.log(`Signal ${signal} : ${restaurant} API Server shutting down at ${new Date()}`);
    }
    server.close(function () {
        process.exit(0);
    })
};

const server = http.createServer((request, response) => {
    logger.info(request);
    const order = sample(foods) ;
    const res = {restaurant, order}
    logger.info({res});
    const str = JSON.stringify({res})
    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);
    response.end(str);
}).listen(port, (err) => {
    console.log(`${restaurant} API Server is started on ${port}  at ${new Date()} with pid ${process.pid}`);
});

process.on('SIGTERM', function () {
    shutdown('SIGTERM');
});

process.on('SIGINT', function () {
    shutdown('SIGINT');
});


module.exports = {server,shutdown};

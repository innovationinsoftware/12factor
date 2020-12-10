const host = process.env.COLLECTOR_DELEGATE_HOSTNAME || "localhost";
let port = process.env.COLLECTOR_DELEGATE_PORT || 6379;
if(process.env.COLLECTOR_DELEGATE_PORT) port = parseInt(process.env.COLLECTOR_DELEGATE_PORT);

const redis = require("redis");
const client = redis.createClient({host,port});
const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);


const uuidv4 = require('uuid/v4');

client.on("error", function(error) {
    console.error(error);
});

const write = async (data) =>{
    const key = uuidv4()
    const result = await setAsync(key, JSON.stringify(data))
                        .catch(e =>{
                            console.log(e)
                        });
    console.log({result, key});
    return {result, key};
}

const read = async (key) =>{
    const data = await getAsync(key)
        .catch(e =>{
            console.log(e)
        });
    const result = JSON.parse(data);
    result.key = key;
    console.log(result);
    return result;

}

module.exports = {write, read};



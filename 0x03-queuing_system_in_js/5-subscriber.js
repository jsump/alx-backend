/**
 * Client and subscribe
*/
const redis = require('redis');

const client = redis.createClient();

// When connection workds correctly
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

// when Connection to Redis does not work
client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error}`);
});

// Subscribe to channel
client.subscribe('holberton school channel');

//Log message to console when receiving message on channel
client.on('message', (channel, message) => {
    console.log(`Recieved message on channel "${channel}": ${message}`);

    // Unsubscribe if server is killed
    if (message === 'KILL_SERVER') {
        client.unsubscribe();
        client.quit();
    }
});

// Function to publish message
function publishMEssage(message, time) {
    setTimeout(() => {
        console.log(`About to send ${message}`);
        client.publish('holberton school channel', message);
    }, time);
}

publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);

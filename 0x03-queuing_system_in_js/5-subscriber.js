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

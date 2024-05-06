/**
 * Connect to redis server
 */
import redis from 'redis';

const client = redis.createClient();

// When connection workds correctly
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

// when Connection to Redis does not work
client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error}`);
});

// Set in Redis value for the key
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

// Log to console the value for key passed as argument
function displaySchoolValue(schoolName) {
    client.get(schoolName, (error, value) => {
        console.log(`${value}`);
    });
}


displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

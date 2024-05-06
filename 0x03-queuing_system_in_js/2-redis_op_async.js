/**
 * Connect to redis server
 */
import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

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
async function displaySchoolValue(schoolName) {

    const value = await getAsync(schoolName);
    console.log(`${value}`);
}


displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

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

//
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

//
function displaySchoolValue(schoolName) {
    client.get(schoolName, (error, value) => {
        if (error) {
            console.error(`Error retriving value for${schoolName}: ${error.message}`);
            return;
        }
        console.log(`${value}`);
    });
}


displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

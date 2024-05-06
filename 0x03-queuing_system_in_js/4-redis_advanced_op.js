/**
 * Use client to store a hash value
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

const hset = {
    Portland:50,
    Seattle:80,
    'New York':20,
    Bogota:20,
    Cali:40,
    Paris:2,
};

// Create Hash keys
function createHashKeys(hashKey, hset) {
    Object.entries(hset).forEach(([key, value]) => {
        client.hset(hashKey, key, value, redis.print);
    });
}

// Display Hask Keys
function displayHashKeys(hashKey) {
    client.hgetall(hashKey, (error, result) => {
        if (error) {
	  console.error(`Error retriving hash keys for ${hashKey}: ${error}`);
	} else {
	  console.log(`${hashKey}:`, result);
	}
    });
}

createHashKeys('HolbertonSchools', hset);
displayHashKeys('HolbertonSchools');

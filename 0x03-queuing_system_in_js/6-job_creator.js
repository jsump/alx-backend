/**
 * Create job creator
 */
import redis from 'redis';

const client = redis.createClient();

const kue = require('kue');
const queue = kue.createQueue();

// When connection workds correctly
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

// when Connection to Redis does not work
client.on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error}`);
});

// Creat job object
const jobObject = {
    phoneNumber: '0123456789',
    message: 'You have a New Message',
};

// Create queue
const pushNotificationQueue = queue.create('push_notification_code', jobObject);

// When job is created without error
pushNotificationQueue.on('enqueue', (job, id) => {
    console.log(`Notification job created: ${id}`);
});

// When job is completed
pushNotificationQueue.on('complete', () => {
    console.log('Notification job completed');
});

// When a job isn't working
pushNotificationQueue.on('failure', () => {
    console.log('Notification job failed');
});

pushNotificationQueue.save();
/**
 * Create job creator
 */
const kue = require('kue');
const queue = kue.createQueue();

// Creat job object
const jobObject = {
    phoneNumber: '0123456789',
    message: 'You have a New Message',
};

// Create queue
const pushNotificationQueue = queue.create('push_notification_code', jobObject);

// When job is created without error
pushNotificationQueue.on('enqueue', () => {
    console.log(`Notification job created: ${pushNotificationQueue.id}`);
});

// When job is completed
pushNotificationQueue.on('complete', () => {
    console.log('Notification job completed');
});

// When a job isn't working
pushNotificationQueue.on('failure', () => {
    console.log('Notification job failed');
});

//save job to queue
pushNotificationQueue.save();

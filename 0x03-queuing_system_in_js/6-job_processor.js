/**
 * Create job processor
 */
const kue = require('kue');
const queue = kue.createQueue();

// Fucntion to create notification
function sendNotification(phoneNumber, message) {
    phoneNumber ='0123456789',
    message = 'This is the code to verify your account';
    console.log(`Sending notification to ${phoneNumber}}, with message: ${message}`);
}

// Listen to job processes on queue
queue.process('push_notification_code', (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message);
    done();
});

// start queue
queue.on('ready', () => {
    console.log('Ready');
});

// Error
queue.on('error', () => {
    console.log('Error');
});

// Process termination
process.once('SIGTERM', () => {
    queue.shutdown(5000, (err) => {
        console.log('Shutdown');
        process.exit(0)
    });
});

process.once('SIGINT', () => {
    queue.shutdown(5000, (err) => {
        console.log('Shutdown');
        process.exit(0)
    });
});
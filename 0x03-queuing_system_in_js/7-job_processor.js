/**
 * Track progress and errors with job processor
 */
const kue = require('kue');
const queue = kue.createQueue();

// Array for blacklisted phone numbers
const blacklisted = ['4153518780', '4153518781'];

// Fucntion to send notifs
function sendNotification(phoneNumber, message, job, done) {
    if (blacklisted.includes(phoneNumber)) {
        done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    } else {
        job.progress(0, 100);
        setTimeout(() => {
            job.progress(50, 100);
            console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
            done();
        }, 1000);
    }
}

// Process jobs from the queue
queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message, job, done);
});

// Listen for queue events
queue.on('ready', () => {
    console.log('Queue is ready');
});

queue.on('error', (err) => {
    console.log('Queue error:', err);
});

// Handle process termination
process.once('SIGTERM', () => {
    queue.shutdown(5000, (err) => {
        console.log('Queue shutdown');
        process.exit(0);
    });
});

process.once('SIGINT', () => {
    queue.shutdown(5000, (err) => {
        console.log('Queue shutdown');
        process.exit(0);
    });
});

// Loop through jobs
jobs.forEach((jobData) => {
    const pushNotificationJob = queue.create('push_notification_code_2', jobData);

    // When job is completed
    pushNotificationJob.on('complete', () => {
        console.log(`Notification job ${pushNotificationJob.id} completed`);
    });

    // When a job isn't working
    pushNotificationJob.on('failed', (error) => {
        console.log(`Notification job ${pushNotificationJob.id} failed: ${error}`);
    });

    // When a job is progressing
    pushNotificationJob.on('progress', (progress, data) => {
        console.log(`Notification job ${pushNotificationJob.id} ${progress}% complete`);
    });

    // Save job to queue
    pushNotificationJob.save();
});

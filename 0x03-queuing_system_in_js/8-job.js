/**
 * Track progress and errors with job processor
 */
const kue = require('kue');
const queue = kue.createQueue();

// Function to send notifications
function sendNotification(phoneNumber, message, job, done) {
    job.progress(0, 100);
    setTimeout(() => {
        job.progress(50, 100);
        console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
        done();
    }, 1000);
}

// Counter for counting the number of tasks
let tasksCount = 0;

// Function to create push notifications jobs
function createPushNotificationsJobs(jobs, queue) {
    // Check if jobs is an array
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs is not an Array');
    }

    // Loop through jobs
    jobs.forEach((jobData) => {
        const pushNotificationJob = queue.create('push_notification_code_3', jobData);

        // Increment tasks count
        tasksCount++;

        // Log when job is created
        console.log(`Notification job created: ${pushNotificationJob.id}`);

        // When job is completed
        pushNotificationJob.on('complete', () => {
            console.log(`Notification job ${pushNotificationJob.id} completed`);
            tasksCount--;
            if (tasksCount === 0) {
                console.log('All notification jobs completed');
            }
        });

        // When a job isn't working
        pushNotificationJob.on('failed', (error) => {
            console.log(`Notification job ${pushNotificationJob.id} failed: ${error}`);
            tasksCount--;
            if (tasksCount === 0) {
                console.log('All notification jobs completed');
            }
        });

        // When a job is progressing
        pushNotificationJob.on('progress', (progress, data) => {
            console.log(`Notification job ${pushNotificationJob.id} ${progress}% complete`);
        });

        // Save job to queue
        pushNotificationJob.save();
    });
}

// Example usage
const jobs = [
    {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
    },
    {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
    }
];

createPushNotificationsJobs(jobs, queue);

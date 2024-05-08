/**
 * Track progress and errors with job processor
 */
const kue = require('kue');
const queue = kue.createQueue();

//function to create push ntifs
function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs is not an Array');
    }

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
}
/**
 * Track progress and errors with job processor
 */
const kue = require('kue');
const queue = kue.createQueue();

//array
const jobs = [
    {
      phoneNumber: '4153518780',
      message: 'This is the code 1234 to verify your account'
    },
    {
      phoneNumber: '4153518781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153518743',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153538781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153118782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4159518782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4158718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153818782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4154318781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4151218782',
      message: 'This is the code 4321 to verify your account'
    }
  ];
  
//function to create push ntifs
function createPushNotificationsJobs(jobs, queue) {
    // Check if jobs is an array
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs is not an Array');
    }

    // Loop through jobs
    jobs.forEach((jobData) => {
        const pushNotificationJob = queue.create('push_notification_code_3', jobData);

        // Log when job is created
        console.log(`Notification job created: ${pushNotificationJob.id}`);

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
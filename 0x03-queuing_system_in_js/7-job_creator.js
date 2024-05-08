/**
 * Track progress and errors
 */
const kue = require('kue');
const queue = kue.createQueue();

// array
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

// Process 'push_notification_code_2' jobs
queue.process('push_notification_code_2', (job, done) => {
    setTimeout(() => {
        job.progress(50, 100);

        const random = Math.random();
        if (random < 0.5) {
            done();
        } else {
            done(new Error('Error'));
        }
    }, Math.random() * 5000);
});

// Start processing 'push_notification_code' jobs
queue.process('push_notification_code', (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message); // Make sure to define sendNotification function
    done();
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

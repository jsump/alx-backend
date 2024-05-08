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

// create queue
const pushNotificationQueue = queue.createQueue();

// Loop
jobs.forEach((jobData) => {
    const pushNotificationJob = pushNotificationQueue.create('push_notification_code_2', jobData);

    // When job is completed
    pushNotificationJob.on('complete', () => {
        console.log(`Notification job ${pushNotificationJob.id} completed`);
    });

    // When a job isn't working
    pushNotificationJob.on('failed', (error) => {
        console.log(`Notification job ${pushNotificationJob.id} failed`);
    });

    // When a job is progressing
    pushNotificationJob.on('progress', (progress, data) => {
        console.log(`Notification job ${pushNotificationJob.id} ${progress}% complete`);
    });

    //save job to queue
    pushNotificationQueue.save();

});

// start queue
queue.process('push_notification_code_2', (job,done) => {
    setTimeout(() => {
        job.progress(50, 100);

        const random = Math.random();
        if (random <0.5) {
            done();
        } else {
            done(new Error('Error'));
        }
    }, Math.random() * 5000);
});

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
queue.on('error', (err) => {
    console.log('Error', err);
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


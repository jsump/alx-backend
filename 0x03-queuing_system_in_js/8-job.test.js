const kue = require('kue');
const { createPushNotificationsJobs } = require('./8-job.js');

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('must throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('invalid', queue)).toThrow('Jobs is not an array');
  });

  it('must create jobs in the queue', () => {
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

    expect(queue.testMode.jobs.length).toBe(2);
    expect(queue.testMode.jobs[0].type).toBe('push_notification_code_3');
    expect(queue.testMode.jobs[1].type).toBe('push_notification_code_3');
  });

  it('should log job creation, completion, and failure', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      }
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(console.log).toHaveBeenCalledWith('Notification job created: 1');
    expect(console.log).toHaveBeenCalledWith('Notification job 1 completed');
    expect(console.log).not.toHaveBeenCalledWith('Notification job 1 failed');
  });
});

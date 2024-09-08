import cron from 'node-cron';

export const cronJob = () => {
    let task = cron.schedule('*/5 * * * * *', () => {
        console.log('Running a task every 5 seconds');
    });
    task.start();
}
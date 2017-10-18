const config = require('config');
const Jenkins = require('jenkins');

const jenkins = new Jenkins({
  baseUrl: `https://${config.get('username')}:${config.get('token')}@ci.biztech-dev.com/`,
  promisify: true,
});

function printJobs(jobs) {
  if (!jobs) return;

  jobs.forEach(job => {
    const name = job.fullDisplayName || job.fullName || job.name;
    const type = job._class.split('.').pop();

    console.log(`${type}: ${name}${type === 'WorkflowJob' ? ' - ' + job.color : ''}`);

    printJobs(job.jobs);
  });
};

jenkins.job.list({ depth: 2 }).then((data) => {
  printJobs(data.find(job => job.name === 'Biz Tech Engines').jobs);
}).catch((err) => {
  console.error(err);
});

const config = require('config');
const Jenkins = require('jenkins');

const jenkins = new Jenkins({
  baseUrl: `https://${config.get('username')}:${config.get('token')}@ci.biztech-dev.com/`,
  promisify: true,
});

function printJobs(jobs) {
  if (!jobs) return;

  jobs.forEach(job => {
    console.log(job.fullDisplayName || job.fullName || job.name);
    printJobs(job.jobs);
  });
};

jenkins.job.list({ depth: 2 }).then((data) => {
  printJobs(data);
}).catch((err) => {
  console.error(err);
});

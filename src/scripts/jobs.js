const chalk = require('chalk');

const jenkins = require('../jenkins');

function printJobs(jobs, prefixPadding = 0) {
  if (!jobs) return;

  jobs.forEach(job => {
    const name = job.fullDisplayName || job.fullName || job.name;
    const type = job._class.split('.').pop();

    // Make it colorful if its a job
    let colorizer, isUnknownStatus;
    if (type === 'WorkflowJob') {
      if (chalk[job.color]) {
        colorizer = chalk[job.color];
        isUnknownStatus = false;
      } else {
        if (job.color === 'aborted') {
          colorizer = chalk.gray.underline;
        } else {
          colorizer = chalk.underline;
        }

        isUnknownStatus = true;
      }
    } else {
      colorizer = text => text;
    }

    process.stdout.write(' '.repeat(prefixPadding));
    console.log(
      colorizer(
        `${type}: ${name}${
          isUnknownStatus ? ' (status: ' + job.color + ')' : ''
        }`,
      ),
    );

    printJobs(job.jobs, prefixPadding + 2);
  });
}

jenkins.job
  .list({ depth: 2 })
  .then(data => {
    printJobs(data.find(job => job.name === 'Biz Tech Engines').jobs);
  })
  .catch(err => {
    console.error(err);
  });

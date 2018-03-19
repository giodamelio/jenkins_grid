const config = require('config');
const Jenkins = require('jenkins');
const chalk = require('chalk');

const jenkins = new Jenkins({
  baseUrl: `https://${config.get('username')}:${config.get(
    'token',
  )}@ci.biztech-dev.com/`,
  promisify: true,
});

function printNodes(nodes) {
  nodes.forEach(node => {
    const colorizer = node.offline ? chalk.red : chalk.green;
    console.log(colorizer(node.displayName));
    if (node.offline) {
      console.log(`  ${node.offlineCauseReason}`);
    }
  });
}

jenkins.node
  .list()
  .then(data => {
    printNodes(data);
  })
  .catch(err => {
    console.error(err);
  });

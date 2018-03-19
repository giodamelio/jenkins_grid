const chalk = require('chalk');

const jenkins = require('../jenkins');

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

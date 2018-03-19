const chalk = require('chalk');
const displayNotification = require('display-notification');

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

function notifyOfflineNodes(nodes) {
  nodes.forEach(node => {
    if (node.offline) {
      displayNotification({
        title: 'Jenkins Node Offline',
        text: node.displayName,
      });
    }
  });
}

module.exports.run = function() {
  jenkins.node
    .list()
    .then(data => {
      printNodes(data);
      notifyOfflineNodes(data);
    })
    .catch(err => {
      console.error(err);
    });
};

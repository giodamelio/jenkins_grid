const config = require('config');
const Jenkins = require('jenkins');

const jenkinsAPI = new Jenkins({
  baseUrl: `https://${config.get('username')}:${config.get(
    'token',
  )}@ci.biztech-dev.com/`,
  promisify: true,
});

module.exports = jenkinsAPI;

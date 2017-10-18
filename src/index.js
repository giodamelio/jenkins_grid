const config = require('config');
const Jenkins = require('jenkins');

const jenkins = new Jenkins({
  baseUrl: `https://${config.get('username')}:${config.get('token')}@ci.biztech-dev.com/`,
  promisify: true,
});

jenkins.info().then((data) => {
  console.log(data);
}).catch((err) => {
  console.error(err);
});

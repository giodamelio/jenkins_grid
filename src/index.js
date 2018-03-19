const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

function help() {
  console.log('You MUST provide one subscript to run');
  console.log('  jobs or nodes');
  process.exit(1);
}

if (argv._.length !== 1) {
  help();
}

try {
  require(`./scripts/${argv._[0]}`).run();
} catch (err) {
  help();
}

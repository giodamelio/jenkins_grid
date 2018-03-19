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
  const script = require(`./scripts/${argv._[0]}`);

  if (argv.repeat) {
    const interval = Number.isInteger(argv.repeat) ? argv.repeat : 60;

    // Run it once at the beginning
    script.run().then(() => {
      // Print a line to differentiate between runs
      console.log('-'.repeat(process.stdout.columns));
    });

    // Then run it every n seconds
    setInterval(() => {
      script.run().then(() => {
        // Print a line to differentiate between runs
        console.log('-'.repeat(process.stdout.columns));
      });
    }, interval * 1000);
  } else {
    script.run();
  }
} catch (err) {
  help();
}

const yargs = require('yargs');
const fail = require('../fail');
const Command = require('./command');

yargs.usage('Usage: $0 <command> [options]');
// add `--version` (`-V`) flag and parse version from package.json
yargs.version();
yargs.alias('version', 'V');
// add `--help` (`-h`) flag
yargs.help();
yargs.alias('help', 'h');
// add custom error handler
yargs.fail(fail);

// enable similar command suggestions if no matching command was found
yargs.recommendCommands();
// register commands
new Command({ name: 'create' }).register(yargs);
new Command({ name: 'build' }).register(yargs);
new Command({ name: 'start:dev' }).register(yargs);
new Command({ name: 'start:prod' }).register(yargs);
new Command({ name: 'lint' }).register(yargs);
new Command({ name: 'format' }).register(yargs);

// parse arguments
const { argv } = yargs;

if (!argv._.length) {
  yargs.showHelp();
  process.exit(1);
}

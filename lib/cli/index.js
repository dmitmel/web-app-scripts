/**
 * @module cli
 * @example
 * const run = require('./cli');
 */

const yargs = require('yargs');
const fail = require('../util/fail');

const commands = [
  require('./commands/create'),
  require('./commands/format'),
  require('./commands/lint'),
  require('./commands/start'),
  require('./commands/build')
];

yargs.usage('Usage: $0 <command> [options]');
// read version from package.json and add `--version` (`-V`) flag
yargs.version();
yargs.alias('version', 'V');
yargs.describe('version', 'show version');
// add `--help` (`-h`) flag
yargs.help();
yargs.alias('help', 'h');
yargs.describe('help', 'show help');
// add custom error handler
yargs.fail(fail);

// enable similar command suggestions if no matching command was found
yargs.recommendCommands();
// register commands
commands.forEach(command => command.register(yargs));

/**
 * Runs CLI.
 * @alias module:cli
 * @param {object} argv - program arguments
 */
function run(argv) {
  // show help if there are no arguments
  if (!argv._.length) {
    yargs.showHelp('error');
    process.exit(1);
  }

  const didAnyCommandRun = commands.some(command => command.didRun);
  // fail if no matching command was found
  if (!didAnyCommandRun) fail(`Command ${argv._[0]} was not found`);
}

module.exports = run;

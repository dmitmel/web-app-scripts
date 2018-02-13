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
// add `--version` (`-V`) flag and parse version from package.json
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
commands.forEach(command => yargs.command(command));

// parse arguments
const { argv } = yargs;

// show help if there are no arguments
if (!argv._.length) {
  yargs.showHelp('error');
  process.exit(1);
}

if (!commands.some(command => command.didRun))
  fail(`Command ${argv._[0]} was not found`);

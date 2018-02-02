const yargs = require('yargs');
const fail = require('../fail');

const commands = [
  require('./commands/create'),
  require('./commands/format'),
  require('./commands/lint'),
  require('./commands/lint'),
  require('./commands/start')
];

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
commands.forEach(command => command.register(yargs));
// parse arguments
const { argv } = yargs;

// show help if there is no arguments
if (!argv._.length) {
  yargs.showHelp();
  process.exit(1);
}

if (commands.every(command => !command.didRun))
  fail(`Command ${argv._[0]} was not found`);

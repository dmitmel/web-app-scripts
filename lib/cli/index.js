const yargs = require('yargs');
const fail = require('../fail');

function registerCommand(name) {
  const command = require(`./commands/${name}`);
  command.register(yargs);
}

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
registerCommand('create');
registerCommand('format');
registerCommand('lint');
registerCommand('start');
registerCommand('build');
// parse arguments
const { argv } = yargs;

if (!argv._.length) {
  yargs.showHelp();
  process.exit(1);
}

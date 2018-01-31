const yargs = require('yargs');
const fail = require('./fail');

const app = yargs
  .usage(`Usage: $0 <command> [options]`)
  .version()
  .help()
  .alias('help', 'h')
  .alias('help', '?')
  .alias('version', 'V')
  .command('build', 'Create production build')
  .command('start:dev', 'Start development server')
  .command('start:prod', 'Serve production build')
  .command('test', 'Run tests')
  .command(
    '*',
    false,
    () => {},
    () => {
      app.showHelp();
      process.exit(1);
    }
  )
  .fail(fail)
  .showHelpOnFail(false, `Try '$0 --help' for more information.`);

console.log(app.argv);

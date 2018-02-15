const Command = require('../command');
const CreateTask = require('../../create');

module.exports = new Command({
  name: 'create',
  description: 'Create new project',
  builder: yargs =>
    yargs
      .usage('Usage: $0 create <project-directory>')
      .demandCommand(1, 'Please specify the project directory')
      .option('force', {
        type: 'boolean',
        alias: 'f',
        description:
          'do not prompt for confirmation before overwriting existing paths'
      })
      .option('name', {
        type: 'string',
        alias: 'n',
        description: 'project name (project directory name is used by default)',
        requiresArg: true
      })
      .option('description', {
        type: 'string',
        alias: 'd',
        description: 'project description',
        requiresArg: true
      }),
  handler: ({ _, force, name, description }) =>
    new CreateTask(_[1], { force, name, description }).run()
});

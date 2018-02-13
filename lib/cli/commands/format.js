const Command = require('../command');
const format = require('../../format');

module.exports = new Command({
  name: 'format',
  description: 'Format the source code using Prettier',
  builder: yargs =>
    yargs
      .usage('Usage: $0 format')
      .option('project', {
        type: 'string',
        alias: 'p',
        description:
          'project path (by default program will try to find project root)'
      })
      .option('check', {
        type: 'boolean',
        alias: 'c',
        description:
          'only check for formatting issues and exit with a non-zero exit code if there are any'
      }),
  handler: ({ project, check }) => format({ projectDirectory: project, check })
});

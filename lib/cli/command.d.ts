import * as yargs from 'yargs';

export = class Command {
  constructor(options: {
    name: string;
    description: string;
    builder: yargs.CommandBuilder;
    handler: (args: yargs.Arguments) => void;
  });

  run(args: yargs.Arguments): void;

  register(yargs: yargs.Argv): yargs.Argv;
};

import * as yargs from 'yargs';

declare class Command {
  name: string;
  description: string;
  builder: yargs.CommandBuilder;
  handler: (args: yargs.Arguments) => void;
  didRun: boolean;

  constructor(options: {
    name: string;
    description: string;
    builder: yargs.CommandBuilder;
    handler: (args: yargs.Arguments) => void;
  });
}

export = Command;

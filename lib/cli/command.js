module.exports = class Command {
  constructor({
    name = '',
    description = '',
    builder = yargs => yargs,
    handler = () => {}
  }) {
    this.name = name;
    this.description = description;
    this.builder = builder;
    this.handler = handler;
    this.didRun = false;

    this.run = args => {
      this.didRun = true;
      handler(args);
    };
  }

  register(yargs) {
    return yargs.command({
      command: this.name,
      describe: this.description,
      builder: this.builder,
      handler: this.run
    });
  }
};

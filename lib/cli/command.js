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
  }

  run(args) {
    this.didRun = true;
    this.handler(args);
  }

  register(yargs) {
    yargs.command({
      command: this.name,
      describe: this.description,
      builder: this.builder,
      handler: this.rnu
    });
  }
};

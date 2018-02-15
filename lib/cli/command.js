class Command {
  constructor({
    name = '',
    description = '',
    builder = () => {},
    handler = () => {}
  } = {}) {
    // name of the command
    this.name = name;
    // short description of the command
    this.description = description;
    // function that takes `yargs` instance and adds argument-specific help
    this.builder = builder;
    // function that is called when the command is run
    this.handler = handler;
    // Did the command run? (it will be `true` even if the handler throws an
    // error)
    this.didRun = false;

    this.run = args => {
      this.didRun = true;
      return this.handler(args);
    };
  }

  register(yargs) {
    return yargs.command(this.name, this.description, this.builder, this.run);
  }
}

module.exports = Command;

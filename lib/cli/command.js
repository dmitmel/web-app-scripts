/**
 * @module cli/command
 * @example
 * const Command = require('./cli/command');
 */

/**
 * This class represents a CLI command.
 *
 * @alias module:cli/command
 * @see [`yargs.command(module)`](https://github.com/yargs/yargs/blob/master/docs/api.md#commandmodule)
 *
 * @example
 * const command = new Command({
 *   name: 'get',
 *   description: "make a 'GET' HTTP request",
 *   builder: yargs => yargs.option('url', {
 *     alias: 'u',
 *     default: 'https://google.com/'
 *   })
 * });
 * command.register(yargs);
 */
class Command {
  /**
   * @param {object}   options
   * @param {string}   options.name
   * @param {string}   options.description
   * @param {function} options.builder
   * @param {function} options.handler
   */
  constructor({
    name = '',
    description = '',
    builder = yargs => yargs,
    handler = () => {}
  }) {
    /** Name of the command. */
    this.name = name;
    /** Short description of the command. */
    this.description = description;
    /** Function that takes `yargs` instance and adds argument-specific help. */
    this.builder = builder;
    /** Function that is called when the command is run. */
    this.handler = handler;
    /** Did the command run? (Note: it will be `true` even if the
     *  [`handler`](#module_cli/command--Command.Command+handler) throws an
     *  exception). */
    this.didRun = false;
    /** Runs the command. */
    this.run = args => {
      this.didRun = true;
      handler(args);
    };
  }

  /**
   * Registers command into a `yargs` instance.
   * @param {object} yargs - `yargs` instance
   */
  register(yargs) {
    return yargs.command({
      command: this.name,
      describe: this.description,
      builder: this.builder,
      handler: this.run
    });
  }
}

module.exports = Command;

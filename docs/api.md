<a name="module_cli/command"></a>

## cli/command
**Example**  
```js
const Command = require('./cli/command');
```

* [cli/command](#module_cli/command)
    * [Command](#exp_module_cli/command--Command) ⏏
        * [`new Command(options)`](#new_module_cli/command--Command_new)
        * [`.name`](#module_cli/command--Command.Command+name)
        * [`.description`](#module_cli/command--Command.Command+description)
        * [`.builder`](#module_cli/command--Command.Command+builder)
        * [`.handler`](#module_cli/command--Command.Command+handler)
        * [`.didRun`](#module_cli/command--Command.Command+didRun)
        * [`.run()`](#module_cli/command--Command.Command+run)
        * [`.register(yargs)`](#module_cli/command--Command+register)

<a name="exp_module_cli/command--Command"></a>

### Command ⏏
This class represents a CLI command.

**Kind**: Exported class  
**See**: [`yargs.command(module)`](https://github.com/yargs/yargs/blob/master/docs/api.md#commandmodule)  
<a name="new_module_cli/command--Command_new"></a>

#### `new Command(options)`
**Params**

- options <code>object</code>
    - .name <code>string</code>
    - .description <code>string</code>
    - .builder <code>function</code>
    - .handler <code>function</code>

**Example**  
```js
const command = new Command({
  name: 'get',
  description: "make a 'GET' HTTP request",
  builder: yargs => yargs.option('url', {
    alias: 'u',
    default: 'https://google.com/'
  })
});
command.register(yargs);
```
<a name="module_cli/command--Command.Command+name"></a>

#### `command.name`
Name of the command.

**Kind**: instance property of [<code>Command</code>](#exp_module_cli/command--Command)  
<a name="module_cli/command--Command.Command+description"></a>

#### `command.description`
Short description of the command.

**Kind**: instance property of [<code>Command</code>](#exp_module_cli/command--Command)  
<a name="module_cli/command--Command.Command+builder"></a>

#### `command.builder`
Function that takes `yargs` instance and adds argument-specific help.

**Kind**: instance property of [<code>Command</code>](#exp_module_cli/command--Command)  
<a name="module_cli/command--Command.Command+handler"></a>

#### `command.handler`
Function that is called when the command is run.

**Kind**: instance property of [<code>Command</code>](#exp_module_cli/command--Command)  
<a name="module_cli/command--Command.Command+didRun"></a>

#### `command.didRun`
Did the command run? (Note: it will be `true` even if the
 [`handler`](#module_cli/command--Command.Command+handler) throws an
 exception).

**Kind**: instance property of [<code>Command</code>](#exp_module_cli/command--Command)  
<a name="module_cli/command--Command.Command+run"></a>

#### `command.run()`
Runs the command.

**Kind**: instance method of [<code>Command</code>](#exp_module_cli/command--Command)  
<a name="module_cli/command--Command+register"></a>

#### `command.register(yargs)`
Registers command into a `yargs` instance.

**Kind**: instance method of [<code>Command</code>](#exp_module_cli/command--Command)  
**Params**

- yargs <code>object</code> - `yargs` instance


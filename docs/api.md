## Modules

<dl>
<dt><a href="#module_cli/command">cli/command</a></dt>
<dd></dd>
<dt><a href="#module_cli">cli</a></dt>
<dd></dd>
<dt><a href="#module_utils/config">utils/config</a></dt>
<dd></dd>
</dl>

<a name="module_cli/command"></a>

## cli/command
**Example**  
```js
const Command = require('./cli/command');
```
<a name="exp_module_cli/command--Command"></a>

### Command ⏏
This class represents a CLI command.

**Kind**: Exported class  
**See**: [`yargs.command(module)`](https://github.com/yargs/yargs/blob/master/docs/api.md#commandmodule)  
<a name="module_cli"></a>

## cli
**Example**  
```js
const run = require('./cli');
```
<a name="exp_module_cli--run"></a>

### `run(argv)` ⏏
Runs the CLI.

**Kind**: Exported function  
**Params**

- argv <code>object</code> - program arguments

<a name="module_utils/config"></a>

## utils/config

* [utils/config](#module_utils/config)
    * [`loadConfig(projectDir)`](#exp_module_utils/config--loadConfig) ⇒ <code>Promise</code> ⏏
        * [`.Config`](#module_utils/config--loadConfig.Config) : <code>object</code>

<a name="exp_module_utils/config--loadConfig"></a>

### `loadConfig(projectDir)` ⇒ <code>Promise</code> ⏏
Finds and loads a configuration file.

**Kind**: Exported function  
**Fulfil**: <code>?loadConfig.Config</code> - `null` if no config file was found, an object otherwise  
**Params**

- projectDir <code>string</code> - path to a directory to start search from

<a name="module_utils/config--loadConfig.Config"></a>

#### `loadConfig.Config` : <code>object</code>
**Kind**: static typedef of [<code>loadConfig</code>](#exp_module_utils/config--loadConfig)  
**Properties**

| Name | Type |
| --- | --- |
| filePath | <code>string</code> | 
| data | <code>object</code> | 


/**
 * @module utils/config
 */

const cosmiconfig = require('cosmiconfig');

const explorer = cosmiconfig('web-app', {
  // name of the 'rc' file to look for
  rc: 'web-app.config',
  // allow extensions for 'rc' files (`.json`, `.yaml`, `.yml`, `.js`)
  rcExtensions: true,
  // name of the property in `package.json` to look for
  packageProp: 'webApp'
});

/**
 * @typedef Config
 * @static
 * @type     {object}
 * @property {string} filePath
 * @property {object} data
 */

/**
 * Finds and loads a configuration file.
 * @alias module:utils/config
 * @param   {string}  projectDir - path to a directory to start search from
 * @returns {Promise}
 * @fulfil  {?loadConfig.Config} - `null` if no config file was found, an object otherwise
 */
function loadConfig(projectDir) {
  return explorer.load(projectDir).then(
    result =>
      result && {
        filePath: result.filepath,
        data: result.config
      }
  );
}

module.exports = loadConfig;

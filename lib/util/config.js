const cosmiconfig = require('cosmiconfig');

const explorer = cosmiconfig('web-app', {
  // name of the 'rc' file to look for
  rc: 'web-app.config',
  // allow extensions for 'rc' files (`.json`, `.yaml`, `.yml`, `.js`)
  rcExtensions: true,
  // name of the property in `package.json` to look for
  packageProp: 'webApp'
});

function loadConfig(searchDirectory) {
  return explorer.load(searchDirectory).then(
    result =>
      result && {
        filePath: result.filepath,
        data: result.config
      }
  );
}

module.exports = {
  explorer,
  loadConfig
};

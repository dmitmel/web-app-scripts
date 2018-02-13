const cosmiconfig = require('cosmiconfig');

const explorer = cosmiconfig('web-app', {
  rc: 'web-app.config',
  rcExtensions: true,
  packageProp: 'webApp'
});

module.exports = function loadConfig(projectDir) {
  return explorer.load(projectDir).then(
    result =>
      result && {
        filePath: result.filepath,
        data: result.config
      }
  );
};

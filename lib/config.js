const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const findUp = require('find-up');
const fail = require('./fail');

const CONFIG_FILE_NAMES = [
  `web-app.config.js`,
  `web-app.config.yaml`,
  `web-app.config.json`,
  'package.json'
];

function loadConfig() {
  const configFile = findUp.sync(CONFIG_FILE_NAMES);
  return configFile ? loadConfigFile(configFile) : {};
}

function loadConfigFile(filePath) {
  const fileExt = path.extname(filePath);

  let data;

  try {
    // eslint-disable-next-line default-case
    switch (fileExt) {
      case '.js':
        data = require(filePath);
        break;

      case '.json':
        data = JSON.parse(fs.readFileSync(filePath));
        data = path.basename(filePath) === 'package.json' ? data.webApp : data;
        break;

      case '.yml':
      case '.yaml':
        data = yaml.safeLoad(fs.readFileSync(filePath));
        break;
    }
  } catch (err) {
    fail(`Cannot load config file: ${filePath}`, err);
    throw err;
  }

  data = data || {};

  return { filePath, data };
}

module.exports = {
  loadConfig,
  loadConfigFile
};

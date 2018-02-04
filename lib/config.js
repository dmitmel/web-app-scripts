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

  try {
    switch (fileExt) {
      case '.js':
        return require(filePath);

      case '.json': {
        const config = JSON.parse(fs.readFileSync(filePath));
        return path.basename(filePath) === 'package.json'
          ? config.webAppConfig || {}
          : config;
      }

      case '.yml':
      case '.yaml':
        return yaml.safeLoad(fs.readFileSync(filePath)) || {};

      default:
        return {};
    }
  } catch (err) {
    fail(`Cannot load config file: ${filePath}`, err);
    throw err;
  }
}

module.exports = {
  loadConfig,
  loadConfigFile
};

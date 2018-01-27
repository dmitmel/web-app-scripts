const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function loadConfig() {
  const configFile = findConfigFile(__dirname);
  return configFile ? loadConfigFile(configFile) : {};
}

const CONFIG_FILE_NAMES = [
  `web-app.config.js`,
  `web-app.config.json`,
  `web-app.config.yaml`,
  'package.json'
];

function findConfigFile(baseDir) {
  do {
    // eslint-disable-next-line no-loop-func
    const configFile = CONFIG_FILE_NAMES.find(file =>
      fs.existsSync(path.join(baseDir, file))
    );
    if (configFile != null) return configFile;

    baseDir = baseDir === '/' ? '' : path.dirname(baseDir);
  } while (baseDir);

  return null;
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
  } catch (e) {
    e.message = `Cannot load config file: ${filePath}\nError: ${e.message}`;
    throw e;
  }
}

module.exports = {
  loadConfig,
  findConfigFile,
  loadConfigFile
};

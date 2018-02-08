const path = require('path');
const loadConfig = require('./config');

module.exports = function findProject(cwd) {
  return loadConfig(cwd).then(
    config =>
      config && {
        directory: path.dirname(config.filePath),
        config
      }
  );
};

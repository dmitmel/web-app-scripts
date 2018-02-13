const path = require('path');
const loadConfig = require('./config');

module.exports = function findProject(cwd) {
  return loadConfig(cwd).then(config => {
    if (config) {
      const directory = path.dirname(config.filePath);
      return {
        directory,
        config,
        resolve: (...paths) => path.resolve(directory, ...paths)
      };
    }
    return config;
  });
};

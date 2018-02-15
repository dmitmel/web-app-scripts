const path = require('path');
const loadConfig = require('./config');

function findProject(searchDirectory) {
  return loadConfig(searchDirectory).then(config => {
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
}

module.exports = findProject;

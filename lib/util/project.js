const path = require('path');
const fail = require('./fail');
const config = require('./config');

function findProject(searchDirectory) {
  return config.loadConfig(searchDirectory).then(_config => {
    if (_config) {
      const directory = path.dirname(_config.filePath);
      return {
        directory,
        config: _config,
        resolve: (...paths) => path.resolve(directory, ...paths)
      };
    }
    return _config;
  });
}

class ProjectTask {
  constructor({ directory }) {
    this.directory = directory ? path.resolve(directory) : process.cwd();
  }

  run() {
    return findProject(this.directory).then(
      project => project || fail(`no project was found in ${this.directory}`)
    );
  }
}

module.exports = {
  findProject,
  ProjectTask
};

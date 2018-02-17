const path = require('path');
const fail = require('../util/fail');
const findProject = require('../util/project');

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

module.exports = ProjectTask;

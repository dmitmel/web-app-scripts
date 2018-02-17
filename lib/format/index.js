const path = require('path');
const klawSync = require('klaw-sync');
const { ProjectTask } = require('../util/project');

class FormatTask extends ProjectTask {
  run() {
    super.run().then(project => {
      const sourceDirectory = project.resolve('src');
      const sourceFiles = klawSync(sourceDirectory, {
        // ignore directories
        nodir: true,
        // filter only JavaScript files
        filter: ({ path: filePath }) => path.extname(filePath) === '.js'
      });

      // format sources files
      sourceFiles.forEach(({ path: filePath }) =>
        console.log(`Formatting ${filePath}...`)
      );
    });
  }
}

module.exports = FormatTask;

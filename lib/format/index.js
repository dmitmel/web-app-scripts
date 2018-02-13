const path = require('path');
const klawSync = require('klaw-sync');
const findProject = require('../project');

module.exports = function format({ projectDirectory }) {
  projectDirectory =
    projectDirectory && path.resolve(process.cwd(), projectDirectory);
  findProject(projectDirectory).then(project => {
    if (project) {
      const sourceDirectory = project.resolve('src');
      const sourceFiles = klawSync(sourceDirectory, {
        nodir: true,
        filter: ({ path: filePath }) => path.extname(filePath) === '.js'
      });

      sourceFiles.forEach(({ path: filePath }) =>
        console.log(`Formatting ${filePath}...`)
      );
    }
  });
};

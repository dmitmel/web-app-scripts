const path = require('path');
const fs = require('fs-extra');
const readline = require('readline');

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = function create({ directory, force }) {
  directory = path.resolve(process.cwd(), directory);
  console.log(`Creating a new project in ${directory}...`);

  const shouldOverwrite = file =>
    new Promise(resolve => {
      if (!force && fs.existsSync(file)) {
        const relativePath = path.relative(directory, file);
        input.question(`overwrite ${relativePath}? (y/N) `, answer =>
          resolve(/^(?:y|yes|true|1)$/i.test(answer))
        );
      } else {
        resolve(true);
      }
    });

  const createFile = (file, getContents) => {
    file = path.resolve(directory, file);
    return shouldOverwrite(file).then(
      overwrite => (overwrite ? fs.writeFile(file, getContents()) : null)
    );
  };

  createFile('hello', () => 'world')
    .then(() => createFile('world', () => 'hello'))
    .then(() => input.close());
};

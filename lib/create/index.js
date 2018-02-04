const path = require('path');
const fs = require('fs-extra');
const readline = require('readline');
const fail = require('../fail');

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => input.question(query, resolve));
}

module.exports = function create({ directory, force, name, description }) {
  directory = path.resolve(process.cwd(), directory);
  const directoryName = path.basename(directory);

  name = name || directoryName;

  const createProjectDirectory = () => {
    console.log(`Creating a new project in ${directory}...`);
    return fs.mkdirp(directory);
  };

  const createFile = (filePath, getContents) => {
    console.log(`Creating ${filePath}...`);

    const absFilePath = path.resolve(directory, filePath);

    const write = () => fs.writeFile(absFilePath, getContents());
    const askToOverwrite = () =>
      question(`overwrite ${filePath}? (y/N) `).then(answer =>
        /^(?:y|yes|true|1)$/i.test(answer)
      );

    return force
      ? write()
      : fs
          .exists(absFilePath)
          .then(exists => !exists || askToOverwrite())
          .then(overwrite => (overwrite ? write() : null));
  };

  const createPackageJson = () => {
    const repoUrl = `https://github.com/username/${directoryName}`;

    const data = {
      name,
      version: '0.1.0',
      private: true,
      description,
      repository: {
        type: 'git',
        url: repoUrl
      },
      bugs: `${repoUrl}/issues`,
      homepage: `${repoUrl}#readme`,
      author: 'Your Name <your.email@example.com>',
      license: 'MIT',
      scripts: {
        format: 'web-app-scripts format',
        lint: 'web-app-scripts lint',
        start: 'web-app-scripts start',
        build: 'web-app-scripts build'
      },
      dependencies: {},
      devDependencies: {}
    };
    return createFile('package.json', () => JSON.stringify(data, null, 2));
  };

  const createREADME = () =>
    createFile(
      'README.md',
      () => `# ${name}
${description ? `\n> ${description}\n` : ''}
<p align="center">
  <img src="https://via.placeholder.com/300x150" alt="logo">
</p>

## Why?

TODO

## Installation

\`\`\`bash
npm install -g ${name}
# or
yarn global add ${name}
\`\`\`

## Usage

\`\`\`
npm start -p
# or
yarn start -p
\`\`\`

## Features

TODO

## License

[MIT](LICENSE) © [Your Name](https://github.com/username)
`
    );

  createProjectDirectory()
    .then(createPackageJson)
    .then(createREADME)
    .catch(fail)
    .then(() => input.close());
};

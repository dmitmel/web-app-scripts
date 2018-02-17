const path = require('path');
const fs = require('fs-extra');
const readline = require('readline');
const fail = require('../util/fail');

class CreateTask {
  constructor(directory, { force, name, description }) {
    this.directory = path.resolve(directory);
    this.directoryName = path.basename(this.directory);
    this.force = force;
    this.name = name || this.directoryName;
    this.description = description;

    this._input = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  run() {
    return this._createProjectDirectory()
      .then(() => this._createPackageJson())
      .then(() => this._createREADME())
      .catch(fail)
      .then(() => this._input.close());
  }

  _createProjectDirectory() {
    console.log(`Creating a new project in ${this.directory}...`);
    return fs.mkdirp(this.directory);
  }

  _createPackageJson() {
    const repoUrl = `https://github.com/username/${this.directoryName}`;
    const data = {
      name: this.name,
      version: '0.1.0',
      private: true,
      description: this.description,
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
      devDependencies: {},
      webApp: {}
    };

    return this._createFile('package.json', () =>
      JSON.stringify(data, null, 2)
    );
  }

  _createREADME() {
    return this._createFile(
      'README.md',
      () => `# ${this.name}
${this.description ? `\n> ${this.description}\n` : ''}
<p align="center">
  <img src="https://via.placeholder.com/300x150" alt="logo">
</p>

## Why?

TODO

## Installation

\`\`\`bash
npm install -g ${this.name}
# or
yarn global add ${this.name}
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
  }

  _createFile(filePath, getContents) {
    console.log(`Creating ${filePath}...`);

    const absFilePath = path.resolve(this.directory, filePath);

    const write = () => fs.writeFile(absFilePath, getContents());
    const askToOverwrite = () =>
      new Promise(resolve =>
        this._input.question(`overwrite ${filePath}? (y/N) `, resolve)
      ).then(answer => /^(?:y|yes|true|1)$/i.test(answer));

    return this.force
      ? write()
      : fs
          .exists(absFilePath)
          .then(exists => !exists || askToOverwrite())
          .then(overwrite => (overwrite ? write() : null));
  }
}

module.exports = CreateTask;

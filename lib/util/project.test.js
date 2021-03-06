/* eslint-env jest */

const path = require('path');
const fs = require('fs-extra');
const tmp = require('tmp');
const project = require('./project');

describe('util/project', () => {
  // temporary project directory is created for each test to isolate them
  let projectDir;
  // function for removing `projectDir` and files inside it
  let cleanupProjectDir;

  beforeEach(() => {
    // create a project directory
    const tmpDir = tmp.dirSync({
      // cleanup the directory even if it is not empty
      unsafeCleanup: true
    });
    projectDir = tmpDir.name;
    cleanupProjectDir = tmpDir.removeCallback;
  });

  afterEach(() => cleanupProjectDir());

  describe('+ findProject(cwd)', () => {
    // generates test for returned value
    function testWithProject(name, callback) {
      test(name, () => {
        expect.assertions(1);
        return project.findProject(projectDir).then(callback);
      });
    }

    describe('> when project directory cannot be found', () => {
      testWithProject('returns `null`', project => expect(project).toBeNull());
    });

    describe('> when project directory is found', () => {
      // path to test config file inside `projectDir`
      let configFilePath;
      // test config data
      const CONFIG_DATA = { this: ['is', { a: 'test' }] };

      beforeEach(() => {
        // create a test config file
        configFilePath = path.join(projectDir, 'web-app.config.json');
        fs.writeJSONSync(configFilePath, CONFIG_DATA);
      });

      describe('it returns', () => {
        testWithProject('an object', config =>
          expect(typeof config).toBe('object')
        );

        testWithProject('with project directory', ({ directory }) =>
          expect(directory).toBe(projectDir)
        );

        testWithProject('with config', ({ config }) =>
          expect(typeof config).toBe('object')
        );

        testWithProject('with file resolver', ({ resolve }) =>
          expect(typeof resolve).toBe('function')
        );
      });

      describe('+ project.resolve(...paths)', () => {
        testWithProject('works correctly', ({ resolve }) =>
          expect(resolve('..', 'dir')).toBe(
            path.resolve(projectDir, '..', 'dir')
          )
        );
      });
    });
  });
});

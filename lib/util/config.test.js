/* eslint-env jest */

const path = require('path');
const fs = require('fs-extra');
const tmp = require('tmp');
const loadConfig = require('./config');

describe('config', () => {
  // There are just a few tests here because the `config` module uses
  // `cosmiconfig` library to resolve and load configs that already has a lot of
  // tests

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

  describe('+ loadConfig(projectDir)', () => {
    // generates test for returned value
    function testReturnedValue(name, callback) {
      test(name, () => {
        expect.assertions(1);
        return loadConfig(projectDir).then(callback);
      });
    }

    describe('> when config file cannot be found', () => {
      describe('it returns', () => {
        testReturnedValue('is null', config => expect(config).toBeNull());
      });
    });

    describe('> when config file is found', () => {
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
        testReturnedValue('is an object', config =>
          expect(typeof config).toBe('object')
        );

        testReturnedValue('has config file path', ({ filePath }) =>
          expect(filePath).toBe(configFilePath)
        );

        testReturnedValue('has config data', ({ data }) =>
          expect(data).toEqual(CONFIG_DATA)
        );
      });
    });
  });
});

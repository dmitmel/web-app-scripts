/* eslint-env jest */

const path = require('path');
const fs = require('fs-extra');
const tmp = require('tmp');
const { loadConfig, loadConfigFile } = require('./config');

const fixturesDir = path.resolve(__dirname, '..', 'fixtures');

describe('config', () => {
  describe('#loadConfig()', () => {
    let tmpFixturesDir;
    let cleanupTmpFixturesDir;

    beforeAll(() => {
      const { name, removeCallback } = tmp.dirSync({
        discardDescriptor: true,
        unsafeCleanup: true
      });
      tmpFixturesDir = name;
      cleanupTmpFixturesDir = removeCallback;

      fs.copySync(fixturesDir, tmpFixturesDir);
    });

    afterAll(cleanupTmpFixturesDir);

    it('returns `null` when config file cannot be found', () => {
      // given:
      const dir = path.resolve(tmpFixturesDir, '1');
      // when:
      const config = loadConfig(dir);
      // then:
      expect(config).toBeNull();
    });
  });

  describe('#loadConfigFile()', () => {
    const resolveConfigFile = (...paths) =>
      path.resolve(fixturesDir, 'configs', ...paths);

    function createFileTypeTest(fileType) {
      describe(`when it loads .${fileType} files`, () => {
        describe('return value', () => {
          // given:
          const filePath = resolveConfigFile('simple', `config.${fileType}`);

          it(`is an object`, () => {
            // when:
            const config = loadConfigFile(filePath);
            // then:
            expect(typeof config).toBe('object');
          });

          it('has config file path', () => {
            // when:
            const config = loadConfigFile(filePath);
            // then:
            expect(config).toHaveProperty('filePath');
            expect(typeof config.filePath).toBe('string');
            expect(config.filePath).toBe(filePath);
          });

          it('has config data', () => {
            // when:
            const config = loadConfigFile(filePath);
            // then:
            expect(config).toHaveProperty('data');
            expect(typeof config.data).toBe('object');
            expect(config.data).toEqual({
              type: fileType,
              hello: 'world'
            });
          });
        });

        it('correctly loads empty configs', () => {
          // given:
          const filePath = resolveConfigFile('empty', `config.${fileType}`);
          // when:
          const config = loadConfigFile(filePath);
          // then:
          expect(config.data).toEqual({});
        });
      });
    }

    createFileTypeTest('js');
    createFileTypeTest('yml');
    createFileTypeTest('yaml');
    createFileTypeTest('json');
  });
});

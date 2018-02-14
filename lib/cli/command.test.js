/* eslint-env jest */

const Command = require('./command');

describe('cli/command', () => {
  describe('+ Command', () => {
    const name = 'hello';
    const description = 'description';
    const args = ['world'];

    describe('+ new Command(options)', () => {
      it('sets `didRun` to `false`', () => {
        // when:
        const command = new Command();
        // then:
        expect(command.didRun).toBe(false);
      });

      describe('> when no options are provided', () => {
        it('uses default options', () => {
          // when:
          const command = new Command();
          // then:
          expect(command.name).toBe('');
          expect(command.description).toBe('');
          expect(typeof command.builder).toBe('function');
          expect(typeof command.handler).toBe('function');
        });
      });

      describe('> when options are provided', () => {
        it('saves data from options', () => {
          // when:
          const command = new Command({
            name,
            description,
            builder: () => {},
            handler: () => {}
          });
          // then:
          expect(command.name).toBe(name);
          expect(command.description).toBe(description);
          expect(typeof command.builder).toBe('function');
          expect(typeof command.handler).toBe('function');
        });
      });
    });

    describe('+ command.run(args)', () => {
      it('calls handler', () => {
        // given:
        const handler = jest.fn();
        const command = new Command({ handler });
        // when:
        command.run(args);
        // then:
        expect(handler).toBeCalledWith(args);
      });

      describe('> when handler runs successfully', () => {
        it('sets `didRun` to `true`', () => {
          // given:
          const command = new Command();
          // when:
          command.run(args);
          // then:
          expect(command.didRun).toBe(true);
        });

        it('returns value returned from the handler', () => {
          // given:
          const value = 123;
          const command = new Command({ handler: () => value });
          // when:
          const result = command.run(args);
          // then:
          expect(result).toBe(value);
        });
      });

      describe('> when handler throws an error', () => {
        it('sets `didRun` to `true`', () => {
          // given:
          const error = new Error('my error');
          const command = new Command({
            handler: () => {
              throw error;
            }
          });

          try {
            // when:
            command.run(args);
          } catch (e) {
            // then:
            expect(command.didRun).toBe(true);
          }
        });
      });
    });

    describe('+ command.register(yargs)', () => {
      it('calls `yargs.command` correctly', () => {
        // given:
        const command = new Command({
          name,
          description,
          builder: () => {},
          handler: () => {}
        });

        const yargsMock = {
          command(_name, _description, _builder, _handler) {
            // then:
            expect(_name).toBe(command.name);
            expect(_description).toBe(command.description);
            expect(_builder).toBe(command.builder);
            expect(_handler).toBe(command.run);
          }
        };

        // when:
        command.register(yargsMock);
      });
    });
  });
});

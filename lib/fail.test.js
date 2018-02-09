/* eslint-env jest */

const fail = require('./fail');

// custom error for testing purposes
class TestError extends Error {}

describe('fail', () => {
  describe('+ fail(msg, err)', () => {
    function testError(name, args, expectedError) {
      it(name, () => {
        expect(() => fail(...args)).toThrowError(expectedError);
      });
    }

    describe('> when nothing is provided', () => {
      describe('it throws', () => {
        testError('an error');
      });
    });

    describe('> when only message is provided', () => {
      describe('it throws', () => {
        testError('an error with provided message', ['my error'], /^my error$/);
      });
    });

    describe('> when only error is provided', () => {
      describe('it throws', () => {
        testError(
          'provided error',
          [null, new TestError('my error')],
          TestError
        );
      });
    });

    describe('> when both message and error are provided', () => {
      describe('it throws', () => {
        const args = ['my', new TestError('error')];
        testError('provided error', args, TestError);
        testError(
          'provided error with the provided message added',
          args,
          /^my\nerror$/m
        );
        testError(
          "doesn't add provided message if it is the same as the provided " +
            "error's message",
          ['my error', new TestError('my error')],
          /^my error$/
        );
      });
    });
  });
});

function fail(msg, err) {
  msg = msg != null ? msg : '';
  err = err != null ? err : new Error(msg);

  if (msg.length && msg !== err.message) err.message = `${msg}\n${err.message}`;

  throw err;
}

/* istanbul ignore next */
process.on('unhandledRejection', error => fail(null, error));

module.exports = fail;

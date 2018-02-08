function fail(msg, err) {
  msg = msg != null ? msg : '';
  err = err != null ? err : new Error(msg);

  if (msg != null && msg !== err.message)
    err.message = `${msg}\n${err.message}`;

  throw err;
}

process.on('unhandledRejection', error => fail(null, error));

module.exports = fail;

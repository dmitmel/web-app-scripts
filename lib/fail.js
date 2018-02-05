function fail(msg, err) {
  err = err || new Error(msg);
  if (msg !== err.message) err.message = `${msg}\n${err.message}`;

  throw err;
}

process.on('unhandledRejection', error => fail(null, error));

module.exports = fail;

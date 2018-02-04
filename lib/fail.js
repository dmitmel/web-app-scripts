function formatError({ name, message, stack }) {
  let str = '';
  if (stack) {
    str += stack;
  } else {
    if (name) str += `${name}: `;
    str += message;
  }
  return str;
}

function fail(msg, err) {
  err = err || new Error(msg);
  if (msg !== err.message) err.message = `${msg}\n${err.message}`;

  console.error(formatError(err));
  process.exit(1);
}

process.on('unhandledRejection', error => fail(null, error));

module.exports = fail;

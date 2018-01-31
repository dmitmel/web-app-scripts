const path = require('path');
const yargs = require('yargs');

module.exports = function fail(msg, err) {
  const scriptName = path.basename(yargs.$0);

  console.error(`${scriptName}: ${msg || 'error'}`);
  err && console.error(err);
  console.error();
  console.error(`Try '${scriptName} --help' for more information.`);
};

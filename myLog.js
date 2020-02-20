const chalk = require("chalk");

exports.logSocket = (function() {
  var context = chalk.blue("Socket:");
  return Function.prototype.bind.call(console.log, console, context);
})();

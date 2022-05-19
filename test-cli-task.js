const Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path'),
    glob = require('glob')

module.exports = function() {
  // Instantiate a Mocha instance.
  var mocha = new Mocha({});
  
  // Turn off type checking for now
  require("ts-node").register({ transpileOnly: true })
  require("jsdom-global/register")
  require('ignore-styles')
  require("handlebars")

  var files = glob.sync("test/**/*Tests.ts").concat(glob.sync("test/**/*Tests.tsx")).concat(glob.sync("test/**/*Tests.js"))

  for (var file of files) {
    mocha.addFile(file)
  }

  // Run the tests.
  mocha.run(function(failures) {
     process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
  });
}

// mocha -r -r $DIR/node_modules/ts-node/register -r $DIR/node_modules/jsdom-global/register --require ignore-styles --recursive "test/**/*Tests.ts"
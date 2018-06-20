const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const glob = require('glob')

module.exports = function() {
  var webpackConfig = {
    entry: [],
    devtool: "eval",
    output: {
      filename: 'bundle.js',
      path: __dirname
    },
    module: {
      rules: [
        { test: /\.coffee$/, loader: ["coffee-loader"] },
        { test: /\.hbs$/, loader: "handlebars-loader" }
      ]
    },
    resolve: {
      extensions: [".coffee", ".js", ".json"]
    },
    mode: "development"
  }

  // Find all files
  webpackConfig.entry = "./test/index.js"

  compiler = webpack(webpackConfig)

  new WebpackDevServer(compiler, { contentBase: path.join(__dirname, "assets") }).listen(8081, "localhost", function(err) {
    if (err)
      throw err

    // Server listening
    console.log("http://localhost:8081/mocha.html")
  })


  // // Find all files
  // glob("./test/**/*Tests.coffee", {}, function (err, files) {
  //   webpackConfig.entry = files.map(f => "mocha-loader!" +  f)

  //   compiler = webpack(webpackConfig)

  //   new WebpackDevServer(compiler, { contentBase: path.join(__dirname, "assets") }).listen(8081, "localhost", function(err) {
  //     if (err)
  //       throw err

  //     // Server listening
  //     console.log("http://localhost:8081/mocha.html")
  //   })
  // })


}
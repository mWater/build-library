const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const glob = require('glob')

module.exports = function() {
  var webpackConfig = {
    entry: ["./test/index.js"],
    mode: "development",
    output: {
      filename: 'bundle.js',
      path: __dirname
    },
    module: {
      rules: [
        { test: /\.coffee$/, use: [{ loader: "coffee-loader" }]},
        { test: /\.hbs$/, use: [{ loader: "handlebars-loader" }] },
        { test: /\.css$/, use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
        ]},
        { test: /\.(ts|tsx)$/, use: [
          { loader: 'ts-loader' }
        ]},
        {   
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        }      
      ]
    },
    resolve: {
      extensions: [".coffee", ".js", ".json", ".tsx", ".ts"]
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, "node_modules")]
    }
  }

  compiler = webpack(webpackConfig)

  new WebpackDevServer(compiler, { contentBase: path.join(__dirname, "assets") }).listen(8081, "localhost", function(err) {
    if (err)
      throw err

    // Server listening
    console.log("http://localhost:8081/mocha.html")
  })
}
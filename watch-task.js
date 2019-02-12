const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

module.exports = function() {
  var webpackConfig = {
    entry: ['./src/demo.coffee'],
    mode: "development",
    output: {
      filename: 'demo.js',
      publicPath: 'http://localhost:3001/'
    },
    module: {
      rules: [
        { test: /\.coffee$/, use: [
          { loader: "coffee-loader",  options: { 
            transpile: { presets: ['@babel/preset-env'] } }
          }
        ]},
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
    externals: {
      jquery: "$",
      xlsx: "XLSX"
    },
    // Resolve in way that works whether loaders are at root or not of node_modules
    resolveLoader: {
      modules: [path.resolve(__dirname, "node_modules"), path.resolve(process.cwd(), "node_modules")]
    }
  }

  compiler = webpack(webpackConfig)

  new WebpackDevServer(compiler, { contentBase: path.join(__dirname, "assets") }).listen(3001, "localhost", function(err) {
    if (err)
      throw err

    // Server listening
    console.log("http://localhost:3001/index.html")
  })
}

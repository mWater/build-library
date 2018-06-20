const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

module.exports = function() {
  var webpackConfig = {
    entry: ['./src/demo.coffee'],
    devtool: "eval",
    output: {
      filename: 'demo.js',
      publicPath: 'http://localhost:3001/'
    },
    module: {
      rules: [
        {
          test: /\.coffee$/,
          use: 'coffee-loader'
        },
        {   
          test: /\.hbs$/,
          loader: "handlebars-loader" 
        },
        {
          test: /\.css$/,
          loader: ['style-loader', 'css-loader']
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          use: ['file-loader']
        }        
      ]
    },
    resolve: {
      extensions: [".coffee", ".js", ".json"]
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, "node_modules")]
    },
    mode: "development"
  }

  compiler = webpack(webpackConfig)

  new WebpackDevServer(compiler, { contentBase: path.join(__dirname, "assets") }).listen(3001, "localhost", function(err) {
    if (err)
      throw err

    // Server listening
    console.log("http://localhost:3001/index.html")
  })
}

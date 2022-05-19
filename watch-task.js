const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const fs = require('fs')

let entry = ""

if (fs.existsSync("./src/demo.tsx")) {
  entry = "./src/demo.tsx"
}
else if (fs.existsSync("./src/demo.ts")) {
  entry = "./src/demo.ts"
}
else if (fs.existsSync("./src/demo.js")) {
  entry = "./src/demo.js"
}
else {
  throw new Error("Entry not found")
}

module.exports = function() {
  var webpackConfig = {
    entry: [entry],
    mode: "development",
    output: {
      filename: 'demo.js',
      publicPath: 'http://localhost:3001/'
    },
    module: {
      rules: [
        { test: /\.hbs$/, use: [{ loader: "handlebars-loader" }] },
        { test: /\.css$/, use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
        ]},
        { 
          test: /\.(ts|tsx|js)$/, 
          exclude: /(node_modules|bower_components)/,
          use: [
            { 
              loader: 'ts-loader',
              options: { transpileOnly: true }
            }
          ]
        },
        {
          test: /\.(ttf|eot|woff|woff2|svg)(\?\S*)?$/,
          use: {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
            },
          },
        },        
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
      extensions: [".js", ".json", ".tsx", ".ts"]
    },
    externals: {
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

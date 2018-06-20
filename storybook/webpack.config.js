const path = require("path");

module.exports = {
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
    modules: [path.resolve(__dirname, "../node_modules")]
  }
}
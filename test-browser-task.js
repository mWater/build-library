const glob = require('glob')
const esbuild = require("esbuild")

module.exports = function() {
  console.error("NOT CURRENTLY WORKING")
  // const entryPoints = glob.sync("tests/**/*Tests.ts*")
  // console.log(entryPoints)

  // esbuild.serve(
  //   {
  //     host: "localhost",
  //     port: 8088,
  //     servedir: __dirname + "/assets"
  //   },
  //   {
  //     write: false,
  //     entryPoints: glob.sync("test/**/*Tests.ts*"),
  //     outfile: __dirname + "/assets/bundle.js",
  //     sourcemap: true,
  //     sourcesContent: true,
  //     bundle: true,
  //     target: "es2017",
  //     plugins: [],
  //     define: {
  //       "process.env.NODE_ENV": '"development"',
  //       global: "window",
  //       "process.env": "{}"
  //     },
  //     minify: false,
  //     loader: {
  //       ".png": "dataurl"
  //     }
  //   }).then(result => {
  //     // Server listening
  //     console.log("http://localhost:8088/mocha.html")
  //   }).catch(err => {
  //     console.error(err.message)
  //   })
}


// module.exports = function() {
//   var webpackConfig = {
//     entry: ["./test/index.js"],
//     mode: "development",
//     output: {
//       filename: 'bundle.js',
//       path: __dirname
//     },
//     module: {
//       rules: [
//         { test: /\.hbs$/, use: [{ loader: "handlebars-loader" }] },
//         { test: /\.css$/, use: [
//             { loader: "style-loader" },
//             { loader: "css-loader" }
//         ]},
//         { test: /\.(ts|tsx)$/, use: [
//           { loader: 'ts-loader' }
//         ]},
//         {   
//           test: /\.(png|jpg|gif)$/i,
//           use: [
//             {
//               loader: 'url-loader',
//               options: {
//                 limit: 8192
//               }
//             }
//           ]
//         }      
//       ]
//     },
//     resolve: {
//       extensions: [".js", ".json", ".tsx", ".ts"]
//     },
//     // Resolve in way that works whether loaders are at root or not of node_modules
//     resolveLoader: {
//       modules: [path.resolve(__dirname, "node_modules"), path.resolve(process.cwd(), "node_modules")]
//     }
//   }

//   compiler = webpack(webpackConfig)

//   new WebpackDevServer(compiler, { contentBase: path.join(__dirname, "assets") }).listen(8081, "localhost", function(err) {
//     if (err)
//       throw err

//     // Server listening
//     console.log("http://localhost:8081/mocha.html")
//   })
// }
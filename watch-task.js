const fs = require('fs')
const esbuild = require("esbuild")

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
  esbuild.serve(
    {
      host: "localhost",
      port: 3001,
      servedir: __dirname + "/assets"
    },
    {
      write: false,
      entryPoints: [entry],
      outfile: __dirname + "/assets/demo.js",
      sourcemap: true,
      sourcesContent: true,
      bundle: true,
      target: "es2017",
      plugins: [],
      define: {
        "process.env.NODE_ENV": '"development"',
        global: "window",
        "process.env": "{}"
      },
      minify: false,
      loader: {
        ".png": "dataurl"
      }
    }).then(result => {
      // Server listening
      console.log("http://localhost:3001/index.html")
    }).catch(err => {
      console.error(err.message)
    })
}

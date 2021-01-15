const fs = require('fs')
const gulp = require('gulp')
const coffee = require('gulp-coffee')
const ts = require('gulp-typescript')
const extractor = require('ez-localize/extractor')
const presetEnv = require('@babel/preset-env')
const pluginTransformRuntime = require("@babel/plugin-transform-runtime")

module.exports = function(done) {
  // Compile coffeescript
  function coffeeTask() {
    return gulp.src('./src/**/*.coffee')
      .pipe(coffee({ bare: true, transpile: { 
        "presets": [presetEnv],
        "plugins": [pluginTransformRuntime]
      }}))
      .pipe(gulp.dest('./lib/'))
  }

  // Compile typescript
  function typescriptTask() {
    return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
    .pipe(ts(JSON.parse(fs.readFileSync("tsconfig.json")).compilerOptions))
    .pipe(gulp.dest('./lib/'))
  }

  // Copy non-coffeescript files
  function copyTask() {
    return gulp.src(['./src/**/*.js', './src/**/*.hbs', './src/**/*.css', './src/**/*.txt', './src/**/*.d.ts', './src/**/*.json', './src/**/*.png'])
      .pipe(gulp.dest('./lib/'))
  }
  function localizeTask(cb) {
    console.log("Localizing...")
    extractor.updateLocalizationFile(["src"], "localizations.json", {}, function() { cb() })
  }  
  // Handle gulp errors
  gulp.on("error", function() { console.error("An error occurred") })

  if (fs.existsSync("localizations.json"))
    gulp.parallel(coffeeTask, copyTask, typescriptTask, localizeTask)(done)
  else
    gulp.parallel(coffeeTask, copyTask, typescriptTask)(done)
}

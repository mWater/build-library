const gulp = require('gulp')
const coffee = require('gulp-coffee')
const ts = require('gulp-typescript')
const extractor = require('ez-localize/extractor')

module.exports = function(done) {
  // Compile coffeescript
  function coffeeTask() {
    return gulp.src('./src/**/*.coffee')
      .pipe(coffee({ bare: true, transpile: { 
        "presets": ["env"],
        "plugins": ["babel-plugin-transform-runtime"]
      }}))
      .pipe(gulp.dest('./lib/'))
  }

  // Compile typescript
  function typescriptTask() {
    return gulp.src('src/**/*.ts')
    .pipe(ts({
      noImplicitAny: true
    }))
    .pipe(gulp.dest('./lib/'))
  }

  // Copy non-coffeescript files
  function copyTask() {
    return gulp.src(['./src/**/*.js', './src/**/*.hbs', './src/**/*.css', './src/**/*.txt'])
      .pipe(gulp.dest('./lib/'))
  }
  function localizeTask(cb) {
    console.log("Localizing...")
    options = { extensions: ['.js', '.coffee'], transform: [coffeeify, hbsfy] }
    extractor.updateLocalizationFile("src/index.coffee", "localizations.json", options, function() { cb() })
  }  
  // Handle gulp errors
  gulp.on("error", function() { console.error("An error occurred") })

  if (fs.existsSync("localizations.json"))
    gulp.parallel(coffeeTask, copyTask, typescriptTask, localizeTask)(done)
  else
    gulp.parallel(coffeeTask, copyTask, typescriptTask)(done)
}

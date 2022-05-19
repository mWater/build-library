const fs = require('fs')
const gulp = require('gulp')
const ts = require('gulp-typescript')
const extractor = require('ez-localize/extractor')

module.exports = function(done) {
  // Compile typescript
  function typescriptTask() {
    return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
    .pipe(ts(JSON.parse(fs.readFileSync("tsconfig.json")).compilerOptions))
    .pipe(gulp.dest('./lib/'))
  }

  // Copy non-typescript files
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
    gulp.parallel(copyTask, typescriptTask, localizeTask)(done)
  else
    gulp.parallel(copyTask, typescriptTask)(done)
}

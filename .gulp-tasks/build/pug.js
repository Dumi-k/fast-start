module.exports = (gulp, $, argv) => {
  if (global.CONFIG.server) {
    gulp.task('build:pug', (done) => gulp.src(`${global.CONFIG.src}/views/**/*.pug`)
      .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/views/`)))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe(gulp.dest(`${global.CONFIG.dist}/views/`))
      .pipe($.touchCmd())
    )
  } else {
    gulp.task('build:pug', (done) => gulp.src([
      `${global.CONFIG.src}/views/**/*.pug`,
      `!${global.CONFIG.src}/views/**/_*.pug`
    ])
      .pipe($.if(!argv.all, $.changed(global.CONFIG.dist, {
        hasChanged: $.changedEnhancements.compareLastModifiedTimePugDeps,
        extension: '.html'
      })))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(!argv.production, $.pug({
        pretty: true
      })))
      .pipe($.if(argv.production, $.pug()))
      .pipe(gulp.dest(global.CONFIG.dist))
      .pipe($.touchCmd())
    )
  }
}

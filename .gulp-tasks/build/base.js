'use strict'
const $ = require('gulp-load-plugins')()
const argv = require('yargs').argv

module.exports = function (gulp) {
  gulp.task('build:base', (done) => {
    return gulp.src([
      global.CONFIG.src + '/**',
      '!' + global.CONFIG.src + '/.git/**',
      '!' + global.CONFIG.src + '/.git/',
      '!' + global.CONFIG.src + '/dist/**',
      '!' + global.CONFIG.src + '/dist/',
      '!' + global.CONFIG.src + '/build/**',
      '!' + global.CONFIG.src + '/build/',
      '!' + global.CONFIG.src + '/tests/**',
      '!' + global.CONFIG.src + '/tests/',
      '!' + global.CONFIG.src + '/node_modules/**',
      '!' + global.CONFIG.src + '/node_modules/',
      '!' + global.CONFIG.src + '/bower_components/**',
      '!' + global.CONFIG.src + '/bower_components/',
      '!' + global.CONFIG.src + '/views/**',
      '!' + global.CONFIG.src + '/views/',
      '!' + global.CONFIG.src + '/assets/**',
      '!' + global.CONFIG.src + '/assets/'
    ], {
      base: global.CONFIG.src + '/'
    })
      .pipe($.if(!argv.all, $.changed(global.CONFIG.dist + '/')))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe(gulp.dest(global.CONFIG.dist))
      .pipe($.touch())
  })
}

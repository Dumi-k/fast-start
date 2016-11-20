'use strict'
const gulp = require('gulp')

global.CONFIG = require('./.gulp-tasks/_genConfig.js')

require('./.gulp-tasks/build')(gulp)
require('./.gulp-tasks/deploy')(gulp)
require('./.gulp-tasks/fix')(gulp)
require('./.gulp-tasks/lint')(gulp)
require('./.gulp-tasks/server')(gulp)
require('./.gulp-tasks/update')(gulp)
require('./.gulp-tasks/watch')(gulp)
require('./.gulp-tasks/switch')(gulp)

gulp.task('build', gulp.series(
  'build:base',
  'build:css',
  'build:fonts',
  'build:img',
  'build:js',
  'build:pug',
  'build:html',
  'build:njk'
))

gulp.task('deploy', gulp.series(
  'deploy:rsync'
))

gulp.task('fix', gulp.series(
  'fix:css',
  'fix:js',
  'fix:json',
  'fix:html'
))

gulp.task('lint', gulp.series(
  'lint:css',
  'lint:js',
  'lint:json',
  'lint:pug',
  'lint:html'
))

gulp.task('server', gulp.series(
    'run',
    'bs'
))

gulp.task('self-update', gulp.series(
  'self-update:git'
))

gulp.task('switch', gulp.series(
  'switch:project'
))

gulp.task('default',
  gulp.series(
    'build',
    'server',
    'watch'
  )
)

var NyanReporter = require('faucet')
var tape = require('gulp-tape')
gulp.task('test', function () {
  return gulp.src(global.CONFIG.src + '/tests/**/*.js')
    .pipe(tape({
      reporter: NyanReporter()
    }))
})


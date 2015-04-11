var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cache = require('gulp-cache'),
  del = require('del'),
  runSequence = require('run-sequence');

// Grabs the directory paths inside the package.json file
var pkg = require('./package.json');
var dirs = pkg['gbp-configs'].directories;

gulp.task('styles', function() {
  return sass(dirs.lib + '/scss/', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(dirs.dist + '/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(dirs.dist + '/css'))
});

gulp.task('scripts', function() {
  return gulp.src(dirs.lib + '/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(dirs.dist + '/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(dirs.dist + '/js'))
});

gulp.task('clean', function(cb) {
  del([dirs.dist], cb)
});

gulp.task('default', ['clean'], function(callback) {
  runSequence('styles',
              'scripts',
              callback);
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(dirs.lib + '/scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch(dirs.lib + '/js/**/*.js', ['scripts']);

});

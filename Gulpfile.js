var gulp            = require('gulp');
var changed         = require('gulp-changed');
var sass            = require('gulp-sass');
var cssmin          = require('gulp-minify-css');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var notify          = require('gulp-notify');
var plumber         = require('gulp-plumber');
var imagemin        = require('gulp-imagemin');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var nodemon         = require('gulp-nodemon');

var del             = require('del');
var argv            = require('yargs').argv;
var runsequence     = require('run-sequence');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;

var plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: "Error: <%= error.message %>"
  })
};

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', ['watch'], function (cb) {
  var called = false;
  return nodemon({
    script: 'index.js',
    watch: ['index.js']
  })
    .on('start', function() {
      if (!called) {cb();}
      called = true;
    })
    .on('restart', function() {
      setTimeout(function() {
        browserSync.reload({stream: false});
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init({
    files: ['public/**/*.*', 'views/**/*.ejs'],
    proxy: {
      target: 'http://localhost:3000',
      we: true
    },
    serveStatic: ['public/scripts', 'public/styles'],
    port: 4000,
    browser: ['google-chrome']
  });
});

gulp.task('styles', function() {
  return gulp.src(['dev/styles/main.scss'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(sourcemaps.init())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(autoprefixer({ browsers: ['last 2 versions', 'ie >= 10'] }))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/styles/'));
});

gulp.task('scripts', function() {
  return gulp.src(['dev/scripts/modules/*.js', 'dev/scripts/init.js'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/scripts/'));
});

gulp.task('imagemin', function() {
  return gulp.src(['dev/images/*'])
    .pipe(changed('public/images/'))
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('public/images/'));
});

gulp.task('copy', function() {
  return gulp.src(['dev/markup/**/*.ejs'], {base: 'dev/markup'})
    .pipe(plumber(plumberErrorHandler))
    .pipe(changed('views/'))
    .pipe(gulp.dest('views/'));
});

gulp.task('server', function() {
  return gulp.src(['dev/scripts/server/index.js'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(gulp.dest('./'));
});

gulp.task('clean', function(cb) {
    del(['index.js', 'public/', 'views/'], cb);
});

gulp.task('build', ['clean'], function(cb) {
  runsequence(['copy', 'server', 'styles', 'scripts', 'imagemin'], cb);
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['dev/styles/**/*.scss'], ['styles']);
  gulp.watch(['dev/scripts/modules/*.js', 'dev/scripts/init.js'], ['scripts']);
  gulp.watch(['dev/images/*'], ['imagemin']);
  gulp.watch(['dev/markup/**/*'], ['copy']);
  gulp.watch(['dev/scripts/server/index.js'], ['server']);
});

gulp.task('default', ['clean', 'build', 'watch', 'nodemon', 'browser-sync']);

var gulp            = require('gulp');
var changed         = require('gulp-changed');
var sass            = require('gulp-sass');
var cssmin          = require('gulp-minify-css');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var react           = require('gulp-react');
var notify          = require('gulp-notify');
var plumber         = require('gulp-plumber');
var imagemin        = require('gulp-imagemin');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');

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

var browswerSyncConfig = {
  client: {
    server: {
      baseDir: ['deploy']
    },
    host: 'localhost',
    port: 1337,
    files: [ 'deploy/*.html', 'deploy/public/styles/*.css', 'deploy/public/scripts/*.js'],
    browser: 'google chrome',
    notify: false
  },
  server: {
    proxy: "localhost:3000",
    files: [ 'deploy/*.html', 'deploy/*.js', 'deploy/public/styles/*.css', 'deploy/public/scripts/*.js'],
    browser: 'google chrome',
    notify: false
  }
};

gulp.task('browser-sync', function() {
  var bsConfig = browswerSyncConfig.server;
  if (argv.env === 'client') {
    bsConfig = browswerSyncConfig.client;
  }
  browserSync(bsConfig, function(err, bs) {
    if (!err) {
      console.log('Congratulations, you\'ve won!');
    }
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
    .pipe(gulp.dest('public/styles/'))
    .pipe(reload({ stream:true }));
});

gulp.task('scripts', function() {
  return gulp.src(['dev/scripts/modules/*.js', 'dev/scripts/init.js'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/scripts/'))
    .pipe(reload({ stream:true }));
});

gulp.task('imagemin', function() {
  return gulp.src(['dev/images/*'])
    .pipe(changed('public/images'))
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('public/images'));
});

gulp.task('copy', function() {
  return gulp.src(['dev/markup/**/*'], {base: 'dev/markup'})
    .pipe(plumber(plumberErrorHandler))
    .pipe(changed('views/'))
    .pipe(gulp.dest('views/'))
    .pipe(reload({ stream:true }));
});

gulp.task('server', function() {
  return gulp.src(['dev/scripts/server/*.js'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(sourcemaps.init())
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
    .pipe(reload({ stream:true }));
});

gulp.task('react', function() {
  return gulp.src(['dev/scripts/**/*.jsx'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(react())
    .pipe(gulp.dest('dev/scripts/'));
});

gulp.task('clean', function(cb) {
    del(['./index.js', 'public/'], cb);
});

gulp.task('build', ['clean'], function(cb) {
  runsequence(['copy', 'server', 'react', 'styles', 'scripts', 'imagemin'], cb);
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['dev/scripts/**/*.js'], ['scripts']);
  gulp.watch(['dev/scripts/**/*.jsx'], ['react']);
  gulp.watch(['dev/styles/**/*.scss'], ['styles']);
  gulp.watch(['dev/assets/*'], ['assets']);
  gulp.watch(['dev/*.html', 'dev/index.js'], ['copy']);
  gulp.watch(['dev/scripts/server/index.js'], ['server']);
});

gulp.task('default', ['clean', 'build', 'watch', 'browser-sync']);

var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var header = require('gulp-header');
var size = require('gulp-size');
var connect = require('gulp-connect');

var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');


var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');
var onError = function (err) {
  gutil.beep();
  console.log(err);
  console.log('*****MESSAGE*****');
  console.log(err.message);
};
var paths = {
  index: './index.jade',
  jade: ['./partials/jade/*.jade', './partials/jade/**/*.jade'],
  scripts: ['./js/app/*.js', './js/app/**/*.js'],
  sass: ['./css/sass/*.sass', './css/sass/**/*.sass'],
  images: './img/**/*'

};


/**
 * Compile JADE into HTML
 */
gulp.task('jade', function () {
  gulp.src(paths.jade)
    .pipe(connect.reload())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jade({
      pretty: false
    }))
    .pipe(gulp.dest('../public/partials/'))
});
gulp.task('jade:index', function () {
  gulp.src(paths.index)
    .pipe(connect.reload())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jade({
      pretty: false
    }))
    .pipe(gulp.dest('../public/partials/'))
});

/**
 * Concat app scripts
 */
gulp.task('scripts', function () {
  gulp.src(paths.scripts)
    .pipe(connect.reload())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('built.js'))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(size({title: 'built.js'}))
    .pipe(gulp.dest('../public/js/dist/'))
    .pipe(rename('built.min.js'))
    .pipe(uglify())
    .pipe(size({title: 'built.min.js'}))
    .pipe(gulp.dest('../public/js/dist/'))
});

/**
 * Compile SASS files
 */
gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(connect.reload())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      quiet: true,
      lineNumbers: true,
      bundleExec: false,
      loadPath: require('node-neat').includePaths
    }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(size({title: 'main.css'}))
    .pipe(gulp.dest('../public/css/'))
    .pipe(rename('main.min.css'))
    .pipe(minifyCSS())
    .pipe(size({title: 'main.min.css'}))
    .pipe(gulp.dest('../public/css/'))
});


/**
 * Minify images
 */
gulp.task('images', function(){
  gulp.src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest('../public/img/'));
});

/**
 *Watch files
 */
gulp.task('watch:jade', function () {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.index, ['jade:index']);
});
gulp.task('watch:scripts', function () {
  gulp.watch(paths.scripts, ['scripts']);
});
gulp.task('watch:sass', function () {
  gulp.watch(paths.sass, ['sass']);
});
gulp.task('watch:dev', ['watch:jade', 'watch:scripts', 'watch:sass']);



/**
 * Default task
 */
gulp.task('buildAssets', ['jade', 'jade:index', 'scripts', 'sass']);
gulp.task('default', ['buildAssets', 'watch:dev']);
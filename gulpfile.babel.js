// Gulp settings
// ---------------------------------------------------------

const settings = {
  scripts: true, // Turn on/off script tasks
  styles: true // Turn on/off style tasks
};

// Gulp packages
// ---------------------------------------------------------

// General
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const header = require('gulp-header');
const minify = require('gulp-htmlmin');
const babel = require('gulp-babel');
const pkg = require('./package.json');

// Scripts
const concat = settings.scripts ? require('gulp-concat') : null;
const uglify = settings.scripts ? require('gulp-uglify') : null;

// Styles
const sass = settings.styles ? require('gulp-sass') : null;
const prefix = settings.styles ? require('gulp-autoprefixer') : null;

// Path to project folders
// ---------------------------------------------------------

const paths = {
  scripts: {
    input: [
      './assets/scripts/vendor/**/*.js',
      './assets/scripts/*.js'
    ],
    output: './assets/scripts/'
  },
  styles: {
    watch: './assets/styles/**/*.scss',
    input: './assets/styles/index.scss',
    output: './assets/styles/'
  },
  markup: {
    input: './site/**/*.html',
    output: './site/'
  }
}

// Template for banner used in file headers
// ---------------------------------------------------------

const banner = (
  '/*!' +
  ' <%= pkg.name %> v<%= pkg.version %>' +
  ' | <%= pkg.repository.url %>' +
  ' */\n'
);

// Gulp tasks
// ---------------------------------------------------------

// Build production ready JS
gulp.task('build:scripts', function() {
  if (!settings.scripts) return;

  return gulp.src(paths.scripts.input)
  .pipe(plumber())
  .pipe(concat('bundle.js'))
  .pipe(babel())
  .pipe(uglify())
  .pipe(header(banner, { pkg: pkg }))
  .pipe(gulp.dest(paths.scripts.output))
});

// Build production ready CSS
gulp.task('build:styles', function() {
  if (!settings.styles) return;

  return gulp.src(paths.styles.input)
  .pipe(plumber())
  .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
  .pipe(prefix(['> 2%']))
  .pipe(rename('bundle.css'))
  .pipe(header(banner, { pkg: pkg }))
  .pipe(gulp.dest(paths.styles.output))
});

// Watch assets folder for changes
gulp.task('default', ['build:styles', 'build:scripts', 'minify'], function() {
  gulp.watch(paths.styles.watch, ['build:styles']);
  gulp.watch(paths.scripts.input, ['build:scripts']);
});

// Minify html
gulp.task('minify', function() {
  return gulp.src(paths.markup.input)
    .pipe(minify({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.markup.output));
});

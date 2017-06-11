var gulp = require('gulp'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
     del = require('del');

var fileList = [
 'scss/custom.scss',
 'scss/bootstrap.scss'
];

gulp.task('initial', function() {
 var fonts = gulp.src('node_modules/font-awesome/fonts/**')
    .pipe(gulp.dest('fonts'));

 var fontawesome = gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('css'));

 var bootstrap = gulp.src('node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
    .pipe(rename('bootstrap.scss'))
    .pipe(gulp.dest('scss'));

 var bootstrappartial = gulp.src('node_modules/bootstrap-sass/assets/stylesheets/bootstrap/**')
    .pipe(gulp.dest('scss/bootstrap'));
});

gulp.task('sass', function() {
 return gulp.src(fileList)
 .pipe(maps.init())
 .pipe(sass({outputStyle: 'compressed'}))
 .pipe(maps.write('./'))
 .pipe(gulp.dest('css'));
});

gulp.task('watchSass',function() {
  gulp.watch(fileList, ['sass']);
});

gulp.task('clean', function() {
 del(['dist', 'css']);
});

gulp.task('build', ['clean','sass'], function() {
 return gulp.src([
  'index.html',
  'css/**.css',
  'fonts/**'
 ], {base:'./'})
 .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watchSass']);

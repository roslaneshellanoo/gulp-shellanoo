var gulp    = require('gulp');
var sass    = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');



// Sass
gulp.task('sass', function(){
 return sass('./sass/style.scss', { sourcemap: true, style: 'compact'})
     //.pipe(stripCssComments())
     .pipe(autoprefixer())
     .pipe(sourcemaps.write('.'))
     .pipe(gulp.dest('./css'))
     .pipe(rename({suffix: '.min'}))
     .pipe(minifycss())
     .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));

});

// Scripts
gulp.task('scripts', function() {
    return gulp.src( [
        'js/jquery.min.js',
        'js/!(jquery)*.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('../all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./js/'));
});


gulp.task('fileinclude', function() {
    gulp.src(['./pages/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});

// Sass
gulp.task('watch', function(){
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['scripts']);
});

gulp.task('default', ['sass', 'scripts','fileinclude', 'watch']);

var gulp    = require('gulp');
var sass    = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');


var htmlDir = "./*.html";
var jsDir = "./js/*.js";
var sassDir = "./sass/*.scss";
var cssDir = "./css/*.js";


// Sass
gulp.task('sass', function(){
 return sass('./sass/style.scss', { sourcemap: true, style: 'compact'})

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
        .pipe(concat('../all.js'))
        .pipe(gulp.dest('./js/'));
});


// Sass
gulp.task('watch', function(){
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['scripts']);
});

gulp.task('default', ['sass', 'scripts', 'watch']);


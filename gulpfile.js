
var gulp    = require('gulp');
var sass    = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');


var htmlDir = "./*.html";
var jsDir = "./js/*.js";
var sassDir = "./sass/*.scss";
var cssDir = "./css/*.js";

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

gulp.task('watch', function(){
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);


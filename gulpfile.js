'use strict';


const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');


// styles
gulp.task('styles', function () {

    gulp.src('./sass/application.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));

    gulp.src('./sass/application.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css'));
});




// convert
gulp.task('convertJS', function(){
  return gulp.src('src/js/**/*.js',{base:"./src/js"})
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})



// browserify
gulp.task("browserify",['convertJS'], function () {
    var b = browserify({
        entries: "dist/js/index.js"
    });

    return b.bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest("dist/js"));
});


gulp.task('default', ['convertJS','browserify','styles']);









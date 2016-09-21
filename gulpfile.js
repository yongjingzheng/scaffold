'use strict';

// var gulp = require('gulp');

// var sass = require('gulp-sass');

// var rename = require ('gulp-rename');

// gulp.task('default', function () {

//     gulp.src('./sass/application.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./css'));

//     gulp.src('./sass/application.scss')
//         .pipe(sass({
//             outputStyle: 'compressed'
//         }).on('error', sass.logError))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest('./css'));
// });

// gulp.task('watch', function () {
//     gulp.watch('./sass/*.scss', ['styles']);
// });


const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

// 编译并压缩js
gulp.task('convertJS', function(){
  return gulp.src('src/js/**/*.js',{base:"./src/js"})
    .pipe(babel({
      presets: ['es2015']
    }))
    // .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})


// 监视文件变化，自动执行任务
gulp.task('watch', function(){
  gulp.watch('/src/js/*.js', ['convertJS', 'browserify']);
})



// browserify
gulp.task("browserify", function () {
    var b = browserify({
        entries: "dist/js/index.js"
    });

    return b.bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest("dist/js"));
});

// gulp.task('start', ['convertJS']);
// gulp.task('start', ['convertJS','browserify']);
gulp.task('start', ['browserify']);








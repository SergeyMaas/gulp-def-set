var gulp = require('gulp'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload');

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('sass', function () {
    gulp.src('assets/**/*.sass')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({indentedSyntax: true}))
        .pipe(sourcemaps.write())
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('public/css'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('assets/**/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('public/js'))
        .on('error', function(err, e) {
            console.log(err.message);
        })
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('public/index.html')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('assets/**/*.js', ['js']);
    gulp.watch('assets/**/*.sass', ['sass']);
    gulp.watch('public/index.html', ['html']);
});

gulp.task('default', ['connect', 'js', 'sass', 'watch']);

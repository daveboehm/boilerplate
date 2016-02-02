var gulp = require('gulp'),
    gutil = require('gulp-util'),
    changed = require('gulp-changed'),
    webserver = require('gulp-webserver'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    path = require('path'),
    concat = require('gulp-concat'),
    mincss = require('gulp-minify-css'),
    watch = require('gulp-watch');

// ============================================================================
// Concatenate all JS core files 
gulp.task('core-scripts', function () {
    return gulp.src(['scripts/core/*.js'])
        .pipe(concat('core.js'))
        .pipe(gulp.dest('dist/'));
});

// ============================================================================
// Concatenate all JS vendor files 
gulp.task('vendor-scripts', function () {
    return gulp.src(['scripts/vendor/*.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/'));
});

// ============================================================================
// Concatenate and minify all custom JS files
gulp.task('app-scripts', function () {
    return gulp.src(['scripts/app/*.js', 'services/*.js', 'directives/**/*.js', 'directives/**/*.js', 'views/**/*.js'])
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/'));
});

// ============================================================================
// Compile all less into single CSS file
gulp.task('less', function () {
    gulp.src('styles/app/app.less')
        .pipe(changed('styles/**/*.less'))
        .pipe(less())
        .pipe(mincss({
            compatibility: 'ie10'
        }))
        .pipe(gulp.dest('dist/'))
        .on('error', gutil.log);
});

//Minify app.css
gulp.task('minify-css', function () {
    //    return gulp.src('dist/*.css')
    //        .pipe(mincss({
    //            compatibility: 'ie10'
    //        }))
    //        .pipe(gulp.dest('dist/'));
});

// ============================================================================
// Start a local server
gulp.task('webserver', function () {
    gulp.src('./').pipe(webserver({
        livereload: true,
        host: 'localhost',
        port: '8888',
        path: '/',
        open: true
    }));
});

// ============================================================================
// Run tasks on file changes
gulp.task('watch', function () {
    gulp.watch(['scripts/app/*.js', 'directives/**/*/*.js', 'services/**/*.js', 'views/**/*.js'], ['app-scripts']);
    gulp.watch(['scripts/core/*.js', 'scripts/vendor/*.js'], ['core-scripts', 'vendor-scripts'])
    gulp.watch('**/*.less', ['less', 'minify-css']);
});

// Tasks to be ran on `gulp`
gulp.task('default', ['watch', 'webserver', 'less', 'app-scripts', 'core-scripts', 'vendor-scripts', 'minify-css']);
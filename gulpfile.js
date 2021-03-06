var gulp = require('gulp'),
    gutil = require('gulp-util'),
    changed = require('gulp-changed'),
    webserver = require('gulp-webserver'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    path = require('path'),
    concat = require('gulp-concat'),
    mincss = require('gulp-clean-css'),
    watch = require('gulp-watch');

// ============================================================================
// Concatenate all JS core app files 
gulp.task('core-scripts', function () {
    return gulp.src(['node_modules/angular/angular.min.js', 'node_modules/angular-*/**/*.min.js'])
        .pipe(concat('core.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('dist/'));
});

// ============================================================================
// Concatenate all JS vendor files 
gulp.task('vendor-scripts', function () {
    return gulp.src(['scripts/vendor/**/*.js'])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

// ============================================================================
// Concatenate and minify all custom JS files
gulp.task('app-scripts', function () {
    return gulp.src(['scripts/app/*.js', 'services/**/*.js', 'directives/**/*.js', 'directives/**/*.js', 'views/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('dist/'));
});

// ============================================================================
// Compile all less into single CSS file and minify it
gulp.task('less', function () {
    gulp.src('styles/app/app.less')
        .pipe(changed('styles/**/*.less'))
        .pipe(less())
        .pipe(mincss())
        .pipe(gulp.dest('dist/'))
        .on('error', gutil.log);
});

// ============================================================================
// Start a local server
gulp.task('webserver', function () {
    gulp.src('./').pipe(webserver({
        livereload: true,
        host: 'localhost',
        port: '8888',
        path: '/',
        open: false
    }));
});

// ============================================================================
// Run tasks on file changes
gulp.task('watch', function () {
    gulp.watch(['scripts/app/*.js', 'directives/**/*/*.js', 'services/**/*.js', 'views/**/*.js'], ['app-scripts']);
    gulp.watch(['scripts/vendor/**/*.js'], ['vendor-scripts'])
    gulp.watch('**/*.less', ['less']);
});

// Tasks to be ran on `gulp`
gulp.task('default', ['watch', 'webserver', 'less', 'app-scripts', 'core-scripts', 'vendor-scripts']);
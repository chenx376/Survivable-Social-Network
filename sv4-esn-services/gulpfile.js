/**
 * @author Arthur M Sampaio
 */
var gulp = require('gulp');
var server = require('gulp-express');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('serve', function () {
    // Set environment to production
    process.env.NODE_ENV = "production";

    // Start the server at the beginning of the task
    server.run(['server.js']);

    //Watch for changes
    gulp.watch(['server.js', '**/*.js'], [server.run]);
});

gulp.task('pre-test', function () {

    process.env.NODE_ENV = "testing";

    return gulp.src(['controllers/*.js','dao/*.js'])
    // Covering files
        .pipe(istanbul({includeUntested: true,includeAllSources: true}))
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
    return gulp.src(['tests/*.js'])
        .pipe(mocha({
            reporter: 'mocha-junit-reporter',
            //reporter: 'spec',
            quiet: false,
            clearRequireCache: false,
            ui: 'tdd',
            timeout: 2000
        }))
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports())
        // Enforce a coverage of at least 90%
        //.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});
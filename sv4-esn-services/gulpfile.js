/**
 * @author Arthur M Sampaio
 */
var gulp = require('gulp');
var server = require('gulp-express');
var mocha = require('gulp-mocha');

gulp.task('serve', function () {
    // Set environment to production
    process.env.NODE_ENV = "production";

    // Start the server at the beginning of the task
    server.run(['server.js']);

    //Watch for changes
    gulp.watch(['server.js', '**/*.js'], [server.run]);
});

gulp.task('test', function () {
    // Set environment to testing
    process.env.NODE_ENV = "testing";

    // Run the tests in tests folder
    gulp.src(['tests/**/*.js'], {read: false})
    // `gulp-mocha` needs filepaths so you can't have any plugins before it
    .pipe(
        mocha({
            reporter: 'xunit',
            quiet: false,
            clearRequireCache: false,
            ui: 'tdd'
        })
    )
});

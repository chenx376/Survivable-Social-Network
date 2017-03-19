/**
 * @author Arthur M Sampaio
 */
var gulp = require('gulp');
var server = require('gulp-express');
var mocha = require('gulp-mocha');

gulp.task('serve', function () {
    // Start the server at the beginning of the task
    server.run(['server.js']);

    //Watch for changes
    gulp.watch(['server.js', '**/*.js'], [server.run]);
});

gulp.task('test', () =>
    gulp.src(['tests/**/*.js'], {read: false})
    // `gulp-mocha` needs filepaths so you can't have any plugins before it
    .pipe(
        mocha({
            reporter: 'spec',
            quiet: false,
            clearRequireCache: false,
            ui: 'tdd'
        })
    )
);

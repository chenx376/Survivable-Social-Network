/**
 * @author Arthur M Sampaio
 */
var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('serve', function () {
    // Start the server at the beginning of the task
    server.run(['server.js']);

    //Watch for changes
    gulp.watch(['server.js', '**/*.js'], [server.run]);
});
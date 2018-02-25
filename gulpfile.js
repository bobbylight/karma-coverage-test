const gulp = require('gulp');
const del = require('del');
const KarmaServer = require('karma').Server;
const tsc = require('gulp-typescript');
const tsconfig = tsc.createProject('tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const ngAnnotate = require('gulp-ng-annotate');
const runSequence = require('run-sequence');
const exec = require('child_process').execSync;
const path = require('path');

gulp.task('test', (done) => {

    const onComplete = (code) => {
        if (code === 1) {
            console.log('Unit test failures, exiting process');
            done('Unit test failures');
        }
        else {
            console.log('Unit tests passed');
            done();
        }
    };

    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, null/*onComplete*/).start(); // Calling the callback now seems to cause Karma to not terminate cleanly
});

gulp.task('clean', () => {
    return del([ 'build/', 'coverage/' ], { force: true });
});

gulp.task('compile-with-tsc', () => {
    exec(path.normalize('./node_modules/.bin/tsc'), (error, stdout, stderr) => {
        if (stdout) {
            console.log(stdout);
        }
        if (stderr) {
            console.error(stderr);
        }
        if (error && error.code !== 2) {
            console.error('*** Error compiling TypeScript files for Sonar analysis: ' + error);
        }
    });
});

gulp.task('compile-with-gulp-typescript', () => {

    const tsResult = gulp.src([ 'src/**/*.ts' ])
        .pipe(sourcemaps.init())
        .pipe(tsconfig());

    // All we care about is the .js and map files, not the *.d.ts files
    return tsResult.js
        .pipe(ngAnnotate({ single_quotes: true })).on('error', (error) => {
            // ng-annotate will fail on compilation errors, and cause gulp to exit; we need to catch this and
            // print out the error and then call the task callback instead
            console.log('*** Annotation error ***\n' + error);

            // need to call the callback, or else this jswatch task will not get called again for some reason;
            // the error must cause the task to get removed from watch notifications; calling the callback seems to work
            cb();
        })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/'));
});

gulp.task('build-gulp-typescript', () => { runSequence('clean', 'compile-with-gulp-typescript') });
gulp.task('build-tsc', () => { runSequence('clean', 'compile-with-tsc') });

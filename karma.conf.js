module.exports = function(config) {
    'use strict';
    
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],

        // list of files / patterns to load in the browser
        // Note that this is also the order stuff is loaded in, so we cannot just
        // wildcard all JS files in a folder, due to dependencies (!)
        // See also:  http://karma-runner.github.io/0.13/config/files.html
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            { pattern: 'build/**/*.js', included: false },

            'test-main.js'
        ],

        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'build/**/!(*.spec).js': 'coverage'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots', 'junit', 'coverage', 'karma-remap-istanbul'],

        // junit configuration
        junitReporter: {
            outputDir: 'junit/',
            outputFile: 'results/test-results.xml',
            suite: ''
        },

        // configure the coverage reporter
        coverageReporter: {
            instrumenterOptions: {
                istanbul: {
                    embedSource: true,
                    preserveComments: true,
                    noCompact: true
                }
            },
            type: 'lcov', // Generates lcov and HTML
            dir: 'coverage/',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'lcov', subdir: 'lcov/' }
            ]
        },
        
        remapIstanbulReporter: {
            reports: {
                html: 'coverage/remapped',
                lcovonly: 'coverage/remapped-lcov/lcov.info'
            }
        },
        
        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        browserConsoleLogOptions: {
            terminal: true,
            level: ''
        },

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [ 'PhantomJS' ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // overriding default timeout value of 10000 ms.
        browserNoActivityTimeout: 60000

    });
};
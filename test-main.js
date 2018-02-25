const tests = [];

Object.keys(window.__karma__.files).forEach(function(file) {
    if (/\.spec\.js$/.test(file)) {
        tests.push(file);
    }
});

angular.module('testMod', []);

require([
    'app/test.controller',
    'app/util.service'
], function() {
});

requirejs.config({
    baseUrl: '/base/build/',
    deps: tests,
    callback: window.__karma__.start
});

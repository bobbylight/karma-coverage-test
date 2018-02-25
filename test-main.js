var tests = [];

Object.keys(window.__karma__.files).forEach(function (file) {
    console.log('>>> >>> ' + file);
    if (/\.spec\.js$/.test(file)) {
        tests.push(file);
    }
});

console.log('Tests: ' + JSON.stringify(tests));

angular.module('testMod', []);

require([
    'app/test',
    'app/util'
], function () {
    console.log('>>> >>> stuff required');
});

requirejs.config({
    baseUrl: '/base/build/',
    deps: tests,
    callback: window.__karma__.start
});

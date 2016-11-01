'use strict';

var test = require('ava');
var syncExec = require('sync-exec');
var helpers = require('../../lib/helpers');
var testHelpers = require('./fixtures/helpers');
var testData = require('./fixtures/dev-test-data.js');

var moduleSizes = void 0,
    rootDependencies = void 0,
    flatDependencies = void 0,
    allDependencies = void 0;

test.before(function (t) {
    /* includeDev, this is equalent to running cost-of-modules --include-dev */
    testHelpers.setup(true);
});

test.todo('setup was complete');

test('get size for node_modules', function (t) {
    moduleSizes = helpers.getSizeForNodeModules();
    t.deepEqual(moduleSizes, testData.moduleSizes);
});

test('get root dependencies', function (t) {
    rootDependencies = helpers.getRootDependencies();
    t.deepEqual(rootDependencies, testData.rootDependencies);
});

test('attach nested dependencies', function (t) {
    flatDependencies = helpers.attachNestedDependencies(rootDependencies);
    t.deepEqual(flatDependencies, testData.flatDependencies);
});

test('get all dependencies', function (t) {
    allDependencies = helpers.getAllDependencies(flatDependencies);
    t.deepEqual(allDependencies, testData.allDependencies);
});

test.todo('show results');
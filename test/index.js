const test = require('ava');
const helpers = require('../src/helpers');
const testData = require('./fixtures/test-data.js');

test.before(t => {
    helpers.setup();
});

test.todo('setup was complete');

test('get size for node_modules', t => {
    let moduleSizes = helpers.getSizeForNodeModules();
    t.deepEqual(moduleSizes, testData.moduleSizes);
});

test('get root dependencies', t => {
    let rootDependencies = helpers.getRootDependencies();
    t.deepEqual(rootDependencies, testData.rootDependencies);
});

test('attach nested dependencies', t => {
    let rootDependencies = helpers.getRootDependencies();
    let flatDependencies = helpers.attachNestedDependencies(rootDependencies);
    t.deepEqual(flatDependencies, testData.flatDependencies);
});

test('get all dependencies', t => {
    let rootDependencies = helpers.getRootDependencies();
    let flatDependencies = helpers.attachNestedDependencies(rootDependencies);
    let allDependencies = helpers.getAllDependencies(flatDependencies);
    t.deepEqual(allDependencies, testData.allDependencies);
});

test.todo('show results');

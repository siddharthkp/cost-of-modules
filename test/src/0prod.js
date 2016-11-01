const test = require('ava');
const testHelpers = require('./fixtures/helpers');
const testData = require('./fixtures/test-data.js');

let moduleSizes, rootDependencies, flatDependencies, allDependencies;
test.before(t => {
    testHelpers.setup();
});

testHelpers.tests(testData);


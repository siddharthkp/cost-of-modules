const test = require('ava');
const testHelpers = require('./fixtures/helpers');
const testData = require('./fixtures/dev-test-data.js');

test.before(t => {
    /* includeDev, this is equalent to running cost-of-modules --include-dev */
    testHelpers.setup(true);
});

test.after(t => {
    testHelpers.teardown();
});

testHelpers.tests(testData);

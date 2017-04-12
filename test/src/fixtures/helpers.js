const syncExec = require('sync-exec');

const helpers = require('../../../lib/helpers');
const tests = require('./tests.js');

let clean = (includeDev) => {
    //syncExec('rm -rf node_modules node_modules_bak');
    syncExec('cp ../src/package.json .');
};

let setup = (includeDev) => {
    clean();
    helpers.setup(includeDev);
};

let teardown = helpers.teardown;

module.exports = {
    setup, tests, teardown
};

const syncExec = require('sync-exec');

const helpers = require('../../../lib/helpers');
const tests = require('./tests.js');

let clean = (includeDev) => {
    syncExec('rm -rf node_modules');
    syncExec('cp ../src/package.json .');
};

let setup = (includeDev) => {
    clean();
    helpers.setup(includeDev);
};

module.exports = {
    setup, tests
};

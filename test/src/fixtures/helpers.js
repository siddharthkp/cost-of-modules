const helpers = require('../../../lib/helpers');
const syncExec = require('sync-exec');

let clean = (includeDev) => {
    syncExec('rm -rf node_modules');
};

let fakePrivatePackages = () => {
};

let setup = (includeDev) => {
    clean();
    helpers.setup(includeDev);
};

module.exports = {
    setup
};

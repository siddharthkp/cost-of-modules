const syncExec = require('sync-exec');
const fs = require('fs');
const helpers = require('../../../lib/helpers');

let clean = (includeDev) => {
    syncExec('rm -rf node_modules');
    syncExec('cp ../src/package.json .');
};

let fakePrivatePackages = () => {
    syncExec('mkdir node_modules/@fake');
    syncExec('mv node_modules/callsites node_modules/@fake/');
    syncExec('mv node_modules/has-color node_modules/@fake/');
    let contents = fs.readFileSync('package.json', 'utf8');
    contents = JSON.parse(contents);
    let deps = contents.dependencies;
    deps['@fake/callsites'] = '2.0.0';
    delete deps['callsites'];
    deps['@fake/has-color'] = '0.1.7';
    delete deps['has-color'];
    contents = JSON.stringify(contents);
    fs.writeFileSync('package.json', contents, 'utf8');
};

let setup = (includeDev) => {
    clean();
    helpers.setup(includeDev);
    if (!includeDev) fakePrivatePackages();
};

module.exports = {
    setup
};

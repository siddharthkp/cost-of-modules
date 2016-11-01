'use strict';

var syncExec = require('sync-exec');
var fs = require('fs');
var helpers = require('../../../lib/helpers');

var clean = function clean(includeDev) {
    syncExec('rm -rf node_modules');
    syncExec('cp ../src/package.json .');
};

var fakePrivatePackages = function fakePrivatePackages() {
    syncExec('mkdir node_modules/@fake');
    syncExec('mv node_modules/callsites node_modules/@fake/');
    syncExec('mv node_modules/has-color node_modules/@fake/');
    var contents = fs.readFileSync('package.json', 'utf8');
    contents = JSON.parse(contents);
    var deps = contents.dependencies;
    deps['@fake/callsites'] = '2.0.0';
    delete deps['callsites'];
    deps['@fake/has-color'] = '0.1.7';
    delete deps['has-color'];
    contents = JSON.stringify(contents);
    fs.writeFileSync('package.json', contents, 'utf8');
};

var setup = function setup(includeDev) {
    clean();
    helpers.setup(includeDev);
    fakePrivatePackages();
};

module.exports = {
    setup: setup
};
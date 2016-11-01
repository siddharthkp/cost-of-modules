'use strict';

var helpers = require('../../../lib/helpers');
var syncExec = require('sync-exec');

var clean = function clean(includeDev) {
    syncExec('rm -rf node_modules');
};

var fakePrivatePackages = function fakePrivatePackages() {};

var setup = function setup(includeDev) {
    clean();
    helpers.setup(includeDev);
};

module.exports = {
    setup: setup
};
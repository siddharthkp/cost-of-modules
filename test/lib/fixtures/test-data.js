'use strict';

var rootDependencies = ['callsites', 'date-time', 'has-color', 'once'];

var moduleSizes = {
    'callsites': 16,
    'date-time': 16,
    'has-color': 12,
    'once': 16,
    'time-zone': 16,
    'wrappy': 16
};

var flatDependencies = [{ name: 'callsites', children: [] }, { name: 'date-time', children: ['time-zone'] }, { name: 'has-color', children: [] }, { name: 'once', children: ['wrappy'] }];

var allDependencies = ['callsites', 'date-time', 'time-zone', 'has-color', 'once', 'wrappy'];

module.exports = {
    rootDependencies: rootDependencies,
    moduleSizes: moduleSizes,
    flatDependencies: flatDependencies,
    allDependencies: allDependencies
};
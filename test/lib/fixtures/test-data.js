'use strict';

var rootDependencies = ['date-time', 'once'];

var moduleSizes = {
    'date-time': 16,
    'once': 16,
    'time-zone': 16,
    'wrappy': 16
};

var flatDependencies = [{ name: 'date-time', children: ['time-zone'] }, { name: 'once', children: ['wrappy'] }];

var allDependencies = ['date-time', 'time-zone', 'once', 'wrappy'];

module.exports = {
    rootDependencies: rootDependencies,
    moduleSizes: moduleSizes,
    flatDependencies: flatDependencies,
    allDependencies: allDependencies
};
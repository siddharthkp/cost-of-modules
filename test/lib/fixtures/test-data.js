'use strict';

var moduleSizes = {
    '@fake/callsites': 16,
    '@fake/has-color': 12,
    'date-time': 16,
    'once': 16,
    'time-zone': 16,
    'wrappy': 16
};

var rootDependencies = ['@fake/callsites', '@fake/has-color', 'date-time', 'once'];

var flatDependencies = [{ name: '@fake/callsites', children: [] }, { name: '@fake/has-color', children: [] }, { name: 'date-time', children: ['time-zone'] }, { name: 'once', children: ['wrappy'] }];

var allDependencies = ['@fake/callsites', '@fake/has-color', 'date-time', 'once', 'time-zone', 'wrappy'];

module.exports = {
    moduleSizes: moduleSizes,
    rootDependencies: rootDependencies,
    flatDependencies: flatDependencies,
    allDependencies: allDependencies
};
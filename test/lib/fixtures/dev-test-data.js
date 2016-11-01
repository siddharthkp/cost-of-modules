'use strict';

var moduleSizes = {
    'callsites': 16,
    'camelcase': 16,
    'date-time': 16,
    'has-color': 12,
    'once': 16,
    'time-zone': 16,
    'wrappy': 16,
    'yargs-parser': 52
};

var rootDependencies = ['callsites', 'date-time', 'has-color', 'once', 'yargs-parser'];

var flatDependencies = [{ name: 'callsites', children: [] }, { name: 'date-time', children: ['time-zone'] }, { name: 'has-color', children: [] }, { name: 'once', children: ['wrappy'] }, { name: 'yargs-parser', children: ['camelcase'] }];

var allDependencies = ['callsites', 'camelcase', 'date-time', 'has-color', 'once', 'time-zone', 'wrappy', 'yargs-parser'];

module.exports = {
    moduleSizes: moduleSizes,
    rootDependencies: rootDependencies,
    flatDependencies: flatDependencies,
    allDependencies: allDependencies
};
'use strict';

var rootDependencies = ['date-time', 'once', 'yargs-parser'];

var moduleSizes = {
    'camelcase': 16,
    'date-time': 16,
    'once': 16,
    'time-zone': 16,
    'wrappy': 16,
    'yargs-parser': 52
};

var flatDependencies = [{ name: 'date-time', children: ['time-zone'] }, { name: 'once', children: ['wrappy'] }, { name: 'yargs-parser', children: ['camelcase'] }];

var allDependencies = ['date-time', 'time-zone', 'once', 'wrappy', 'yargs-parser', 'camelcase'];

module.exports = {
    rootDependencies: rootDependencies,
    moduleSizes: moduleSizes,
    flatDependencies: flatDependencies,
    allDependencies: allDependencies
};
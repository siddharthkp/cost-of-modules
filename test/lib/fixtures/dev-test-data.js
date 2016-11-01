'use strict';

var moduleSizes = {
    '@fake/callsites': 16,
    '@fake/has-color': 12,
    'camelcase': 16,
    'date-time': 16,
    'once': 16,
    'time-zone': 16,
    'wrappy': 16,
    'yargs-parser': 52
};

var rootDependencies = ['@fake/callsites', '@fake/has-color', 'date-time', 'once', 'yargs-parser'];

var flatDependencies = [{ name: '@fake/callsites', children: [] }, { name: '@fake/has-color', children: [] }, { name: 'date-time', children: ['time-zone'] }, { name: 'once', children: ['wrappy'] }, { name: 'yargs-parser', children: ['camelcase'] }];

var allDependencies = ['@fake/callsites', '@fake/has-color', 'camelcase', 'date-time', 'once', 'time-zone', 'wrappy', 'yargs-parser'];

module.exports = {
    moduleSizes: moduleSizes,
    rootDependencies: rootDependencies,
    flatDependencies: flatDependencies,
    allDependencies: allDependencies
};
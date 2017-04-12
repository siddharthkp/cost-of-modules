#!/usr/bin/env node
'use strict';

var helpers = require('./helpers');

helpers.setup();

console.log('Calculating...');
console.log();

/*
    Get size for all node modules
    {
        // name: size in bytes,
        a: 40,
        b: 220
    }
*/
var moduleSizes = helpers.getSizeForNodeModules();

/*
    Get root dependencies from tree
    These are the ones declared as dependendies in package.json
    [a, b, c, d]
*/
var rootDependencies = helpers.getRootDependencies();

/*
    Attach the nested dependendies in a flat manner
    [{
        name: rootDependency,
        children: [a, b, c, d]
    }]
*/
var flatDependencies = helpers.attachNestedDependencies(rootDependencies);

/*
    Modules actual size = size of the module + size of it's children
*/
for (var i = 0; i < flatDependencies.length; i++) {
    var dep = flatDependencies[i];

    var sizeOfModule = moduleSizes[dep.name];

    var sizeOfChildren = 0;
    dep.children.forEach(function (child) {
        sizeOfChildren += moduleSizes[child] || 0;
    });

    dep.actualSize = sizeOfModule + sizeOfChildren;
    dep.numberOfChildren = dep.children.length;
}

/*
    All dependencies =
    Root dependencies +  all their children
    Deduplicated
*/
var allDependencies = helpers.getAllDependencies(flatDependencies);

/* Total size of node_modules */
var totalSize = 0;
allDependencies.forEach(function (dep) {
    totalSize += moduleSizes[dep] || 0;
});

/* Display results */
helpers.displayResults(flatDependencies, allDependencies, totalSize);

/* Return to original state */
helpers.teardown();
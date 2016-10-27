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
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = flatDependencies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var dep = _step.value;

        var sizeOfModule = moduleSizes[dep.name];

        var sizeOfChildren = 0;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = dep.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var child = _step3.value;
                sizeOfChildren += moduleSizes[child] || 0;
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        dep.actualSize = sizeOfModule + sizeOfChildren;
        dep.numberOfChildren = dep.children.length;
    }

    /* Sort by size */
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

flatDependencies = flatDependencies.sort(function (a, b) {
    return b.actualSize - a.actualSize;
});

/*
    All dependencies =
    Root dependencies +  all their children
    Deduplicated
*/
var allDependencies = helpers.getAllDependencies(flatDependencies);

/* Total size of node_modules */
var totalSize = 0;
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    for (var _iterator2 = allDependencies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _dep = _step2.value;
        totalSize += moduleSizes[_dep] || 0;
    } /* Display results */
} catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
        }
    } finally {
        if (_didIteratorError2) {
            throw _iteratorError2;
        }
    }
}

helpers.displayResults(flatDependencies, allDependencies, totalSize);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fs = require('fs');
var syncExec = require('sync-exec');
var os = require('os');
var Table = require('cli-table');

var _require = require('colors'),
    yellow = _require.yellow;

var argv = require('yargs').argv;

var setup = function setup() {
    console.log();

    /*
        Check if package.json exists
        Need it to build dependency tree
    */
    var packageJSONExists = fs.existsSync('package.json');
    if (!packageJSONExists) {
        console.log('package.json not found!');
        console.log();
        process.exit();
    }

    /*
        Make sure dependencies are installed
        Ignore devDependencies/bundledDependencies
    */
    console.log('Making sure dependendies are installed');
    console.log('npm install --production');
    console.log();
    syncExec('npm install --production', { stdio: [0, 1, 2] });

    console.log();
};

/*
    Get dependency tree with npm -ls
    Ignore devDependencies/bundledDependencies
*/
var getDependencyTree = function getDependencyTree() {
    var result = syncExec('npm ls --json --production');
    return JSON.parse(result.stdout).dependencies;
};

/*
    Get root dependencies from tree
    These are the ones declared as dependendies in package.json
    [a, b, c, d]
*/
var getRootDependencies = function getRootDependencies() {
    var dependencyTree = getDependencyTree();
    if (!dependencyTree) {
        console.log('There are no dependencies!');
        console.log();
        process.exit(1);
    }
    return Object.keys(dependencyTree);
};

/*
    Get size for all node_modules
*/
var getSizeForNodeModules = function getSizeForNodeModules() {
    var modules = {};
    var command = 'du --max-depth 1 -k --exclude .cache node_modules';
    /* Mac replaces --max-depth with -d */
    var platform = os.platform();
    if (platform === 'darwin') command = 'du -d 1 -k -I .cache node_modules';

    var result = syncExec(command).stdout;
    /* Bunch of string parsing */
    var rows = result.split('\n');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var row = _step.value;

            var name = row.split('node_modules/')[1];
            var size = parseInt(row.split('node_modules/')[0], 10);
            if (name) modules[name] = size;
        }
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

    return modules;
};

/*
    Get all nested dependencies for a root dependency
    Traverse recursively through the tree
    and return all the nested dependendies in a flat array
*/
var getDependenciesRecursively = function getDependenciesRecursively() {
    var modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var tree = arguments[1];

    var deps = Object.keys(tree);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = deps[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var dep = _step2.value;

            if (_typeof(tree[dep]) === 'object' && tree[dep].dependencies !== null) {
                if (dep !== 'dependencies') modules.push(dep);
                getDependenciesRecursively(modules, tree[dep]);
            } else if (tree[dep].version != null) modules.push(dep);
        }
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

    return modules;
};

/*
    Attach the flat array from getDependenciesRecursively
    to it's parent
    [{
        name: rootDependency,
        children: [a, b, c, d]
    }]
*/
var attachNestedDependencies = function attachNestedDependencies(rootDependencies) {
    var flatDependencies = [];
    var dependencyTree = getDependencyTree();
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = rootDependencies[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var dep = _step3.value;

            flatDependencies.push({
                name: dep,
                /* Get flat child dependencies array */
                children: getDependenciesRecursively([], dependencyTree[dep])
            });
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

    return flatDependencies;
};

/*
    Get all dependencies in a flat array:
    Root dependencies +  all their children
    Deduplicate
*/
var getAllDependencies = function getAllDependencies(flatDependencies) {
    var allDependencies = [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = flatDependencies[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var dep = _step4.value;

            allDependencies.push(dep.name); // Root dependency
            allDependencies = allDependencies.concat(dep.children); // Children
        }
        /* Deduplicate */
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    allDependencies = allDependencies.filter(function (dep, index) {
        return allDependencies.indexOf(dep) === index;
    });
    return allDependencies;
};

var displayResults = function displayResults(flatDependencies, allDependencies, totalSize) {
    /* Sort by size */
    var sortedDependencies = flatDependencies.sort(function (a, b) {
        return b.actualSize - a.actualSize;
    });

    var table = new Table({ head: ['name', 'children', 'size'] });

    for (var i = 0; i < sortedDependencies.length; i++) {
        var dep = sortedDependencies[i];

        /* Showing only top 10 results in less mode */
        if (argv.less && i === 10) {
            table.push(['+ ' + (sortedDependencies.length - 10) + ' modules', null, null]);
            break;
        }

        table.push([dep.name, dep.numberOfChildren, (dep.actualSize / 1024).toFixed(2) + 'M' // Converting to M
        ]);
    }

    /* Total */
    table.push([yellow(sortedDependencies.length + ' modules'), yellow(allDependencies.length - sortedDependencies.length + ' children'), yellow((totalSize / 1024).toFixed(2) + 'M')]); // Converting to M

    /* Print the table with some padding */
    console.log();
    console.log(table.toString());
    console.log();
};

module.exports = {
    setup: setup,
    getSizeForNodeModules: getSizeForNodeModules,
    getRootDependencies: getRootDependencies,
    attachNestedDependencies: attachNestedDependencies,
    getAllDependencies: getAllDependencies,
    displayResults: displayResults
};
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fs = require('fs-extra');
var syncExec = require('sync-exec');
var Table = require('cli-table2');

var _require = require('colors'),
    yellow = _require.yellow;

var argv = require('yargs-parser')(process.argv.slice(2));
var path = require('path');

/*
    By default, this assumes production mode
    you can disable that by using --include-dev
    or by passing includeDev to setup
*/
var productionModifier = '--production';

var setup = function setup(includeDev) {
    console.log();

    if (argv.includeDev || includeDev) productionModifier = '';

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

    /* Do not install dependencies based --no-install flag */
    if (argv.install != null && !argv.install) return;

    /*
        Make sure dependencies are installed
        Ignore devDependencies/bundledDependencies by default
        Adds them with --include-dev
    */
    console.log('Making sure dependencies are installed');

    var command = 'npm install ' + productionModifier;
    if (argv.yarn) command = command.replace('npm', 'yarn');

    console.log(command);
    console.log();

    /* Check if node modules exist and then backup */
    var nodeModulesExist = fs.existsSync('node_modules');
    if (nodeModulesExist) fs.copySync('node_modules', 'node_modules_bak');

    /* Run install command */
    syncExec(command, { stdio: [0, 1, 2] });
    console.log();
};

/*
    Get dependency tree with npm -ls
    Ignore devDependencies/bundledDependencies by default
    Adds them with --include-dev
*/
var getDependencyTree = function getDependencyTree() {
    var result = syncExec('npm ls --json ' + productionModifier);
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
    return Object.keys(dependencyTree).sort();
};

/* to fix the missing du problem on windows */

var dirSize = function dirSize(root) {
    var out = 0;
    var _getDirSizeRecursively = void 0;
    (_getDirSizeRecursively = function getDirSizeRecursively(rootLocal) {
        var itemStats = fs.lstatSync(rootLocal);
        if (itemStats.isDirectory()) {
            var allSubs = fs.readdirSync(rootLocal);
            allSubs.forEach(function (file) {
                _getDirSizeRecursively(path.join(rootLocal, file));
            });
        } else {
            out += itemStats.size;
        }
    })(root);

    return Math.floor(out / 1024); /* in KB */
};
/*
    Get scoped modules
*/
var getScopedModules = function getScopedModules(scope) {
    var modules = {};
    var allScopes = fs.readdirSync(path.join('node_modules', scope));
    allScopes.forEach(function (name) {
        var itemStats = fs.lstatSync(path.join('node_modules', scope, name));
        if (itemStats.isDirectory()) {
            var size = dirSize(path.join('node_modules', scope, name));
            if (name) {
                modules[scope + '/' + name] = size;
            }
        }
    });
    return modules;
};

var getSizeForNodeModules = function getSizeForNodeModules() {
    var modules = {};
    var allModules = fs.readdirSync('node_modules');
    allModules.forEach(function (name) {
        var itemStats = fs.lstatSync(path.join('node_modules', name));
        if (itemStats.isDirectory()) {
            if (name && name[0] === '@') {
                var scopedModules = getScopedModules(name);
                Object.assign(modules, scopedModules);
            } else if (name) {
                var size = dirSize(path.join('node_modules', name));
                modules[name] = size;
            }
        }
    });
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
    for (var i = 0; i < deps.length; i++) {
        var dep = deps[i];

        if (_typeof(tree[dep]) === 'object' && tree[dep] !== null) {
            if (tree[dep].dependencies !== null) {
                if (dep !== 'dependencies') modules.push(dep);
                getDependenciesRecursively(modules, tree[dep]);
            } else if (tree[dep].version !== null) modules.push(dep);
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
    for (var i = 0; i < rootDependencies.length; i++) {
        var dep = rootDependencies[i];

        flatDependencies.push({
            name: dep,
            /* Get flat child dependencies array */
            children: getDependenciesRecursively([], dependencyTree[dep])
        });
    }
    return flatDependencies.sort();
};

/*
    Get all dependencies in a flat array:
    Root dependencies +  all their children
    Deduplicate
*/
var getAllDependencies = function getAllDependencies(flatDependencies) {
    var allDependencies = [];
    for (var i = 0; i < flatDependencies.length; i++) {
        var dep = flatDependencies[i];

        allDependencies.push(dep.name); // Root dependency
        allDependencies = allDependencies.concat(dep.children); // Children
    }
    /* Deduplicate */
    allDependencies = allDependencies.filter(function (dep, index) {
        return allDependencies.indexOf(dep) === index;
    });
    return allDependencies.sort();
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

/* Return to original state */
var teardown = function teardown() {
    /*
      If the command is running with no-install,
      there is no need for teardown
    */
    if (argv.install != null && !argv.install) return;
    /*
      Restore node_modules backup if it exists
    */
    var backupExist = fs.existsSync('node_modules_bak');
    if (backupExist) {
        fs.removeSync('node_modules');
        fs.moveSync('node_modules_bak', 'node_modules');
    }
};

module.exports = {
    setup: setup,
    getSizeForNodeModules: getSizeForNodeModules,
    getRootDependencies: getRootDependencies,
    attachNestedDependencies: attachNestedDependencies,
    getAllDependencies: getAllDependencies,
    displayResults: displayResults,
    teardown: teardown
};
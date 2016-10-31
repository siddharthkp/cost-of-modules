const fs = require('fs');
const syncExec = require('sync-exec');
const os = require('os');
const Table = require('cli-table2');
const {yellow} = require('colors');
const argv = require('yargs-parser')(process.argv.slice(2));

/*
    By default, this assumes production mode
    you can disable that by using --include-dev
    or by passing includeDev to setup
*/
let productionModifier = '--production';

let setup = (includeDev) => {
    console.log();

    if (argv.includeDev || includeDev) productionModifier = '';

    /*
        Check if package.json exists
        Need it to build dependency tree
    */
    let packageJSONExists = fs.existsSync('package.json');
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
    console.log('Making sure dependendies are installed');

    let command = `npm install ${productionModifier}`;
    if (argv.yarn) command = command.replace('npm', 'yarn');

    console.log(command);
    console.log();
    syncExec(command, {stdio: [0, 1, 2]});
    console.log();
};

/*
    Get dependency tree with npm -ls
    Ignore devDependencies/bundledDependencies by default
    Adds them with --include-dev
*/
let getDependencyTree = () => {
    let result = syncExec(`npm ls --json ${productionModifier}`);
    return JSON.parse(result.stdout).dependencies;
};

/*
    Get root dependencies from tree
    These are the ones declared as dependendies in package.json
    [a, b, c, d]
*/
let getRootDependencies = () => {
    let dependencyTree = getDependencyTree();
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
let getSizeForNodeModules = () => {
    let modules = {};
    let command = 'du --max-depth 1 -k --exclude .cache node_modules';
    /* Mac replaces --max-depth with -d */
    let platform = os.platform();
    if (platform === 'darwin') command = 'du -d 1 -k -I .cache node_modules';

    let result = syncExec(command).stdout;
    /* Bunch of string parsing */
    let rows = result.split('\n');
    for (let row of rows) {
        let name = row.split('node_modules/')[1];
        let size = parseInt(row.split('node_modules/')[0], 10);
        if (name) modules[name] = size;
    }
    return modules;
};

/*
    Get all nested dependencies for a root dependency
    Traverse recursively through the tree
    and return all the nested dependendies in a flat array
*/
let getDependenciesRecursively = (modules = [], tree) => {
    let deps = Object.keys(tree);
    for (let dep of deps) {
        if (typeof tree[dep] === 'object' && tree[dep] !== null) {
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
let attachNestedDependencies = (rootDependencies) => {
    let flatDependencies = [];
    let dependencyTree = getDependencyTree();
    for (let dep of rootDependencies) {
        let name = dep.split('/')[0];
        flatDependencies.push({
            name,
            /* Get flat child dependencies array */
            children: getDependenciesRecursively([], dependencyTree[dep])
        });
    }
    return flatDependencies;
};

/*
    Get all dependencies in a flat array:
    Root dependencies +  all their children
    Deduplicate
*/
let getAllDependencies = (flatDependencies) => {
    let allDependencies = [];
    for (let dep of flatDependencies) {
        allDependencies.push(dep.name); // Root dependency
        allDependencies = allDependencies.concat(dep.children); // Children
    }
    /* Deduplicate */
    allDependencies = allDependencies.filter((dep, index) => {
        return allDependencies.indexOf(dep) === index;
    });
    return allDependencies;
};

let displayResults = (flatDependencies, allDependencies, totalSize) => {
    /* Sort by size */
    let sortedDependencies = flatDependencies.sort((a, b) => b.actualSize - a.actualSize);

    let table = new Table({head: ['name', 'children', 'size']});

    for (let i = 0; i < sortedDependencies.length; i++) {
        let dep = sortedDependencies[i];

        /* Showing only top 10 results in less mode */
        if (argv.less && i === 10) {
            table.push([`+ ${sortedDependencies.length - 10} modules`, null, null]);
            break;
        }

        table.push([
            dep.name,
            dep.numberOfChildren,
            `${(dep.actualSize / 1024).toFixed(2)}M` // Converting to M
        ]);
    }

    /* Total */
    table.push([
        yellow(`${sortedDependencies.length} modules`),
        yellow(`${allDependencies.length - sortedDependencies.length} children`),
        yellow(`${(totalSize / 1024).toFixed(2)}M`)]); // Converting to M

    /* Print the table with some padding */
    console.log();
    console.log(table.toString());
    console.log();
};

module.exports = {
    setup,
    getSizeForNodeModules,
    getRootDependencies,
    attachNestedDependencies,
    getAllDependencies,
    displayResults
};

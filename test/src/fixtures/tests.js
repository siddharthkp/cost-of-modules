const test = require('ava');
const helpers = require('../../../src/helpers');

let tests = (testData) => {
    let moduleSizes, rootDependencies, flatDependencies, allDependencies;
    test.todo('setup was complete');

    test('get size for node_modules', t => {
        moduleSizes = helpers.getSizeForNodeModules();
        let names = Object.keys(moduleSizes).sort();
        let moduleSizesArray = [];
        for (let name of names) moduleSizesArray.push({name, size: moduleSizes[name]});
        t.deepEqual(moduleSizesArray, testData.moduleSizesArray);
    });

    test('get root dependencies', t => {
        rootDependencies = helpers.getRootDependencies();
        t.deepEqual(rootDependencies, testData.rootDependencies);
    });

    test('attach nested dependencies', t => {
        flatDependencies = helpers.attachNestedDependencies(rootDependencies);
        t.deepEqual(flatDependencies, testData.flatDependencies);
    });

    test('get all dependencies', t => {
        allDependencies = helpers.getAllDependencies(flatDependencies);
        t.deepEqual(allDependencies, testData.allDependencies);
    });

    test.todo('show results');
};

module.exports = tests;


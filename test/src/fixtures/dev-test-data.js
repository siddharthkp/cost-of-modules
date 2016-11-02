let moduleSizesArray = [
    {name: '@whitneyit/data-fn', size: 24},
    {name: 'camelcase', size: 16},
    {name: 'date-time', size: 16},
    {name: 'is', size: 72},
    {name: 'node.extend', size: 20},
    {name: 'once', size: 16},
    {name: 'time-zone', size: 16},
    {name: 'wrappy', size: 16 },
    {name: 'yargs-parser', size:  52}
];

let rootDependencies = [
    '@whitneyit/data-fn',
    'date-time',
    'once',
    'yargs-parser'
];

let flatDependencies = [
    {name: '@whitneyit/data-fn',  children:['node.extend', 'is']},
    {name: 'date-time', children: ['time-zone']},
    {name: 'once', children: ['wrappy']},
    {name: 'yargs-parser', children: ['camelcase']}
];

let allDependencies = [
    '@whitneyit/data-fn',
    'camelcase',
    'date-time',
    'is',
    'node.extend',
    'once',
    'time-zone',
    'wrappy', 
    'yargs-parser'
];

module.exports = {
    moduleSizesArray,
    rootDependencies,
    flatDependencies,
    allDependencies
};

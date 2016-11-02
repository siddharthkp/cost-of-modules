let moduleSizesArray = [
    {name: '@whitneyit/data-fn', size: 24},
    {name: 'date-time', size: 16},
    {name: 'is', size: 72},
    {name: 'node.extend', size: 20},
    {name: 'once', size: 16},
    {name: 'time-zone', size: 16},
    {name: 'wrappy', size: 16 }
];

let rootDependencies = [
    '@whitneyit/data-fn',
    'date-time',
    'once'
];

let flatDependencies = [
    {name: '@whitneyit/data-fn',  children:['node.extend', 'is']},
    {name: 'date-time', children:['time-zone']},
    {name: 'once', children:['wrappy']}
];

let allDependencies = [
    '@whitneyit/data-fn',
    'date-time',
    'is',
    'node.extend',
    'once',
    'time-zone',
    'wrappy'
];

module.exports = {
    moduleSizesArray,
    rootDependencies,
    flatDependencies,
    allDependencies
};

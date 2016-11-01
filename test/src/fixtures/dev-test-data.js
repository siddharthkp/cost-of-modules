let moduleSizes = {
    'callsites': 16,
    'camelcase' :16,
    'date-time': 16,
    'has-color': 12,
    'once': 16,
    'time-zone': 16,
    'wrappy': 16,
    'yargs-parser': 52
};

let rootDependencies = [
    'callsites',
    'date-time',
    'has-color',
    'once',
    'yargs-parser'
];

let flatDependencies = [
    {name: 'callsites', children:[]},
    {name: 'date-time', children: ['time-zone']},
    {name: 'has-color', children:[]},
    {name: 'once', children: ['wrappy']},
    {name: 'yargs-parser', children: ['camelcase']}
];

let allDependencies = [
    'callsites',
    'camelcase',
    'date-time',
    'has-color',
    'once',
    'time-zone',
    'wrappy',
    'yargs-parser'
];

module.exports = {
    moduleSizes,
    rootDependencies,
    flatDependencies,
    allDependencies
};

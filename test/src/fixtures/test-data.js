let rootDependencies = [
    'callsites',
    'date-time',
    'has-color',
    'once'
];

let moduleSizes = {
    'callsites': 16,
    'date-time': 16,
    'has-color': 12,
    'once': 16,
    'time-zone': 16,
    'wrappy': 16
};

let flatDependencies = [
    {name: 'callsites', children:[]},
    {name: 'date-time', children:['time-zone']},
    {name: 'has-color', children:[]},
    {name: 'once', children:['wrappy']}
];

let allDependencies = [
    'callsites',
    'date-time',
    'has-color',
    'once',
    'time-zone',
    'wrappy'
];

module.exports = {
    rootDependencies,
    moduleSizes,
    flatDependencies,
    allDependencies
};

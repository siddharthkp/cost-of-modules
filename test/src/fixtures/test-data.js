let rootDependencies = [
    '@fake/callsites',
    '@fake/has-color',
    'date-time',
    'once'
];

let moduleSizes = {
    '@fake/callsites': 16,
    '@fake/has-color': 12,
    'date-time': 16,
    'once': 16,
    'time-zone': 16,
    'wrappy': 16
};

let flatDependencies = [
    {name: '@fake/callsites', children:[]},
    {name: '@fake/has-color', children:[]},
    {name: 'date-time', children:['time-zone']},
    {name: 'once', children:['wrappy']}
];

let allDependencies = [
    '@fake/callsites',
    '@fake/has-color',
    'date-time',
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

let rootDependencies = ['date-time', 'once'];

let moduleSizes = {
    'date-time': 16,
    'once': 16,
    'time-zone': 16,
    'wrappy': 16
};

let flatDependencies = [
    {name:'date-time', children:['time-zone']},
    {name:'once', children:['wrappy']}
];

let allDependencies = ['date-time', 'time-zone', 'once', 'wrappy'];

module.exports = {
    rootDependencies,
    moduleSizes,
    flatDependencies,
    allDependencies
};

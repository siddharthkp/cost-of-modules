let moduleSizes = {
    '@sindresorhus/df': 16,
    'camelcase' :16,
    'cross-spawn-async': 32,
    'date-time': 16,
    'execa': 16,
    'isexe': 36,
    'lru-cache': 28,
    'npm-run-path': 16,
    'object-assign': 16,
    'once': 16,
    'path-key': 16,
    'pseudomap': 24,
    'strip-eof': 16,
    'time-zone': 16,
    'which': 24,
    'wrappy': 16,
    'yallist': 36,
    'time-zone': 16,
    'wrappy': 16,
    'yargs-parser': 52
};

let rootDependencies = [
    '@sindresorhus/df',
    'date-time',
    'once',
    'yargs-parser'
];

let flatDependencies = [
    {name: '@sindresorhus/df',  children:['execa', 'cross-spawn-async', 'lru-cache', 'pseudomap', 'yallist', 'which', 'isexe', 'npm-run-path', 'object-assign', 'path-key', 'strip-eof']},
    {name: 'date-time', children: ['time-zone']},
    {name: 'once', children: ['wrappy']},
    {name: 'yargs-parser', children: ['camelcase']}
];

let allDependencies = [
    '@sindresorhus/df',
    'camelcase',
    'cross-spawn-async',
    'date-time',
    'execa',
    'isexe',
    'lru-cache',
    'npm-run-path',
    'object-assign',
    'once',
    'path-key',
    'pseudomap',
    'strip-eof',
    'time-zone',
    'which',
    'wrappy',
    'yallist',
    'yargs-parser'
];

module.exports = {
    moduleSizes,
    rootDependencies,
    flatDependencies,
    allDependencies
};

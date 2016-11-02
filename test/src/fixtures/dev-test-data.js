let moduleSizesArray = [
    {name: '@sindresorhus/df', size: 16},
    {name: 'camelcase', size: 16},
    {name: 'cross-spawn-async', size: 32},
    {name: 'date-time', size: 16},
    {name: 'execa', size: 16},
    {name: 'isexe', size: 36},
    {name: 'lru-cache', size: 28},
    {name: 'npm-run-path', size: 16},
    {name: 'object-assign', size: 16},
    {name: 'once', size: 16},
    {name: 'path-key', size: 16},
    {name: 'pseudomap', size: 24},
    {name: 'strip-eof', size: 16},
    {name: 'time-zone', size: 16},
    {name: 'which', size: 24},
    {name: 'wrappy', size: 16},
    {name: 'yallist', size: 36},    
    {name: 'yargs-parser', size:  52}
];

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
    moduleSizesArray,
    rootDependencies,
    flatDependencies,
    allDependencies
};

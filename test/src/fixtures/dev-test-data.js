let moduleSizesArray = 
[ 
  { name: '@whitneyit/data-fn', size: 7 },
  { name: 'camelcase', size: 5 },
  { name: 'date-time', size: 4 },
  { name: 'is', size: 55 },
  { name: 'node.extend', size: 14 },
  { name: 'once', size: 5 },
  { name: 'time-zone', size: 4 },
  { name: 'wrappy', size: 4 },
  { name: 'yargs-parser', size: 35 } 
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

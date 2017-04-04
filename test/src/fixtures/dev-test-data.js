let moduleSizesArray = [
  {name: '@siddharthkp/empty', size: 1},
  {name: 'camelcase', size: 5},
  {name: 'date-time', size: 4},
  {name: 'once', size: 5},
  {name: 'time-zone', size: 4},
  {name: 'wrappy', size: 4},
  {name: 'yargs-parser', size: 35}
];

let rootDependencies = [
    '@siddharthkp/empty',
    'date-time',
    'once',
    'yargs-parser'
];

let flatDependencies = [
    {name: '@siddharthkp/empty',  children:[]},
    {name: 'date-time', children: ['time-zone']},
    {name: 'once', children: ['wrappy']},
    {name: 'yargs-parser', children: ['camelcase']}
];

let allDependencies = [
    '@siddharthkp/empty',
    'camelcase',
    'date-time',
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

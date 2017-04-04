let moduleSizesArray = [
  {name: '@siddharthkp/empty', size: 1},
  {name: 'date-time', size: 4},
  {name: 'once', size: 5},
  {name: 'time-zone', size: 4},
  {name: 'wrappy', size: 4}
];

let rootDependencies = [
    '@siddharthkp/empty',
    'date-time',
    'once',

];

let flatDependencies = [
    {name: '@siddharthkp/empty',  children:[]},
    {name: 'date-time', children:['time-zone']},
    {name: 'once', children:['wrappy']}
];

let allDependencies = [
    '@siddharthkp/empty',
    'date-time',
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

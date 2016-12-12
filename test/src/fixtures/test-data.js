let moduleSizesArray = [
  {name: '@whitneyit/data-fn', size: 7},
  {name: 'date-time', size: 4},
  {name: 'is', size: 55},
  {name: 'node.extend', size: 14},
  {name: 'once', size: 5},
  {name: 'time-zone', size: 4},
  {name: 'wrappy', size: 4} 
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

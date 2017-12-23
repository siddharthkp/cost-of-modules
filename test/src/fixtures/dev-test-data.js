let moduleSizesArray = [
  { name: '@siddharthkp/empty', size: 0 },
  { name: 'camelcase', size: 4 },
  { name: 'date-time', size: 3 },
  { name: 'once', size: 4 },
  { name: 'time-zone', size: 3 },
  { name: 'wrappy', size: 3 },
  { name: 'yargs-parser', size: 34 },
]

let rootDependencies = [
  '@siddharthkp/empty',
  'date-time',
  'once',
  'yargs-parser',
]

let flatDependencies = [
  { name: '@siddharthkp/empty', children: [] },
  { name: 'date-time', children: ['time-zone'] },
  { name: 'once', children: ['wrappy'] },
  { name: 'yargs-parser', children: ['camelcase'] },
]

let allDependencies = [
  '@siddharthkp/empty',
  'camelcase',
  'date-time',
  'once',
  'time-zone',
  'wrappy',
  'yargs-parser',
]

module.exports = {
  moduleSizesArray,
  rootDependencies,
  flatDependencies,
  allDependencies,
}

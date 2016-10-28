let rootDependencies = ['date-time','once','yargs-parser']

let moduleSizes = {
	'camelcase' :16,
	'date-time': 16,
	'once': 16,
	'time-zone': 16,
	'wrappy': 16,
	'yargs-parser': 52
};

let flatDependencies = [
    {name: 'date-time', children: ['time-zone']},
    {name: 'once', children: ['wrappy']},
    {name: 'yargs-parser', children: ['camelcase']}
];

let allDependencies = ['date-time','time-zone','once','wrappy','yargs-parser','camelcase']

module.exports = {
    rootDependencies,
    moduleSizes,
    flatDependencies,
    allDependencies
};

#!/usr/bin/env node

const helpers = require('./helpers')
const { red, green } = require('colors')
const argv = require('yargs-parser')(process.argv.slice(2))
let exitCode = 0
try {
  helpers.setup()

  console.log('Calculating...')
  console.log()

  /*
      Get size for all node modules
      {
          // name: size in bytes,
          a: 40,
          b: 220
      }
  */
  const moduleSizes = helpers.getSizeForNodeModules()

  /*
      Get root dependencies from tree
      These are the ones declared as dependendies in package.json
      [a, b, c, d]
  */
  let rootDependencies = helpers.getRootDependencies()

  /*
      Attach the nested dependendies in a flat manner
      [{
          name: rootDependency,
          children: [a, b, c, d]
      }]
  */
  let flatDependencies = helpers.attachNestedDependencies(rootDependencies)

  /*
      Modules actual size = size of the module + size of it's children
  */
  for (let i = 0; i < flatDependencies.length; i++) {
    let dep = flatDependencies[i]

    let sizeOfModule = moduleSizes[dep.name]

    let sizeOfChildren = 0
    dep.children.forEach(child => {
      sizeOfChildren += moduleSizes[child] || 0
    })

    dep.actualSize = sizeOfModule + sizeOfChildren
    dep.numberOfChildren = dep.children.length
  }

  /*
      All dependencies =
      Root dependencies +  all their children
      Deduplicated
  */
  let allDependencies = helpers.getAllDependencies(flatDependencies)

  /* Total size of node_modules */
  let totalSize = 0
  allDependencies.forEach(dep => {
    totalSize += moduleSizes[dep] || 0
  })

  if (argv.assertSmaller) {
    if (totalSize > argv.assertSmaller) {
      console.info(
        `Total size is bigger than expected ${totalSize}K > ${
          argv.assertSmaller
        }K`.red
      )
      exitCode = 1
    } else {
      console.info(
        `Total size is within parameters ${totalSize}K <= ${
          argv.assertSmaller
        }K`.green
      )
    }
  } else {
    /* Display results */
    helpers.displayResults(flatDependencies, allDependencies, totalSize)
  }
} catch (err) {
  console.error(err)
  exitCode = 1
} finally {
  /* Return to original state */
  console.info('Clearing state')
  helpers.teardown()
}

process.exit(exitCode)

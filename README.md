### Cost of modules
Find out which of your dependencies is causing bloat

[![Build
Status](https://api.travis-ci.org/siddharthkp/cost-of-modules.svg?branch=master)](https://travis-ci.org/siddharthkp/cost-of-modules)
[![npm](https://img.shields.io/npm/v/cost-of-modules.svg?maxAge=3600)](https://www.npmjs.com/package/cost-of-modules)

![Find out which of your dependencies is causing bloat](https://raw.githubusercontent.com/siddharthkp/cost-of-modules/master/screenshot.jpg)

With npm 2.x, it was easy to find which of your dependencies is taking a lot of space. You could just look at the size of each directory in `node_modules`
 
With npm 3 and flat deps this isn't as straightforward. This tool makes it easier.

Inspired from [npm/npm/issues/10361](https://github.com/npm/npm/issues/10361)

#### Install

`npm install -g cost-of-modules`

#### Usage

Run `cost-of-modules` in the directory you are working in.

#### Options

`--less`  Show the biggest 10 modules

#### Show your support

:star: this repo

#### License

MIT © [siddharthkp](https://github.com/siddharthkp)

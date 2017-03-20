### Cost of modules
Find out which of your dependencies is slowing you down

[![Build
Status](https://api.travis-ci.org/siddharthkp/cost-of-modules.svg?branch=master)](https://travis-ci.org/siddharthkp/cost-of-modules)
[![npm](https://img.shields.io/npm/v/cost-of-modules.svg?maxAge=3600)](https://www.npmjs.com/package/cost-of-modules)
[![npm](https://img.shields.io/npm/dt/cost-of-modules.svg?maxAge=3600)](https://www.npmjs.com/package/cost-of-modules)

![Find out which of your dependencies is causing bloat](https://raw.githubusercontent.com/siddharthkp/cost-of-modules/master/screenshot.jpg)

#### Install

`npm install -g cost-of-modules`

#### Usage

Run `cost-of-modules` in the directory you are working in.

#### Options

`--less`  Show the biggest 10 modules

`--yarn`  Use yarn instead of npm to install dependencies

`--no-install`  Skip installation

`--include-dev`  Include devDependencies as well - for 🚀 collaborator experience

#### Show your support

:star: this repo

#### Motivation

I recently published a npm module ([auto-install](https://github.com/siddharthkp/auto-install)) and I wanted to know how many bytes am I making people download before they can use it. Turns out, it was a whopping 30M!

__More than space on disk, I want to optimise for install speed - setup is part of the user experience__

--

Now, there are 3 things that you can do to make your npm package smaller

1. Make sure all your workflow tools are in `devDependencies` and not in `dependencies` These include your build tools, testing frameworks, etc. Only `dependencies` get installed when someone installs your package. (That being said, for better collaborator experience, you should optimise for both)

2. Only include the files you need by using `files` in your `package.json` or by including a `.npmignore`. [More on that here.](https://docs.npmjs.com/files/package.json#files)

3. Use packages which do the job and take the least amount of space. For example, I realised that I did not need `yargs`, I only needed their parser `yargs-parser` which is much smaller.

4. Bonus: Bundle all your code together and strip out the functions that you don't use - I still have to try this out. This could be the most impactful one.

--

In my case, the big size was because of # 3, the bunch of npm packages that I was using.

__You can't fix what you can't measure__

With npm 2.x, it was easy to find how much space is each of your dependencies taking. You could just look at the size of each directory in `node_modules`

With npm 3, the packages are installed in flat manner, so [it isn't so straightforward](https://github.com/npm/npm/issues/10361).

That's the reason why I created this tool.

--

__Future__

I would want to make this tool a pre-publish checklist.

- [x] See the size of your `node_modules`
- [ ] Include the size of your files
- [ ] Check if `files` or `.npmignore` exists
- [ ] Check if there are any `dev dependencies` that are specified as `dependencies` (tricky)
- [ ] Compare size with the last release. Something like this:
![Warning](https://raw.githubusercontent.com/siddharthkp/cost-of-modules/master/warning.png)


#### License

MIT © [siddharthkp](https://github.com/siddharthkp)

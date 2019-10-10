<!--@h1([pkg.name])-->
# with-local-tmp-dir
<!--/@-->

<!--@shields('npm', 'travis', 'coveralls', 'deps')-->
[![npm version](https://img.shields.io/npm/v/with-local-tmp-dir.svg)](https://www.npmjs.com/package/with-local-tmp-dir) [![Build Status](https://img.shields.io/travis/dword-design/with-local-tmp-dir/master.svg)](https://travis-ci.org/dword-design/with-local-tmp-dir) [![Coverage Status](https://img.shields.io/coveralls/dword-design/with-local-tmp-dir/master.svg)](https://coveralls.io/r/dword-design/with-local-tmp-dir?branch=master) [![dependency status](https://img.shields.io/david/dword-design/with-local-tmp-dir.svg)](https://david-dm.org/dword-design/with-local-tmp-dir)
<!--/@-->

<!--@pkg.description-->
Creates a temporary folder inside CWD and passes the path to a function. Afterwards, the folder is removed. Especially useful for testing.
<!--/@-->

## Installation

```sh
# via NPM
npm install --save-dev with-local-tmp-dir

# via Yarn
yarn add --dev with-local-tmp-dir
```

## Usage

```js
const withLocalTmpDir = require('with-local-tmp-dir')

await withLocalTmpDir(() => {
  console.log(process.cwd())
  //> /Users/max/project/tmp-18815DudQxmdn03Rz
})
// Now the folder does not exist anymore

// Also works with async functions =)
await withLocalTmpDir(async () => await ...)

// The folder is removed even if an exception is thrown
await withLocalTmpDir(async () => throw new Error('File could not be found'))
```

## Migrating from Version 1.x to 2.x

Version 2 automatically changes the current working directory into the temporary folder. That's why the `path` parameter is not needed anymore and the path can be directly queried from `process.cwd`.

<!--@license()-->
## License

MIT © Sebastian Landwehr
<!--/@-->

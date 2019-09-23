<!--@h1([pkg.name])-->
# with-local-tmp-dir
<!--/@-->

<!--@shields('coveralls', 'npm', 'deps', 'devDeps')-->
[![Coverage Status](https://img.shields.io/coveralls/dword-design/with-local-tmp-dir/master.svg)](https://coveralls.io/r/dword-design/with-local-tmp-dir?branch=master) [![npm version](https://img.shields.io/npm/v/with-local-tmp-dir.svg)](https://www.npmjs.com/package/with-local-tmp-dir) [![dependency status](https://img.shields.io/david/dword-design/with-local-tmp-dir/master.svg)](https://david-dm.org/dword-design/with-local-tmp-dir/master) [![devDependency status](https://img.shields.io/david/dev/dword-design/with-local-tmp-dir/master.svg)](https://david-dm.org/dword-design/with-local-tmp-dir/master#info=devDependencies)
<!--/@-->

<!--@pkg.description-->
Creates a temporary folder inside CWD and passes the path to a function. Afterwards, the folder is removed. Especially useful for testing with real files.
<!--/@-->

<!--@installation()-->
## Installation

```sh
npm install --save with-local-tmp-dir
```
<!--/@-->

## Usage

```js
const withLocalTmpDir = require('with-local-tmp-dir')

await withLocalTmpDir(path => {
  console.log(path)
  //> /Users/max/project/tmp-18815DudQxmdn03Rz
})
// Now the folder does not exist anymore

// Also works with async functions =)
await withLocalTmpDir(async path => await ...)

// The folder is removed even if an exception is thrown
await withLocalTmpDir(async path => throw new Error('File could not be found'))
```

<!--@license()-->
## License

MIT © Sebastian Landwehr
<!--/@-->

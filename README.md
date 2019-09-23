<!--@h1([pkg.name])-->
# with-local-tmp-dir
<!--/@-->

<!--@'> ' + pkg.description-->
> Output a tree of files and directories by providing an object. Especially useful for testing.
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

withLocalTmpDir(path => {
  console.log(path)
  //> /Users/max/project/tmp-18815DudQxmdn03Rz
})
// Now the folder does not exist anymore

// Also works with async functions =)
withLocalTmpDir(async path => await ...)

// The folder is removed even if an exception is thrown
withLocalTmpDir(async path => throw new Error('File could not be found'))
```

<!--@license()-->
## License

MIT © Sebastian Landwehr
<!--/@-->

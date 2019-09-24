<!--@h1([pkg.name])-->
# with-local-tmp-dir
<!--/@-->

<!--@shields('travis', 'coveralls')-->
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

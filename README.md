<!-- TITLE/ -->
# with-local-tmp-dir
<!-- /TITLE -->

<!-- BADGES/ -->
[![NPM version](https://img.shields.io/npm/v/with-local-tmp-dir.svg)](https://npmjs.org/package/with-local-tmp-dir)
![Linux macOS Windows compatible](https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue)

[![Build status](https://img.shields.io/github/workflow/status/dword-design/with-local-tmp-dir/build)](https://github.com/dword-design/with-local-tmp-dir/actions)
[![Coverage status](https://img.shields.io/coveralls/dword-design/with-local-tmp-dir)](https://coveralls.io/github/dword-design/with-local-tmp-dir)
[![Dependency status](https://img.shields.io/david/dword-design/with-local-tmp-dir)](https://david-dm.org/dword-design/with-local-tmp-dir)
![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/dword-design/with-local-tmp-dir)
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
Creates a temporary folder inside CWD and passes the path to a function. Afterwards, the folder is removed. Especially useful for testing.
<!-- /DESCRIPTION -->

<!-- INSTALL/ -->
# Install

```bash
# NPM
$ npm install with-local-tmp-dir

# Yarn
$ yarn add with-local-tmp-dir
```
<!-- /INSTALL -->

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

// Create the temporary folder in a specific path
await withLocalTmpDir('my-subpath', () => console.log(process.cwd()))

// Keep folder if not empty
await withLocalTmpDir('my-subpath', () => console.log(process.cwd()), { unsafeCleanup: false })
```

<!-- LICENSE/ -->
# License

Unless stated otherwise all works are:

Copyright &copy; Sebastian Landwehr <info@dword-design.de>

and licensed under:

[MIT License](https://opensource.org/licenses/MIT)
<!-- /LICENSE -->

<!-- TITLE/ -->
# with-local-tmp-dir
<!-- /TITLE -->

<!-- BADGES/ -->
  <p>
    <a href="https://npmjs.org/package/with-local-tmp-dir">
      <img
        src="https://img.shields.io/npm/v/with-local-tmp-dir.svg"
        alt="npm version"
      >
    </a><img src="https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue" alt="Linux macOS Windows compatible"><a href="https://github.com/dword-design/with-local-tmp-dir/actions">
      <img
        src="https://github.com/dword-design/with-local-tmp-dir/workflows/build/badge.svg"
        alt="Build status"
      >
    </a><a href="https://codecov.io/gh/dword-design/with-local-tmp-dir">
      <img
        src="https://codecov.io/gh/dword-design/with-local-tmp-dir/branch/master/graph/badge.svg"
        alt="Coverage status"
      >
    </a><a href="https://david-dm.org/dword-design/with-local-tmp-dir">
      <img src="https://img.shields.io/david/dword-design/with-local-tmp-dir" alt="Dependency status">
    </a><img src="https://img.shields.io/badge/renovate-enabled-brightgreen" alt="Renovate enabled"><br/><a href="https://gitpod.io/#https://github.com/dword-design/with-local-tmp-dir">
      <img
        src="https://gitpod.io/button/open-in-gitpod.svg"
        alt="Open in Gitpod"
        height="32"
      >
    </a><a href="https://www.buymeacoffee.com/dword">
      <img
        src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
        alt="Buy Me a Coffee"
        height="32"
      >
    </a><a href="https://paypal.me/SebastianLandwehr">
      <img
        src="https://dword-design.de/images/paypal.svg"
        alt="PayPal"
        height="32"
      >
    </a><a href="https://www.patreon.com/dworddesign">
      <img
        src="https://dword-design.de/images/patreon.svg"
        alt="Patreon"
        height="32"
      >
    </a>
</p>
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
Creates a temporary folder inside cwd, cds inside the folder, runs a function, and removes the folder. Especially useful for testing.
<!-- /DESCRIPTION -->

This package can be used to write file-based tests with real files. See below for some examples.

<!-- INSTALL/ -->
## Install

```bash
# npm
$ npm install with-local-tmp-dir

# Yarn
$ yarn add with-local-tmp-dir
```
<!-- /INSTALL -->

## Basic Usage

```js
const withLocalTmpDir = require('with-local-tmp-dir')
const fs = require('fs-extra')

await withLocalTmpDir(() => {
  console.log(process.cwd())
  //> /Users/max/project/tmp-18815DudQxmdn03Rz

  // Create some files
  await fs.outputFile('foo.txt', 'foo bar')
  await fs.outputFile('bar.txt', 'foo bar')
})
// Now the folder does not exist anymore

// The folder is removed even if an exception is thrown
await withLocalTmpDir(() => throw new Error('File could not be found'))
```

## Options

You can specify an options object that is passed down to [tmp-promise](https://github.com/benjamingr/tmp-promise). Check the readme for details. Some default values are adjusted, but they still can be overridden.

```js
const withLocalTmpDir = require('with-local-tmp-dir')
const fs = require('fs-extra')

// run in a subfolder
await withLocalTmpDir(() => {
  console.log(process.cwd())
  //> /Users/max/project/foo/tmp-18815DudQxmdn03Rz
}, { dir: 'foo' })

// do not cleanup if there are files
await withLocalTmpDir(() => {
  await fs.outputFile('foo.txt', 'foo bar')
}, { unsafeCleanup: false })

// use a different prefix
await withLocalTmpDir(() => {
  console.log(process.cwd())
  //> /Users/max/project/foo-18815DudQxmdn03Rz
}, { prefix: 'foo' })
```

## Unit Tests with output-files and endent

The most common use case for this package is probably unit tests with Mocha or Jest. The package itself is framework-agnostic, so you can use any of them. To make life easier when writing multiple files with multi-line text content, there are two handy packages: [output-files](git@github.com:dword-design/output-files.git) and [endent](https://github.com/indentjs/endent).

The following is an example for Mocha:

```js
const withLocalTmpDir = require('with-local-tmp-dir')
const outputFiles = require('output-files')
const endent = require('endent')

const funcToTest = require('.')

it('works', () => withLocalTmpDir(async () => {
  await outputFiles({
    'foo.txt': endent`
      Lorem ipsum
      dolor sit
    `,
    'index.js': endent`
      export default {
        foo: 1,
        bar: 2,
      }
    `,
  })
  funcToTest()
})
```

## Git-Based Tests

It is also possible to test libraries that make use of Git. You can instantiate a local Git repository inside the temporary folder and run Git operations on it:

```js
const withLocalTmpDir = require('with-local-tmp-dir')
const fs = require('fs-extra')
const execa = require('execa')

it('works', () => withLocalTmpDir(async () => {
  await execa.command('git init')
  await execa.command('git config user.email "foo@bar.de"')
  await execa.command('git config user.name "foo"')

  await outputFile('foo.txt', 'foo bar')

  await execa.command('git add .')
  await execa.command('git commit -m "feat: init"')
  funcToTest()
})
```

Be careful though, if the repository is not properly initialized, your user Git config might be overridden!

<!-- LICENSE/ -->
## Contribute

Are you missing something or want to contribute? Feel free to file an [issue](https://github.com/dword-design/with-local-tmp-dir/issues) or a [pull request](https://github.com/dword-design/with-local-tmp-dir/pulls)! ⚙️

## Support

Hey, I am Sebastian Landwehr, a freelance web developer, and I love developing web apps and open source packages. If you want to support me so that I can keep packages up to date and build more helpful tools, you can donate here:

<p>
  <a href="https://www.buymeacoffee.com/dword">
    <img
      src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
      alt="Buy Me a Coffee"
      height="32"
    >
  </a>&nbsp;If you want to send me a one time donation. The coffee is pretty good 😊.<br/>
  <a href="https://paypal.me/SebastianLandwehr">
    <img
      src="https://dword-design.de/images/paypal.svg"
      alt="PayPal"
      height="32"
    >
  </a>&nbsp;Also for one time donations if you like PayPal.<br/>
  <a href="https://www.patreon.com/dworddesign">
    <img
      src="https://dword-design.de/images/patreon.svg"
      alt="Patreon"
      height="32"
    >
  </a>&nbsp;Here you can support me regularly, which is great so I can steadily work on projects.
</p>

Thanks a lot for your support! ❤️

## License

[MIT License](https://opensource.org/licenses/MIT) © [Sebastian Landwehr](https://dword-design.de)
<!-- /LICENSE -->

<!-- TITLE/ -->

<h1>with-local-tmp-dir</h1>

<!-- /TITLE -->


<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/with-local-tmp-dir" title="View this project on NPM"><img src="https://img.shields.io/npm/v/with-local-tmp-dir.svg" alt="NPM version" /></a></span>
<span class="badge-travisci"><a href="http://travis-ci.org/dword-design/with-local-tmp-dir" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/dword-design/with-local-tmp-dir/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-coveralls"><a href="https://coveralls.io/r/dword-design/with-local-tmp-dir" title="View this project's coverage on Coveralls"><img src="https://img.shields.io/coveralls/dword-design/with-local-tmp-dir.svg" alt="Coveralls Coverage Status" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/dword-design/with-local-tmp-dir" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/dword-design/with-local-tmp-dir.svg" alt="Dependency Status" /></a></span>
<span class="badge-shields"><a href="https://img.shields.io/badge/renovate-enabled-brightgreen.svg"><img src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg" /></a></span>

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Creates a temporary folder inside CWD and passes the path to a function. Afterwards, the folder is removed. Especially useful for testing.

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

<h2>Install</h2>

<a href="https://npmjs.com" title="npm is a package manager for javascript"><h3>npm</h3></a>
<ul>
<li>Install: <code>npm install --save with-local-tmp-dir</code></li>
<li>Require: <code>require('with-local-tmp-dir')</code></li>
</ul>

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

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; Sebastian Landwehr</li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->

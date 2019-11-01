const withLocalTmpDir = require('with-local-tmp-dir')
const { basename, dirname, join } = require('path')
const { exists, outputFile, ensureDir, remove } = require('fs-extra')
const expect = require('expect')

module.exports = async () => {
  let path
  let innerFileExists = false
  await withLocalTmpDir(async () => {
    path = process.cwd()
    await outputFile('foo.txt', 'foo')
    innerFileExists = await exists('foo.txt')
  })
  expect(innerFileExists).toBeTruthy()
  expect(await exists(path)).toBeFalsy()
}

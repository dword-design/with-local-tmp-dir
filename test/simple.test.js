const withLocalTmpDir = require('with-local-tmp-dir')
const { basename, dirname, join } = require('path')
const { exists, outputFile, ensureDir, remove } = require('fs-extra')
const expect = require('expect')

module.exports = async () => {
  const cwd = process.cwd()
  let path
  await withLocalTmpDir(() => {
    expect(basename(process.cwd()).startsWith('tmp-')).toBeTruthy()
    expect(dirname(process.cwd())).toEqual(cwd)
    path = process.cwd()
  })
  expect(process.cwd()).toEqual(cwd)
  expect(path).toBeDefined()
  expect(await exists(path)).toBeFalsy()
}

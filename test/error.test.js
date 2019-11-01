const withLocalTmpDir = require('with-local-tmp-dir')
const { basename, dirname, join } = require('path')
const { exists, outputFile, ensureDir, remove } = require('fs-extra')
const expect = require('expect')

module.exports = async () => {
  const cwd = process.cwd()
  let path
  await expect(withLocalTmpDir(async () => {
    path = process.cwd()
    throw new Error()
  })).rejects.toThrow()
  expect(path).toBeDefined()
  expect(await exists(path)).toBeFalsy()
  expect(process.cwd()).toEqual(cwd)
}

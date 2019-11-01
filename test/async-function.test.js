const withLocalTmpDir = require('with-local-tmp-dir')
const { basename, dirname, join } = require('path')
const { exists, outputFile, ensureDir, remove } = require('fs-extra')
const expect = require('expect')

module.exports = done => {
  withLocalTmpDir(async () => {
    path1 = process.cwd()
    await new Promise(resolve => setTimeout(resolve, 500))
    path2 = process.cwd()
    expect(path1).toEqual(path2)
    expect(basename(path1).startsWith('tmp-')).toBeTruthy()
    expect(basename(path2).startsWith('tmp-')).toBeTruthy()
  })
    .then(done)
}

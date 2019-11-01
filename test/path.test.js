const withLocalTmpDir = require('with-local-tmp-dir')
const { basename, dirname, join } = require('path')
const { exists, outputFile, ensureDir, remove } = require('fs-extra')
const expect = require('expect')

module.exports = done => {
  const cwd = process.cwd()
  ensureDir('foo')
    .then(() => withLocalTmpDir('foo', () => {
      expect(basename(process.cwd()).startsWith('tmp-')).toBeTruthy()
      expect(dirname(process.cwd())).toEqual(join(cwd, 'foo'))
    }))
    .then(() => remove('foo'))
    .then(done)
}

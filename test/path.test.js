import withLocalTmpDir from 'with-local-tmp-dir'
import { basename, dirname, join } from 'path'
import { ensureDir, remove } from 'fs-extra'
import expect from 'expect'

export default done => {
  const cwd = process.cwd()
  ensureDir('foo')
    .then(() => withLocalTmpDir('foo', () => {
      expect(basename(process.cwd()).startsWith('tmp-')).toBeTruthy()
      expect(dirname(process.cwd())).toEqual(join(cwd, 'foo'))
    }))
    .then(() => remove('foo'))
    .then(done)
}

import withLocalTmpDir from 'with-local-tmp-dir'
import { basename } from 'path'
import expect from 'expect'

export default done => {
  withLocalTmpDir(async () => {
    const path1 = process.cwd()
    await new Promise(resolve => setTimeout(resolve, 500))
    const path2 = process.cwd()
    expect(path1).toEqual(path2)
    expect(basename(path1).startsWith('tmp-')).toBeTruthy()
    expect(basename(path2).startsWith('tmp-')).toBeTruthy()
  })
    .then(done)
}

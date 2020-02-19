import withLocalTmpDir from 'with-local-tmp-dir'
import P from 'path'
import { exists, outputFile, ensureDir, remove } from 'fs-extra'

export default {
  'async function': done => {
    withLocalTmpDir(async () => {
      const path1 = process.cwd()
      await new Promise(resolve => setTimeout(resolve, 500))
      const path2 = process.cwd()
      expect(path1).toEqual(path2)
      expect(P.basename(path1).startsWith('tmp-')).toBeTruthy()
      expect(P.basename(path2).startsWith('tmp-')).toBeTruthy()
    })
      .then(done)
  },
  error: async () => {
    const cwd = process.cwd()
    let path
    await expect(withLocalTmpDir(async () => {
      path = process.cwd()
      throw new Error()
    })).rejects.toThrow()
    expect(path).toBeDefined()
    expect(await exists(path)).toBeFalsy()
    expect(process.cwd()).toEqual(cwd)
  },
  'non-empty': async () => {
    let path
    let innerFileExists = false
    await withLocalTmpDir(async () => {
      path = process.cwd()
      await outputFile('foo.txt', 'foo')
      innerFileExists = await exists('foo.txt')
    })
    expect(innerFileExists).toBeTruthy()
    expect(await exists(path)).toBeFalsy()
  },
  path: done => {
    const cwd = process.cwd()
    ensureDir('foo')
      .then(() => withLocalTmpDir('foo', () => {
        expect(P.basename(process.cwd()).startsWith('tmp-')).toBeTruthy()
        expect(P.dirname(process.cwd())).toEqual(P.join(cwd, 'foo'))
      }))
      .then(() => remove('foo'))
      .then(done)
  },
  simple: async () => {
    const cwd = process.cwd()
    let path
    await withLocalTmpDir(() => {
      expect(P.basename(process.cwd()).startsWith('tmp-')).toBeTruthy()
      expect(P.dirname(process.cwd())).toEqual(cwd)
      path = process.cwd()
    })
    expect(process.cwd()).toEqual(cwd)
    expect(path).toBeDefined()
    expect(await exists(path)).toBeFalsy()
  },
  'unsafe cleanup cwd': async () => {
    let path
    await expect(withLocalTmpDir(async () => {
      await outputFile('test.txt', '')
      path = process.cwd()
    }, { unsafeCleanup: false })).rejects.toThrow()
    expect(await exists(path)).toBeTruthy()
    await remove(path)
  },
  'unsafe cleanup path': async () => {
    let path
    await ensureDir('foo')
    await expect(withLocalTmpDir('foo', async () => {
      await outputFile('test.txt', '')
      path = process.cwd()
    }, { unsafeCleanup: false })).rejects.toThrow()
    expect(P.dirname(path)).toEqual(P.resolve('foo'))
    expect(await exists(path)).toBeTruthy()
    await remove(path)
  },
}

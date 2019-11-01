const withLocalTmpDir = require('with-local-tmp-dir')
const { basename, dirname, join } = require('path')
const { exists, outputFile, ensureDir } = require('fs-extra')
const expect = require('expect')

describe('index', () => {

  it('simple', async () => {
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
  })

  it('non-empty', async () => {
    let path
    let innerFileExists = false
    await withLocalTmpDir(async () => {
      path = process.cwd()
      await outputFile('foo.txt', 'foo')
      innerFileExists = await exists('foo.txt')
    })
    expect(innerFileExists).toBeTruthy()
    expect(await exists(path)).toBeFalsy()
  })

  it('error', async () => {
    const cwd = process.cwd()
    let path
    await expect(withLocalTmpDir(async () => {
      path = process.cwd()
      throw new Error()
    })).rejects.toThrow()
    expect(path).toBeDefined()
    expect(await exists(path)).toBeFalsy()
    expect(process.cwd()).toEqual(cwd)
  })

  it('async function', done => {
    withLocalTmpDir(async () => {
      path1 = process.cwd()
      await new Promise(resolve => setTimeout(resolve, 500))
      path2 = process.cwd()
      expect(path1).toEqual(path2)
      expect(basename(path1).startsWith('tmp-')).toBeTruthy()
      expect(basename(path2).startsWith('tmp-')).toBeTruthy()
      done()
    })
  })

  it('path', done => {
    const cwd = process.cwd()
    ensureDir('foo')
      .then(() => withLocalTmpDir('foo', () => {
        expect(basename(process.cwd()).startsWith('tmp-')).toBeTruthy()
        expect(dirname(process.cwd())).toEqual(join(cwd, 'foo'))
        done()
      }))
  })
})

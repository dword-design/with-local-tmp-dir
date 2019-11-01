const withLocalTmpDir = require('with-local-tmp-dir')
const { basename, dirname } = require('path')
const { exists, outputFile } = require('fs-extra')
const expect = require('expect')

describe('index', () => {

  it('is temporary directory', done => {
    withLocalTmpDir(() => {
      expect(basename(process.cwd()).startsWith('tmp-')).toBeTruthy()
      done()
    })
  })

  it('is subdirectory of cwd', done => {
    const cwd = process.cwd()
    withLocalTmpDir(() => {
      expect(dirname(process.cwd())).toEqual(cwd)
      done()
    })
  })

  it('cwd is reset', async () => {
    const cwd = process.cwd()
    await withLocalTmpDir(() => {})
    expect(process.cwd()).toEqual(cwd)
  })

  it('temporary directory is removed afterwards', async () => {
    let path
    await withLocalTmpDir(() => path = process.cwd())
    expect(path).toBeDefined()
    expect(await exists(path)).toBeFalsy()
  })

  it('temporary directory is removed even if not empty', async () => {
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

  it('temporary directory is removed if error occurs', async () => {
    let path
    await expect(withLocalTmpDir(async () => {
      path = process.cwd()
      throw new Error()
    })).rejects.toThrow()
    expect(path).toBeDefined()
    expect(await exists(path)).toBeFalsy()
  })

  it('cwd is reset if error occurs', async () => {
    const cwd = process.cwd()
    await expect(withLocalTmpDir(async () => {
      throw new Error()
    })).rejects.toThrow()
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
})

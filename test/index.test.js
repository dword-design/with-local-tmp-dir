const withLocalTmpDir = require('with-local-tmp-dir')
const { basename, join, dirname } = require('path')
const { exists, outputFile } = require('fs-extra')
const expect = require('expect')

it('is temporary directory', async () => {
  let folderName
  await withLocalTmpDir(() => folderName = basename(process.cwd()))
  expect(folderName.startsWith('tmp-')).toBeTruthy()
})

it('is subdirectory of cwd', async () => {
  let path
  await withLocalTmpDir(() => path = process.cwd())
  expect(process.cwd()).toEqual(dirname(path))
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

it('async function', async () => {
  let path1
  let path2
  await withLocalTmpDir(async () => {
    path1 = process.cwd()
    await new Promise(resolve => setTimeout(resolve, 500))
    path2 = process.cwd()
  })
  expect(path1).toEqual(path2)
  expect(basename(path1).startsWith('tmp-')).toBeTruthy()
  expect(basename(path2).startsWith('tmp-')).toBeTruthy()
})

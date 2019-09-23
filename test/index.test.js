const withLocalTmpDir = require('../src')
const { basename, join, dirname } = require('path')
const { exists, outputFile } = require('fs-extra')

test('is temporary directory', async () => {
  let folderName
  await withLocalTmpDir(path => folderName = basename(path))
  expect(folderName.startsWith('tmp-')).toBeTruthy()
})

test('is subdirectory of cwd', async () => {
  let path
  await withLocalTmpDir(_path => path = _path)
  expect(process.cwd()).toEqual(dirname(path))
})

test('temporary directory is removed afterwards', async () => {
  let path
  await withLocalTmpDir(_path => path = _path)
  expect(path).toBeDefined()
  expect(await exists(path)).toBeFalsy()
})

test('temporary directory is removed even if not empty', async () => {
  let path
  await withLocalTmpDir(async _path => {
    path = _path
    await outputFile(join(path, 'foo.txt'), 'foo')
  })
  expect(await exists(path)).toBeFalsy()
})

test('temporary directory is removed if error occurs', async () => {
  let path
  await expect(withLocalTmpDir(async _path => {
    path = _path
    throw new Error()
  })).rejects.toThrow()
  expect(path).toBeDefined()
  expect(await exists(path)).toBeFalsy()
})

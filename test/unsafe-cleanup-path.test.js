import withLocalTmpDir from 'with-local-tmp-dir'
import { dirname } from 'path'
import { exists, outputFile, remove } from 'fs'
import expect from 'expect'

export default async () => {
  let path
  await expect(withLocalTmpDir('test', async () => {
    await outputFile('test.txt', '')
    path = process.cwd()
  }, { unsafeCleanup: false })).rejects.toThrow()
  expect(dirname(path)).toEqual(__dirname)
  expect(await exists(path)).toBeTruthy()
  await remove(path)
}

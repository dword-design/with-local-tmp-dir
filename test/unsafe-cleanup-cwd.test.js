import withLocalTmpDir from 'with-local-tmp-dir'
import { exists, outputFile, remove } from 'fs-extra'
import expect from 'expect'

export default async () => {
  let path
  await expect(withLocalTmpDir(async () => {
    await outputFile('test.txt', '')
    path = process.cwd()
  }, { unsafeCleanup: false })).rejects.toThrow()
  expect(await exists(path)).toBeTruthy()
  await remove(path)
}

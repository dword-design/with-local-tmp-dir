import withLocalTmpDir from 'with-local-tmp-dir'
import { exists, outputFile } from 'fs-extra'
import expect from 'expect'

export default async () => {
  let path
  let innerFileExists = false
  await withLocalTmpDir(async () => {
    path = process.cwd()
    await outputFile('foo.txt', 'foo')
    innerFileExists = await exists('foo.txt')
  })
  expect(innerFileExists).toBeTruthy()
  expect(await exists(path)).toBeFalsy()
}

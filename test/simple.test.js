import withLocalTmpDir from 'with-local-tmp-dir'
import { basename, dirname } from 'path'
import { exists } from 'fs-extra'
import expect from 'expect'

export default async () => {
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
}

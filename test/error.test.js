import withLocalTmpDir from 'with-local-tmp-dir'
import { exists } from 'fs'
import expect from 'expect'

export default async () => {
  const cwd = process.cwd()
  let path
  await expect(withLocalTmpDir(async () => {
    path = process.cwd()
    throw new Error()
  })).rejects.toThrow()
  expect(path).toBeDefined()
  expect(await exists(path)).toBeFalsy()
  expect(process.cwd()).toEqual(cwd)
}

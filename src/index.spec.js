import { delay } from '@dword-design/functions'
import { ensureDir, exists, outputFile, remove } from 'fs-extra'
import P from 'path'

import self from '.'

export default {
  'async function': async () => {
    let path1
    let path2
    await self(async () => {
      path1 = process.cwd()
      await new Promise(resolve => setTimeout(resolve, 500))
      path2 = process.cwd()
    })
    expect(path1).toEqual(path2)
    expect(P.basename(path1).startsWith('tmp-')).toBeTruthy()
    expect(P.basename(path2).startsWith('tmp-')).toBeTruthy()
  },
  dir: async () => {
    const cwd = process.cwd()
    await ensureDir('foo')
    let innerCwd
    await self(() => (innerCwd = process.cwd()), {
      dir: 'foo',
    })
    expect(P.basename(innerCwd).startsWith('tmp-')).toBeTruthy()
    expect(P.dirname(innerCwd)).toEqual(P.join(cwd, 'foo'))
    await remove('foo')
  },
  'error: async': async () => {
    const cwd = process.cwd()
    let path
    await expect(
      self(async () => {
        path = process.cwd()
        await delay(10)
        throw new Error()
      })
    ).rejects.toThrow()
    expect(path).toBeDefined()
    expect(await exists(path)).toBeFalsy()
    expect(process.cwd()).toEqual(cwd)
  },
  'error: sync': async () => {
    const cwd = process.cwd()
    let path
    await expect(
      self(() => {
        path = process.cwd()
        throw new Error()
      })
    ).rejects.toThrow()
    expect(path).toBeDefined()
    expect(await exists(path)).toBeFalsy()
    expect(process.cwd()).toEqual(cwd)
  },
  'non-empty': async () => {
    let path
    let innerFileExists = false
    await self(async () => {
      path = process.cwd()
      await outputFile('foo.txt', 'foo')
      innerFileExists = await exists('foo.txt')
    })
    expect(innerFileExists).toBeTruthy()
    expect(await exists(path)).toBeFalsy()
  },
  prefix: async () => {
    let path
    await self(() => (path = process.cwd()), { prefix: 'foo' })
    expect(P.basename(path).startsWith('foo-')).toBeTruthy()
    expect(P.dirname(path)).toEqual(process.cwd())
  },
  reset: async () => {
    const cwd = process.cwd()

    const reset = await self()

    const path = process.cwd()
    expect(P.basename(path).startsWith('tmp-')).toBeTruthy()
    expect(P.dirname(path)).toEqual(cwd)
    await reset()
    expect(process.cwd()).toEqual(cwd)
    expect(await exists(path)).toBeFalsy()
  },
  simple: async () => {
    const cwd = process.cwd()
    let path
    await self(() => (path = process.cwd()))
    expect(process.cwd()).toEqual(cwd)
    expect(P.basename(path).startsWith('tmp-')).toBeTruthy()
    expect(P.dirname(path)).toEqual(cwd)
    expect(await exists(path)).toBeFalsy()
  },
  'unsafe cleanup and dir': async () => {
    let path
    await ensureDir('foo')
    await expect(
      self(
        async () => {
          await outputFile('test.txt', '')
          path = process.cwd()
        },
        { dir: 'foo', unsafeCleanup: false }
      )
    ).rejects.toThrow()
    expect(P.dirname(path)).toEqual(P.resolve('foo'))
    expect(await exists(path)).toBeTruthy()
    await remove(path)
    await remove('foo')
  },
  'unsafe cleanup cwd': async () => {
    let path
    await expect(
      self(
        async () => {
          await outputFile('test.txt', '')
          path = process.cwd()
        },
        { unsafeCleanup: false }
      )
    ).rejects.toThrow()
    expect(await exists(path)).toBeTruthy()
    await remove(path)
  },
}

import delay from 'delay'
import { ensureDir, exists, outputFile, remove } from 'fs-extra'
import P from 'path'

import self from '.'

export default {
  'async function': () =>
    self(async () => {
      const path1 = process.cwd()
      await new Promise(resolve => setTimeout(resolve, 500))
      const path2 = process.cwd()
      expect(path1).toEqual(path2)
      expect(P.basename(path1).startsWith('tmp-')).toBeTruthy()
      expect(P.basename(path2).startsWith('tmp-')).toBeTruthy()
    }),
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
  path: async () => {
    const cwd = process.cwd()
    await ensureDir('foo')
    self('foo', () => {
      expect(P.basename(process.cwd()).startsWith('tmp-')).toBeTruthy()
      expect(P.dirname(process.cwd())).toEqual(P.join(cwd, 'foo'))
    })
    await remove('foo')
  },
  simple: async () => {
    const cwd = process.cwd()
    let path
    await self(() => {
      expect(P.basename(process.cwd()).startsWith('tmp-')).toBeTruthy()
      expect(P.dirname(process.cwd())).toEqual(cwd)
      path = process.cwd()
    })
    expect(process.cwd()).toEqual(cwd)
    expect(path).toBeDefined()
    expect(await exists(path)).toBeFalsy()
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
  'unsafe cleanup path': async () => {
    let path
    await ensureDir('foo')
    await expect(
      self(
        'foo',
        async () => {
          await outputFile('test.txt', '')
          path = process.cwd()
        },
        { unsafeCleanup: false }
      )
    ).rejects.toThrow()
    expect(P.dirname(path)).toEqual(P.resolve('foo'))
    expect(await exists(path)).toBeTruthy()
    await remove(path)
  },
}

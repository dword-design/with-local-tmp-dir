import chdir from '@dword-design/chdir'
import tmp from 'tmp-promise'

export default async (...args) => {
  let options = args.find(arg => typeof arg === 'object')
  options = {
    dir: process.cwd(),
    tmpdir: process.cwd(),
    unsafeCleanup: true,
    ...options,
  }

  const callback = args.find(arg => typeof arg === 'function')
  if (callback) {
    return tmp.withDir(context => chdir(context.path, callback), options)
  }

  const context = await tmp.dir(options)

  const back = chdir(context.path)

  return () => {
    back()

    return context.cleanup()
  }
}

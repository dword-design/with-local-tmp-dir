import chdir from '@dword-design/chdir'
import tmp from 'tmp-promise'

import packageConfig from '@/package.json'

export default (callback, options) => {
  options = {
    dir: process.cwd(),
    tmpdir: process.cwd(),
    unsafeCleanup: true,
    ...options,
  }
  if (callback === undefined) {
    throw new Error(`Callback is required for ${packageConfig.name}`)
  }

  return tmp.withDir(context => chdir(context.path, callback), options)
}

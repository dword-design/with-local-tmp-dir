import chdir from '@dword-design/chdir'
import tmp from 'tmp-promise'

export default (...args) => {
  args = typeof args[0] === 'string' ? args : [process.cwd(), ...args]

  const path = args[0]

  const callback = args[1]

  const options = { unsafeCleanup: true, ...args[2] }

  return tmp.withDir(context => chdir(context.path, callback), {
    dir: path,
    tmpdir: process.cwd(),
    unsafeCleanup: options.unsafeCleanup,
  })
}

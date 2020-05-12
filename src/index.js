import tmp from 'tmp-promise'
import chdir from 'chdir'

export default (...args) => {
  args = typeof args[0] === 'string' ? args : [process.cwd(), ...args]
  const path = args[0]
  const callback = args[1]
  const { unsafeCleanup = true } = args[2] || {}

  return tmp.withDir(
    ({ path }) => chdir(path, callback),
    { unsafeCleanup, tmpdir: process.cwd(), dir: path },
  )
}

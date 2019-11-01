const tmp = require('tmp-promise')
const chdir = require('chdir')

module.exports = async (...args) => {
  const path = args.length >= 2 ? args[0] : undefined
  const callback = args.length >= 2 ? args[1] : args[0]

  return tmp.withDir(
    ({ path }) => chdir(path, callback),
    { unsafeCleanup: true, dir: path !== undefined ? path : process.cwd() },
  )
}

const tmp = require('tmp-promise')

module.exports = async (...args) => {
  const path = args.length >= 2 ? args[0] : undefined
  const callback = args.length >= 2 ? args[1] : args[0]

  return tmp.withDir(
    async ({ path }) => {
      const previousCwd = process.cwd()
      process.chdir(path)
      try {
        await callback()
      } finally {
        process.chdir(previousCwd)
      }
    },
    { unsafeCleanup: true, dir: path !== undefined ? path : process.cwd() },
  )
}

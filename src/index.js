import tmp from 'tmp-promise'

export default async callback => tmp.withDir(
  async ({ path }) => {
    const previousCwd = process.cwd()
    process.chdir(path)
    try {
      await callback()
    } finally {
      process.chdir(previousCwd)
    }
  },
  { unsafeCleanup: true, dir: process.cwd() },
)

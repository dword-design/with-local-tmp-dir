const tmp = require('tmp-promise')

module.exports = async callback => tmp.withDir(({ path }) => callback(path), { unsafeCleanup: true, dir: process.cwd() })

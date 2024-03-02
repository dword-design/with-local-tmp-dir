export interface withLocalTmpDirOptions {
  unsafeCleanup?: boolean
  dir?: string
  prefix?: string
}
declare function withLocalTmpDirFunc(args: withLocalTmpDirOptions | (() => Promise<void>)): Promise<string>
export default withLocalTmpDirFunc

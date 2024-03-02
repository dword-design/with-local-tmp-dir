export interface WithLocalTmpDirOptions {
  /**
   * If false then tmp directory will NOT be deleted if it contains files
   * */
  unsafeCleanup?: boolean
  /**
   * A subfolder to create the tmp directory in
   * */
  dir?: string
  /**
   * A prefix to prepend to the name of the tmp directory
   * */
  prefix?: string
}
/**
 * A callback which runs in the context of a temporary directory. After the callback is completed context is returned to the original directory.
 * */
export type TmpDirCallback = () => Promise<void>;

export type WithLocalTmpDirArgs = TmpDirCallback | WithLocalTmpDirOptions;

/**
 * A promise returned from withLocalTmpDir that, when executed, cleans up the tmp directory. Can be used instead of the callback.
 * */
export type ResetFunc = Promise<void>;

declare function withLocalTmpDirFunc(...args: WithLocalTmpDirArgs[]): ResetFunc
export default withLocalTmpDirFunc

import crypto from 'node:crypto';
import fsPromises from 'node:fs/promises';
import pathLib from 'node:path';

import chdir from '@dword-design/chdir';
import fs from 'fs-extra';
import pRetry from 'p-retry';
import type { DirOptions } from 'tmp';

const TEMPLATE_PATTERN = /XXXXXX/;

const RANDOM_CHARS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export interface NameOptions {
  dir: string;
  prefix: string;
  postfix?: string;
  template?: string;
  name?: string;
}

export interface Options extends NameOptions {
  tries: number;
  keep: boolean;
  unsafeCleanup: boolean;
  mode: number;
}

/**
 * Random name generator based on crypto.
 * Adapted from http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
 *
 * @param {number} howMany
 * @returns {string} the generated random name
 * @private
 */
const _randomChars = (howMany: number) => {
  const value = [];
  let rnd = null;

  // make sure that we do not fail because we ran out of entropy
  try {
    rnd = crypto.randomBytes(howMany);
  } catch {
    rnd = crypto.pseudoRandomBytes(howMany);
  }

  for (let i = 0; i < howMany; i++) {
    value.push(RANDOM_CHARS[rnd[i] % RANDOM_CHARS.length]);
  }

  return value.join('');
};

const _generateTmpName = (opts: NameOptions): string => {
  if (opts.name !== undefined) {
    return pathLib.join(opts.dir, opts.name);
  }

  if (opts.template !== undefined) {
    return pathLib
      .join(opts.dir, opts.template)
      .replace(TEMPLATE_PATTERN, _randomChars(6));
  }

  // prefix and postfix
  const name = [
    opts.prefix,
    '-',
    process.pid,
    '-',
    _randomChars(12),
    opts.postfix ? '-' + opts.postfix : '',
  ].join('');

  return pathLib.join(opts.dir, name);
};

/**
 * A callback which runs in the context of a temporary directory. After the callback is completed context is returned to the original directory.
 * */
export type TmpDirCallback<T> = () => T;

export type WithLocalTmpDirArgs<T> = TmpDirCallback<T> | Options;

/**
 * A promise returned from withLocalTmpDir that, when executed, cleans up the tmp directory. Can be used instead of the callback.
 * */
export type ResetFunc = () => Promise<void>;

export default (async <TCallbackReturn>(
  ...args: Array<WithLocalTmpDirArgs<TCallbackReturn>>
): Promise<TCallbackReturn | ResetFunc> => {
  let options = args.find(arg => typeof arg === 'object');

  options = {
    dir: '.',
    keep: false,
    mode: 0o700,
    prefix: 'tmp',
    tries: 3,
    unsafeCleanup: true,
    ...options,
  };

  const callback = args.find(arg => typeof arg === 'function');
  const path = _generateTmpName(options);

  await pRetry(
    async () => {
      try {
        await fs.stat(path);
      } catch {
        return;
      }

      throw new Error(`Temporary directory already exists: ${path}`);
    },
    { retries: options.tries },
  );

  await fs.ensureDir(path, options.mode);

  const removeFunction = options.unsafeCleanup
    ? fs.remove.bind(fs)
    : fsPromises.rmdir.bind(fsPromises);

  if (callback) {
    try {
      return await chdir(path, callback);
    } finally {
      if (!options.keep) {
        await removeFunction(path);
      }
    }
  }

  const back = chdir(path);

  return () => {
    back();

    if (options.keep) {
      return Promise.resolve();
    }

    return removeFunction(path);
  };
}) as (<TCallbackReturn>(
  callback: TmpDirCallback<TCallbackReturn>,
  options?: DirOptions,
) => Promise<TCallbackReturn>) &
  (<TCallbackReturn>(
    options: DirOptions,
    callback: TmpDirCallback<TCallbackReturn>,
  ) => Promise<TCallbackReturn>) &
  ((options?: DirOptions) => Promise<ResetFunc>);

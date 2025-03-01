import { isFunction } from './helper'

import { Arguments, Key } from '../types'

export const serialize = (
  key: Key,
  hashFn: (a: Arguments) => string
): [string, Key] => {
  if (isFunction(key)) {
    try {
      key = key()
    } catch (err) {
      // dependencies not ready
      key = ''
    }
  }

  // Use the original key as the argument of fetcher. This can be a string or an
  // array of values.
  const args = key

  // If key is not falsy, or not an empty array, hash it.
  key =
    typeof key == 'string'
      ? key
      : (Array.isArray(key) ? key.length : key)
      ? hashFn(key)
      : ''

  return [key, args]
}

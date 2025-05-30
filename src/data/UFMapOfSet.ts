/**
 * @author Josha Munnik
 * @copyright Copyright (c) 2022 Ultra Force Development
 * @license
 * MIT License
 *
 * Copyright (c) 2022 Josha Munnik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// region types

/**
 * {@link UFMapOfSet} can be used to store groups of unique values. It uses a `Map` that maps a value to a
 * `Set`. The class takes care of managing the sets.
 *
 * @template TKey
 * @template TValue
 */
export class UFMapOfSet<TKey, TValue> {
  // region private variables

  /**
   * Storage
   *
   * @private
   */
  private m_map: Map<TKey, Set<TValue>> = new Map<TKey, Set<TValue>>();

  // endregion

  // region public methods

  /**
   * Adds a value to the group for a key. If the value is already available in the group, nothing changes.
   *
   * @param key
   *   Key to add for
   * @param value
   *   Value to add to the group of aKey
   */
  add(key: TKey, value: TValue): void {
    if (!this.m_map.has(key)) {
      this.m_map.set(key, new Set<TValue>());
    }
    this.m_map.get(key)!.add(value);
  }

  /**
   * Removes a value from the group for a key.
   *
   * @param key
   *   Key to remove for
   * @param value
   *   Value to remove from the group of key
   */
  remove(key: TKey, value: TValue): void {
    if (this.m_map.has(key)) {
      const set = this.m_map.get(key)!;
      set.delete(value);
      if (set.size === 0) {
        this.m_map.delete(key);
      }
    }
  }

  /**
   * Searches for a key that contains the value and remove it.
   *
   * @param value
   *   Value to remove
   */
  removeValue(value: TValue): void {
    const key = this.findKey(value);
    if (key) {
      this.remove(key, value);
    }
  }

  /**
   * Removes a key and all values related to it.
   *
   * @param key
   */
  removeKey(key: TKey): void {
    if (this.m_map.has(key)) {
      this.m_map.delete(key);
    }
  }

  /**
   * Clears the map and removes all keys and related sets.
   */
  clear() {
    this.m_map.clear();
  }

  /**
   * Gets all values stored for a certain key.
   *
   * @param key
   *   Key to get values for
   *
   * @returns all values for the key or an empty array if the key does not exist.
   */
  get(key: TKey): TValue[] {
    if (this.m_map.has(key)) {
      const set = this.m_map.get(key)!;
      return Array.from(set);
    }
    return [];
  }

  /**
   * Gets all keys stored.
   *
   * @returns all stored keys.
   */
  getKeys(): TKey[] {
    return Array.from(this.m_map.keys());
  }

  /**
   * Checks if the map has a certain key.
   *
   * @param key
   *   Key to check
   *
   * @returns true if the map contains the key.
   */
  has(key: TKey): boolean {
    return this.m_map.has(key);
  }

  /**
   * Checks if the instance has a certain value for a certain key.
   *
   * @param key
   *   Key to check
   * @param value
   *   Value to check
   *
   * @returns true if the map contains the key and value.
   */
  hasValue(key: TKey, value: TValue): boolean {
    return this.m_map.has(key) && (this.m_map.get(key)!).has(value);
  }

  /**
   * Checks if the map contains any sets.
   *
   * @returns true if there are no sets.
   */
  isEmpty(): boolean {
    return this.m_map.size === 0;
  }

  /**
   * Tries to the first key the value has been stored for.
   *
   * @param value
   *   Value to find key
   *
   * @returns the key or null if no key could be found.
   */
  findKey(value: TValue): TKey | null {
    for(const key of this.m_map.keys()) {
      if (this.hasValue(key, value)) {
        return key;
      }
    }
    return null;
  }

  // endregion

  // region public properties

  /**
   * Gets the number of key entries.
   */
  get keyCount(): number {
    return this.m_map.size;
  }

  /**
   * Gets the total number of value entries.
   */
  get valueTotalCount(): number {
    let result = 0;
    this.m_map.forEach(values => result += values.size);
    return result;
  }

  // endregion
}

// endregion

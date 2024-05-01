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
/**
 * {@link UFMapOfSet} can be used to store groups of unique values. It uses a `Map` that maps a value to a
 * `Set`. The class takes care of managing the sets.
 *
 * @template TKey
 * @template TValue
 */
export declare class UFMapOfSet<TKey, TValue> {
    /**
     * Storage
     *
     * @private
     */
    private m_map;
    /**
     * Adds a value to the group for a key. If the value is already available in the group, nothing changes.
     *
     * @param aKey
     *   Key to add for
     * @param aValue
     *   Value to add to the group of aKey
     */
    add(aKey: TKey, aValue: TValue): void;
    /**
     * Removes a value from the group for a key.
     *
     * @param aKey
     *   Key to remove for
     * @param aValue
     *   Value to remove from the group of aKey
     */
    remove(aKey: TKey, aValue: TValue): void;
    /**
     * Searches for a key that contains the value and remove it.
     *
     * @param aValue
     *   Value to remove
     */
    removeValue(aValue: TValue): void;
    /**
     * Clears the map and removes all keys and related sets.
     */
    clear(): void;
    /**
     * Gets all values stored for a certain key.
     *
     * @param aKey
     *   Key to get values for
     *
     * @returns all values for the key or an empty array if the key does not exist.
     */
    get(aKey: TKey): TValue[];
    /**
     * Gets all keys stored.
     *
     * @returns all stored keys.
     */
    getKeys(): TKey[];
    /**
     * Checks if the map has a certain key.
     *
     * @param aKey
     *   Key to check
     *
     * @returns true if the map contains the key.
     */
    has(aKey: TKey): boolean;
    /**
     * Checks if the instance has a certain value for a certain key.
     *
     * @param aKey
     *   Key to check
     * @param aValue
     *   Value to check
     *
     * @returns true if the map contains the key and value.
     */
    hasValue(aKey: TKey, aValue: TValue): boolean;
    /**
     * Checks if the map contains any sets.
     *
     * @returns true if there are no sets.
     */
    isEmpty(): boolean;
    /**
     * Tries to the first key the value has been stored for.
     *
     * @param aValue
     *   Value to find key
     *
     * @returns the key or null if no key could be found.
     */
    findKey(aValue: TValue): TKey | null;
    /**
     * Gets the number of key entries.
     */
    get keyCount(): number;
    /**
     * Gets the total number of value entries.
     */
    get valueTotalCount(): number;
}

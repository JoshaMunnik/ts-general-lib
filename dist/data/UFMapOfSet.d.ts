/**
 * @version 1
 * @author Josha Munnik
 * @copyright Copyright (c) 2022 Ultra Force Development
 * @license
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * <ul>
 * <li>Redistributions of source code must retain the above copyright notice, this list of conditions and
 *     the following disclaimer.</li>
 * <li>The authors and companies name may not be used to endorse or promote products derived from this
 *     software without specific prior written permission.</li>
 * </ul>
 * <br/>
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS´´ AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
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

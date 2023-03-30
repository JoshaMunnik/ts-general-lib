/**
 * @version 1
 * @author Josha Munnik
 * @copyright Copyright (c) 2016 Ultra Force Development
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
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */
/**
 * Defines a static class {@link UFArray}, a utility library with static methods for Array instances.
 */
export declare class UFArray {
    /**
     * Utility class with only static methods, do not allow instances.
     *
     * @private
     */
    private constructor();
    /**
     * Swaps two elements in an array.
     *
     * @param anArray
     *   Array to update
     * @param aFirst
     *   Index to first element
     * @param aSecond
     *   Index to second element
     *
     * @returns value of anArray
     */
    static swap<T>(anArray: T[], aFirst: number, aSecond: number): T[];
    /**
     * Randomly swaps elements in array, shuffling the contents of the array.
     *
     * @template T
     *
     * @param {T[]} anArray
     *   Array to shuffle
     * @param [anIterations]
     *   Number of times to perform swap. If the value is not set, it will be set to 1.5 * length of the array.
     *
     * @returns value of anArray
     */
    static shuffle<T>(anArray: T[], anIterations?: number): T[];
    /**
     * Creates an array filled with a certain value.
     *
     * @param anItem
     *   Item to fill with or a function that returns a value of the correct type
     * @param aCount
     *   Number of items
     * @param anArray
     *   Array to use, when missing create a new array.
     *
     * @returns created array or the value of anArray.
     */
    static createFilled<T>(anItem: T | (() => T), aCount: number, anArray?: T[]): T[];
    /**
     * Creates an array filled with a sequence of integer numbers.
     *
     * @param aCount
     *   Number of numbers to fill with
     * @param aStart
     *   Starting number (default 0)
     * @param aStep
     *   Stepping size (default 1)
     * @param anArray
     *   Array to use, when missing create a new array.
     *
     * @returns created array or the value of anArray filled with sequence of integer numbers
     */
    static createNumberRange(aCount: number, aStart?: number, aStep?: number, anArray?: number[]): number[];
    /**
     * Returns a random item from an array.
     *
     * @param anArray
     *   Array to get item from
     *
     * @returns random item
     */
    static randomItem<T>(anArray: T[]): T;
    /**
     * Removes all occurrences of an item from an array.
     *
     * @param anArray
     *   Array to remove item from
     * @param anItem
     *   Item to remove
     * @param [aFromIndex=0]
     *   Remove items starting at from this index (0 is first item)
     *
     * @returns value of anArray
     */
    static removeItem<T>(anArray: T[], anItem: T, aFromIndex?: number): T[];
    /**
     * Removes duplicate entries.
     *
     * @param anArray
     *   Array to go through
     *
     * @returns anArray with duplicates removed.
     */
    static removeDuplicates<T>(anArray: T[]): T[];
    /**
     * Removes one or more items from a certain index.
     *
     * @param anArray
     *   Array to remove item(s) from
     * @param anIndex
     *   Index to start removing at
     * @param aCount
     *   Number of items
     *
     * @returns Value of anArray.
     */
    static removeAt<T>(anArray: T[], anIndex: number, aCount?: number): T[];
    /**
     * Finds an item in the array that matched all properties in the aMatch object.
     *
     * This method uses the UF.tools.UFObject.equalProperties to compare properties.
     *
     * @param anArray
     *   Array to look trough
     * @param aMatch
     *   An object with one or more properties that must be matched.
     * @param anIgnoreCase
     *   When true with string types ignore casing when comparing, false casing should match
     *
     * @returns index of entry or -1 if none was found
     */
    static findByProperty(anArray: object[], aMatch: object, anIgnoreCase?: boolean): number;
    /**
     * Gets an item in an array for a certain index. If the index is outside the array boundary, return
     * a default value instead.
     *
     * @param anArray
     *   Array to get item from
     * @param anIndex
     *   Index of item
     * @param aDefault
     *   Default value to return if anIndex is outside the valid boundary.
     *
     * @returns item or aDefault if anIndex is invalid.
     */
    static getItem<T>(anArray: T[], anIndex: number, aDefault: T): T;
    /**
     * Replaces all values that matches aSearchValue with aNewValue.
     *
     * @param anArray
     *   Array to search trough
     * @param aSearchValue
     *   Value to match
     * @param aNewValue
     *   Value to replace matching value's with
     * @param [aFromIndex=0]
     *   Starting index
     *
     * @returns anArray value
     */
    static replace<T>(anArray: T[], aSearchValue: T, aNewValue: T, aFromIndex?: number): T[];
    /**
     * Replaces an item at a certain index with a new value.
     *
     * @param anArray
     *   Array to replace item in
     * @param anIndex
     *   Index of item
     * @param aNewValue
     *   New value to use
     * @param aCopy
     *   When true make a copy of the array and then replace the value
     * @return The value of anArray
     */
    static replaceAt<T>(anArray: T[], anIndex: number, aNewValue: T, aCopy?: boolean): T[];
    /**
     * Replaces multiple search values with a new value. If a value from aSearchValues is found, it is
     * replaced with the value from aNewValues. For each value in aSearchValues, aNewValues must contain
     * a matching new value (in other words aNewValues contains the same number of
     * elements as aSearchValues).
     *
     * @param anArray
     *   Array to search trough
     * @param aSearchValues
     *   Array of values to find
     * @param aNewValues
     *   Array of new values to replace found values with.
     *
     * @returns anArray value
     */
    static replaceMultiple<T>(anArray: T[], aSearchValues: T[], aNewValues: T[] | T): T[];
    /**
     * Adds elements from one array to another.
     *
     * @param aTarget
     *   Array to add to
     * @param aSource
     *   Array to add from
     *
     * @returns value of aTarget
     */
    static add<T>(aTarget: T[], aSource: T[]): T[];
    /**
     * Converts all values to int.
     *
     * @param anArray
     *   Array to update
     *
     * @returns anArray value
     */
    static toInt(anArray: any[]): number[];
    /**
     * Converts all values to Number.
     *
     * @param anArray
     *   Array to update
     *
     * @returns anArray value
     */
    static toNumber(anArray: any[]): number[];
    /**
     * Checks if an array contains a certain value or an object contains a certain key. It is possible to
     * specify multiple values.
     *
     * @param aList
     *   An array (values are checked) or an object (keys are checked)
     * @param aValue
     *   One or more values to check
     *
     * @returns {boolean} True if the array contains one of the values or the object has a key that
     *   matches one of the values.
     */
    static contains(aList: (object | []), ...aValue: any[]): boolean;
    /**
     * Assumes an array contains only numeric values, sorts the array based on the value.
     *
     * @param anArray
     *   Array of numbers
     * @param [aReverse=false]
     *   When true sort in reverse order.
     *
     * @returns {number[]} anArray with sorted items
     */
    static sortNumeric(anArray: number[], aReverse?: boolean): number[];
    /**
     * Returns the sum of all values in the number array.
     *
     * @param anArray
     *   Array of numbers
     * @param aStart
     *   Starting index, default is 0
     * @param aCount
     *   Count, when missing process all entries in the array
     *
     * @returns sum of all values in the array
     */
    static sum(anArray: number[], aStart?: number, aCount?: number): number;
}

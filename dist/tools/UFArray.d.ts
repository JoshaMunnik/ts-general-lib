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
     * @param array
     *   Array to update
     * @param first
     *   Index to first element
     * @param second
     *   Index to second element
     *
     * @returns value of anArray
     */
    static swap<T>(array: T[], first: number, second: number): T[];
    /**
     * Randomly swaps elements in array, shuffling the contents of the array.
     *
     * @template T
     *
     * @param {T[]} array
     *   Array to shuffle
     * @param [iterations]
     *   Number of times to perform swap. If the value is not set, it will be set to 1.5 * length
     *   of the array.
     *
     * @returns value of anArray
     */
    static shuffle<T>(array: T[], iterations?: number): T[];
    /**
     * Creates an array filled with a certain value.
     *
     * @param item
     *   Item to fill with or a function that returns a value of the correct type
     * @param count
     *   Number of items
     * @param array
     *   Array to use, when missing create a new array.
     *
     * @returns created array or the value of anArray.
     */
    static createFilled<T>(item: T | (() => T), count: number, array?: T[]): T[];
    /**
     * Creates an array filled with a sequence of integer numbers.
     *
     * @param count
     *   Number of numbers to fill with
     * @param start
     *   Starting number (default 0)
     * @param step
     *   Stepping size (default 1)
     * @param array
     *   Array to use, when missing create a new array.
     *
     * @returns created array or the value of anArray filled with sequence of integer numbers
     */
    static createNumberRange(count: number, start?: number, step?: number, array?: number[]): number[];
    /**
     * Returns a random item from an array.
     *
     * @param array
     *   Array to get item from
     *
     * @returns random item
     */
    static randomItem<T>(array: T[]): T;
    /**
     * Removes all occurrences of an item from an array.
     *
     * @param array
     *   Array to remove item from
     * @param item
     *   Item to remove
     * @param [fromIndex=0]
     *   Remove items starting at from this index (0 is first item)
     *
     * @returns value of anArray
     */
    static removeItem<T>(array: T[], item: T, fromIndex?: number): T[];
    /**
     * Removes duplicate entries.
     *
     * @param array
     *   Array to go through
     *
     * @returns anArray with duplicates removed.
     */
    static removeDuplicates<T>(array: T[]): T[];
    /**
     * Removes one or more items from a certain index.
     *
     * @param array
     *   Array to remove item(s) from
     * @param index
     *   Index to start removing at
     * @param count
     *   Number of items
     *
     * @returns Value of anArray.
     */
    static removeAt<T>(array: T[], index: number, count?: number): T[];
    /**
     * Finds an item in the array that matched all properties in the aMatch object.
     *
     * This method uses the UF.tools.UFObject.equalProperties to compare properties.
     *
     * @param array
     *   Array to look trough
     * @param match
     *   An object with one or more properties that must be matched.
     * @param ignoreCase
     *   When true with string types ignore casing when comparing, false casing should match
     *
     * @returns index of entry or -1 if none was found
     */
    static findByProperty(array: object[], match: object, ignoreCase?: boolean): number;
    /**
     * Gets an item in an array for a certain index. If the index is outside the array boundary, return
     * a default value instead.
     *
     * @param array
     *   Array to get item from
     * @param index
     *   Index of item
     * @param defaultValue
     *   Default value to return if anIndex is outside the valid boundary.
     *
     * @returns item or aDefault if anIndex is invalid.
     */
    static getItem<T>(array: T[], index: number, defaultValue: T): T;
    /**
     * Replaces all values that matches aSearchValue with aNewValue.
     *
     * @param array
     *   Array to search trough
     * @param searchValue
     *   Value to match
     * @param newValue
     *   Value to replace matching value's with
     * @param [fromIndex=0]
     *   Starting index
     *
     * @returns anArray value
     */
    static replace<T>(array: T[], searchValue: T, newValue: T, fromIndex?: number): T[];
    /**
     * Replaces an item at a certain index with a new value.
     *
     * @param array
     *   Array to replace item in
     * @param index
     *   Index of item
     * @param newValue
     *   New value to use
     * @param copy
     *   When true make a copy of the array and then replace the value
     * @return The value of anArray
     */
    static replaceAt<T>(array: T[], index: number, newValue: T, copy?: boolean): T[];
    /**
     * Replaces multiple search values with a new value. If a value from aSearchValues is found, it is
     * replaced with the value from aNewValues. For each value in aSearchValues, aNewValues must contain
     * a matching new value (in other words aNewValues contains the same number of
     * elements as aSearchValues).
     *
     * @param array
     *   Array to search trough
     * @param searchValues
     *   Array of values to find
     * @param newValues
     *   Array of new values to replace found values with.
     *
     * @returns anArray value
     */
    static replaceMultiple<T>(array: T[], searchValues: T[], newValues: T[] | T): T[];
    /**
     * Adds elements from one array to another.
     *
     * @param target
     *   Array to add to
     * @param source
     *   Array to add from
     *
     * @returns value of aTarget
     */
    static add<T>(target: T[], source: T[]): T[];
    /**
     * Converts all values to int.
     *
     * @param array
     *   Array to update
     *
     * @returns anArray value
     */
    static toInt(array: any[]): number[];
    /**
     * Converts all values to Number.
     *
     * @param array
     *   Array to update
     *
     * @returns anArray value
     */
    static toNumber(array: any[]): number[];
    /**
     * Checks if an array contains a certain value or an object contains a certain key. It is possible to
     * specify multiple values.
     *
     * @param list
     *   An array (values are checked) or an object (keys are checked)
     * @param values
     *   One or more values to check
     *
     * @returns {boolean} True if the array contains one of the values or the object has a key that
     *   matches one of the values.
     */
    static contains(list: (object | any[]), ...values: any[]): boolean;
    /**
     * Assumes an array contains only numeric values, sorts the array based on the value.
     *
     * @param array
     *   Array of numbers
     * @param [reverse=false]
     *   When true sort in reverse order.
     *
     * @returns {number[]} anArray with sorted items
     */
    static sortNumeric(array: number[], reverse?: boolean): number[];
    /**
     * Returns the sum of all values in the number array.
     *
     * @param array
     *   Array of numbers
     * @param start
     *   Starting index, default is 0
     * @param count
     *   Count, when missing process all entries in the array
     *
     * @returns sum of all values in the array
     */
    static sum(array: number[], start?: number, count?: number): number;
}

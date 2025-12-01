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
// region imports
import { UFMath } from "./UFMath.js";
import { UFObject } from "./UFObject.js";
// endregion
// region types
/**
 * Defines a static class {@link UFArray}, a utility library with static methods for Array instances.
 */
export class UFArray {
    // region constructor
    /**
     * Utility class with only static methods, do not allow instances.
     *
     * @private
     */
    constructor() {
    }
    // endregion
    // region public methods
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
    static swap(array, first, second) {
        const temp = array[first];
        array[first] = array[second];
        array[second] = temp;
        return array;
    }
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
    static shuffle(array, iterations) {
        // arrays with 0 or 1 elements do need shuffling
        if (array.length < 2) {
            return array;
        }
        // default is 1.5 the length of the array
        iterations = iterations || Math.ceil(array.length * 1.5);
        // swap to random items
        for (let index = iterations; index >= 0; index--) {
            // get two random positions in array
            let index0 = UFMath.randomInteger(array.length - 1);
            let index1 = UFMath.randomInteger(array.length - 1);
            // repeat for second index in case the random indexes point to the same index assuming the chance
            // to get the same number for the third time is very low)
            if (index0 === index1) {
                index1 = UFMath.randomInteger(array.length - 1);
            }
            // swap items
            UFArray.swap(array, index0, index1);
        }
        return array;
    }
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
    static createFilled(item, count, array) {
        const result = array || new Array(count);
        result.length = count;
        if (typeof item !== 'function') {
            for (let index = 0; index < count; index++) {
                result[index] = item;
            }
        }
        else {
            for (let index = 0; index < count; index++) {
                result[index] = item();
            }
        }
        return result;
    }
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
    static createNumberRange(count, start = 0, step = 1, array) {
        const result = array || new Array(count);
        result.length = count;
        for (let index = 0; index < count; index++) {
            result[index] = index * step + start;
        }
        return result;
    }
    /**
     * Returns a random item from an array.
     *
     * @param array
     *   Array to get item from
     *
     * @returns random item
     */
    static randomItem(array) {
        return array[UFMath.randomInteger(array.length - 1)];
    }
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
    static removeItem(array, item, fromIndex = 0) {
        // look for first occurrence and remove it, keep looking till no more occurrences are found
        for (let index = array.indexOf(item, fromIndex); index >= 0; index = array.indexOf(item, fromIndex)) {
            array.splice(index, 1);
            fromIndex = index;
        }
        return array;
    }
    /**
     * Removes duplicate entries.
     *
     * @param array
     *   Array to go through
     *
     * @returns anArray with duplicates removed.
     */
    static removeDuplicates(array) {
        // don't cache length, since it might change with every loop
        for (let index = 0; index < array.length; index++) {
            UFArray.removeItem(array, array[index], index + 1);
        }
        return array;
    }
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
    static removeAt(array, index, count = 1) {
        array.splice(index, count);
        return array;
    }
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
    static findByProperty(array, match, ignoreCase = false) {
        return array.findIndex(item => UFObject.equalProperties(item, match, ignoreCase));
    }
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
    static getItem(array, index, defaultValue) {
        return ((index >= 0) && (index < array.length)) ? array[index] : defaultValue;
    }
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
    static replace(array, searchValue, newValue, fromIndex = 0) {
        for (let index = array.indexOf(searchValue, fromIndex); index >= 0; index = array.indexOf(searchValue, fromIndex)) {
            array[index] = newValue;
            fromIndex = index + 1;
        }
        return array;
    }
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
    static replaceAt(array, index, newValue, copy = false) {
        if (copy) {
            array = [...array];
        }
        array[index] = newValue;
        return array;
    }
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
    static replaceMultiple(array, searchValues, newValues) {
        const isArray = Array.isArray(newValues);
        for (let index = array.length - 1; index >= 0; index--) {
            const findIndex = searchValues.indexOf(array[index]);
            if (findIndex >= 0) {
                if (isArray) {
                    array[index] = newValues[findIndex];
                }
                else {
                    array[index] = newValues;
                }
            }
        }
        return array;
    }
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
    static add(target, source) {
        target.push(...source);
        return target;
    }
    /**
     * Converts all values to int.
     *
     * @param array
     *   Array to update
     *
     * @returns anArray value
     */
    static toInt(array) {
        for (let index = array.length - 1; index >= 0; index--) {
            array[index] = parseInt(array[index], 10);
        }
        return array;
    }
    /**
     * Converts all values to Number.
     *
     * @param array
     *   Array to update
     *
     * @returns anArray value
     */
    static toNumber(array) {
        for (let index = array.length - 1; index >= 0; index--) {
            array[index] = parseFloat(array[index]);
        }
        return array;
    }
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
    static contains(list, ...values) {
        // return false if no value is specified
        if (values.length === 0) {
            return false;
        }
        // process all values in aList
        if (Array.isArray(list)) {
            return values.some(value => list.indexOf(value) >= 0);
        }
        return values.some(value => list.hasOwnProperty(value));
    }
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
    static sortNumeric(array, reverse = false) {
        return array.sort((item0, item1) => reverse ? item1 - item0 : item0 - item1);
    }
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
    static sum(array, start = 0, count) {
        let result = 0;
        count = count || array.length;
        for (let index = start + count - 1; index >= start; index--) {
            result += array[index];
        }
        return result;
    }
}
// endregion
//# sourceMappingURL=UFArray.js.map
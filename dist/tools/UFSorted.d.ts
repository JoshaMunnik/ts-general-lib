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
import { UFSortableObject } from "../types/UFSortableObject.js";
/**
 * {@link UFSorted} implements various static support methods for {@link UFSortableObject}.
 */
export declare class UFSorted {
    /**
     * Utility class with only static methods, do not allow instances.
     *
     * @private
     */
    private constructor();
    /**
     * Sort a collection of a certain type using the {@link UFSortableObject.sortOrder} property.
     *
     * @param aData
     *   Object, array, Set or Map to sort.
     *
     * @returns sorted values
     */
    static sort<T extends UFSortableObject>(aData: T[] | {
        [key: string]: T;
    } | Set<T> | Map<any, T>): T[];
    /**
     * Gets the maximum {@link UFSortableObject.sortOrder} value.
     *
     * @param aData
     *   Object, array, Set or Map to process.
     *
     * @returns value or `Number.MIN_VALUE` if none was found.
     */
    static getMax<T extends UFSortableObject>(aData: T[] | {
        [key: string]: T;
    } | Set<T> | Map<any, T>): number;
    /**
     * Gets the minimum {@link UFSortableObject.sortOrder} value.
     *
     * @param aData
     *  Object, array, Set or Map to process.
     *
     * @returns minimum value or `Number.MAX_VALUE` if none was found.
     */
    static getMin<T extends UFSortableObject>(aData: T[] | {
        [key: string]: T;
    } | Set<T> | Map<any, T>): number;
    /**
     * Gets the values of a collection as an array.
     *
     * @param aData
     *   Data to get values from
     *
     * @returns list of values
     */
    private static getValues;
}

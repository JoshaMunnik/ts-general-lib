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
 * {@link UFNumberList} defines a list of numbers.
 */
export declare class UFNumberList {
    /**
     * Contains the numbers
     *
     * @private
     */
    private readonly m_numbers;
    /**
     * Creates an instance of {@link UFNumberList}
     */
    constructor(...numbers: number[]);
    /**
     * Adds one or more numbers to the end of the list.
     *
     * @param numbers
     *   One or more numbers to add
     */
    add(...numbers: number[]): void;
    /**
     * Adds a list of numbers to the end of the list.
     *
     * @param numbers
     *   Numbers to add (either an array or an instance of {@link UFNumberList})
     */
    addList(numbers: number[] | UFNumberList): void;
    /**
     * Clears the list.
     */
    clear(): void;
    /**
     * Gets a number at a certain index.
     *
     * @param index
     *   Index of number
     *
     * @throws an error if index is invalid
     */
    get(index: number): number;
    /**
     * Gets the maximum number.
     *
     * @return maximum number
     */
    max(): number;
    /**
     * Gets the minimum number.
     *
     * @return minimum number
     */
    min(): number;
    /**
     * Gets all numbers added together.
     *
     * @return sum of all numbers
     */
    sum(): number;
    /**
     * Calculates the average.
     *
     * @return average value or 0 if the list is empty.
     */
    average(): number;
    /**
     * The current size of the list.
     */
    get size(): number;
    /**
     * True is the list is empty.
     */
    get empty(): boolean;
}

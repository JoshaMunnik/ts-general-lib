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
export class UFNumberList {
    // endregion
    // region public methods
    /**
     * Creates an instance of {@link UFNumberList}
     */
    constructor(...numbers) {
        this.m_numbers = [...numbers];
    }
    /**
     * Adds one or more numbers to the end of the list.
     *
     * @param numbers
     *   One or more numbers to add
     */
    add(...numbers) {
        this.m_numbers.push(...numbers);
    }
    /**
     * Adds a list of numbers to the end of the list.
     *
     * @param numbers
     *   Numbers to add (either an array or an instance of {@link UFNumberList})
     */
    addList(numbers) {
        if (Array.isArray(numbers)) {
            this.m_numbers.push(...numbers);
        }
        else {
            this.m_numbers.push(...numbers.m_numbers);
        }
    }
    /**
     * Clears the list.
     */
    clear() {
        this.m_numbers.length = 0;
    }
    /**
     * Gets a number at a certain index.
     *
     * @param index
     *   Index of number
     *
     * @throws an error if index is invalid
     */
    get(index) {
        if ((index < 0) || (index >= this.size)) {
            throw new Error(`Invalid index ${index} (size = ${this.size})`);
        }
        return this.m_numbers[index];
    }
    /**
     * Gets the maximum number.
     *
     * @return maximum number
     */
    max() {
        return this.size ? Math.max(...this.m_numbers) : 0;
    }
    /**
     * Gets the minimum number.
     *
     * @return minimum number
     */
    min() {
        return this.size ? Math.min(...this.m_numbers) : 0;
    }
    /**
     * Gets all numbers added together.
     *
     * @return sum of all numbers
     */
    sum() {
        return this.m_numbers.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }
    /**
     * Calculates the average.
     *
     * @return average value or 0 if the list is empty.
     */
    average() {
        return this.size ? this.sum() / this.size : 0;
    }
    // endregion
    // region public properties
    /**
     * The current size of the list.
     */
    get size() {
        return this.m_numbers.length;
    }
    /**
     * True is the list is empty.
     */
    get empty() {
        return this.size === 0;
    }
}
//# sourceMappingURL=UFNumberList.js.map
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
 * {@link UFNumberList} defines a list of numbers.
 */
export class UFNumberList {
    // endregion
    // region public methods
    /**
     * Creates an instance of {@link UFNumberList}
     */
    constructor(...aNumbers) {
        this.m_numbers = [...aNumbers];
    }
    /**
     * Adds one or more numbers to the end of the list.
     *
     * @param aNumbers
     *   One or more numbers to add
     */
    add(...aNumbers) {
        this.m_numbers.push(...aNumbers);
    }
    /**
     * Adds a list of numbers to the end of the list.
     *
     * @param aNumbers
     *   Numbers to add (either an array or an instance of {@link UFNumberList})
     */
    addList(aNumbers) {
        if (Array.isArray(aNumbers)) {
            this.m_numbers.push(...aNumbers);
        }
        else {
            this.m_numbers.push(...aNumbers.m_numbers);
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
     * @param anIndex
     *   Index of number
     *
     * @throws an error if index is invalid
     */
    get(anIndex) {
        if ((anIndex < 0) || (anIndex >= this.size)) {
            throw new Error(`Invalid index ${anIndex} (size = ${this.size})`);
        }
        return this.m_numbers[anIndex];
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
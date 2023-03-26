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
    constructor(...aNumbers: number[]);
    /**
     * Adds one or more numbers to the end of the list.
     *
     * @param aNumbers
     *   One or more numbers to add
     */
    add(...aNumbers: number[]): void;
    /**
     * Adds a list of numbers to the end of the list.
     *
     * @param aNumbers
     *   Numbers to add (either an array or an instance of {@link UFNumberList})
     */
    addList(aNumbers: number[] | UFNumberList): void;
    /**
     * Clears the list.
     */
    clear(): void;
    /**
     * Gets a number at a certain index.
     *
     * @param anIndex
     *   Index of number
     *
     * @throws an error if index is invalid
     */
    get(anIndex: number): number;
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

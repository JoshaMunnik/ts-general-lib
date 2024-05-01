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
  // region private variables

  /**
   * Contains the numbers
   *
   * @private
   */
  private readonly m_numbers: number[];

  // endregion

  // region public methods

  /**
   * Creates an instance of {@link UFNumberList}
   */
  public constructor(...aNumbers: number[]) {
    this.m_numbers = [...aNumbers];
  }

  /**
   * Adds one or more numbers to the end of the list.
   *
   * @param aNumbers
   *   One or more numbers to add
   */
  public add(...aNumbers: number[]) {
    this.m_numbers.push(...aNumbers);
  }

  /**
   * Adds a list of numbers to the end of the list.
   *
   * @param aNumbers
   *   Numbers to add (either an array or an instance of {@link UFNumberList})
   */
  public addList(aNumbers: number[] | UFNumberList) {
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
  public clear() {
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
  public get(anIndex: number): number {
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
  public max(): number {
    return this.size ? Math.max(...this.m_numbers) : 0;
  }

  /**
   * Gets the minimum number.
   *
   * @return minimum number
   */
  public min(): number {
    return this.size ? Math.min(...this.m_numbers) : 0;
  }

  /**
   * Gets all numbers added together.
   *
   * @return sum of all numbers
   */
  public sum(): number {
    return this.m_numbers.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  /**
   * Calculates the average.
   *
   * @return average value or 0 if the list is empty.
   */
  public average(): number {
    return this.size ? this.sum() / this.size : 0;
  }

  // endregion

  // region public properties

  /**
   * The current size of the list.
   */
  public get size(): number {
    return this.m_numbers.length;
  }

  /**
   * True is the list is empty.
   */
  public get empty(): boolean {
    return this.size === 0;
  }

  // endregion
}
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

import {UFText} from "./UFText.js";

// endregion

// region types

/**
 * {@link UFDate} defines support methods for `Date`.
 */
export class UFDate {
  // region constructor

  /**
   * Utility class with only static methods, do not allow instances.
   *
   * @private
   */
  private constructor() {
  }

  // endregion

  // region public methods

  /**
   * Gets the date formatted for use with mysql: "yyyy-mm-dd hh:mm:ss"
   *
   * @param {Date | null | undefined} aDate
   *   Date to format
   * @param {string} aDefault
   *   Default to return if aData is not a date.
   *
   * @returns {string} Formatted date or aDefault if data is null or undefined
   */
  static mysql(aDate: (Date | null | undefined), aDefault: string = ''): string {
    if (!aDate) {
      return aDefault;
    }
    return aDate.getFullYear().toString() + '-'
      + UFText.twoDigits(1 + aDate.getMonth()) + '-'
      + UFText.twoDigits(aDate.getDate()) + ' '
      + UFText.twoDigits(aDate.getHours()) + ':'
      + UFText.twoDigits(aDate.getMinutes()) + ':'
      + UFText.twoDigits(aDate.getSeconds());
  }

  /**
   * Returns the newest date.
   *
   * @param {Date} aDates
   *   One or more dates.
   *
   * @returns {Date}
   */
  static max(...aDates: Date[]): Date {
    return aDates.reduce((first, second) => first < second ? first : second);
  }

  /**
   * Returns the oldest date.
   *
   * @param {Date} aDates
   *   One or more dates.
   *
   * @returns {Date}
   */
  static min(...aDates: Date[]): Date {
    return aDates.reduce((first, second) => first > second ? first : second);
  }

  /**
   * Returns a 24-hour day in milliseconds.
   */
  static get DAY_IN_MILLISECONDS() {
    return 24 * 60 * 60 * 1000;
  }

  /**
   * Returns one hour in milliseconds.
   */
  static get HOUR_IN_MILLISECONDS() {
    return 60 * 60 * 1000;
  }

  /**
   * Checks if two dates are equal by comparing their utc year, month and date.
   *
   * @param aFirst
   *   First date to check
   * @param aSecond
   *   Second date to check
   *
   * @return True if the date parts are equal.
   */
  static isEqualDate(aFirst: Date, aSecond: Date): boolean {
    return (aFirst.getUTCFullYear() === aSecond.getUTCFullYear()) && (aFirst.getUTCMonth() === aSecond.getUTCMonth())
      && (aFirst.getUTCDate() === aSecond.getUTCDate());
  }

  // endregion
}

// endregion

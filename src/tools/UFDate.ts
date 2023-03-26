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

// region imports

import {UFText} from "./UFText";

// endregion

// region exports

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
   * @param aDate
   *   Date to format
   * @param aDefault
   *   Default to return if aData is not a date.
   *
   * @returns Formatted date or aDefault if data is null or undefined
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
   * @param aDates
   *   One or more dates.
   *
   * @returns newest date
   */
  static max(...aDates: Date[]): Date {
    return aDates.reduce((first, second) => first < second ? first : second);
  }

  /**
   * Returns the oldest date.
   *
   * @param aDates
   *   One or more dates.
   *
   * @returns oldest date
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

  // endregion
}

// endregion

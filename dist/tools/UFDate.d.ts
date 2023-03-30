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
 * {@link UFDate} defines support methods for {@link Date}.
 */
export declare class UFDate {
    /**
     * Utility class with only static methods, do not allow instances.
     *
     * @private
     */
    private constructor();
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
    static mysql(aDate: (Date | null | undefined), aDefault?: string): string;
    /**
     * Returns the newest date.
     *
     * @param {Date} aDates
     *   One or more dates.
     *
     * @returns {Date}
     */
    static max(...aDates: Date[]): Date;
    /**
     * Returns the oldest date.
     *
     * @param {Date} aDates
     *   One or more dates.
     *
     * @returns {Date}
     */
    static min(...aDates: Date[]): Date;
    /**
     * Returns a 24-hour day in milliseconds.
     */
    static get DAY_IN_MILLISECONDS(): number;
    /**
     * Returns one hour in milliseconds.
     */
    static get HOUR_IN_MILLISECONDS(): number;
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
    static isEqualDate(aFirst: Date, aSecond: Date): boolean;
}

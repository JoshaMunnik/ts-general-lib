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
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS`` AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */
/**
 * {@link UFText} implements methods for supporting strings and characters.
 */
export declare class UFText {
    /**
     * Utility class with only static methods, do not allow instances.
     *
     * @private
     */
    private constructor();
    /**
     * Maps certain characters to their entity or special html tag or empty string if it has no use in html
     *
     * @private
     */
    static s_escapeHtmlMap: Map<string, string>;
    /**
     * Appends a text to another text using a separator. If either texts are empty, the method just returns the other
     * texts without the separator.
     *
     * @param aSource
     *   Source to add to
     * @param aValue
     *   Value to append
     * @param aSeparator
     *   Separator to use
     *
     * @return aValue added to aSource with aSeparator if both aValue and aSource are not empty.
     */
    static append(aSource: string, aValue: string, aSeparator: string): string;
    /**
     * Converts plain text to html by replacing certain characters with their entity equivalent and
     * replacing \n with <br/> tags.
     *
     * Based on code from answer: https://stackoverflow.com/a/4835406/968451
     *
     * @param aText
     *   Text to convert
     *
     * @return Html formatted plain text
     */
    static escapeHtml(aText: string): string;
    /**
     * Generate a code existing of a random sequence of upper and lowercase and numbers.
     *
     * @param aLength
     *   Number of characters the code exists of
     *
     * @return The generated code.
     */
    static generateCode(aLength: number): string;
    /**
     * Converts a number to a string of 2 digits
     *
     * @param aNumber
     *   A number between 0 and 99
     *
     * @return aNumber as string, prefixed with a 0 if number exists of 1 digit
     *
     * @private
     */
    static twoDigits(aNumber: number): string;
    /**
     * Converts a number to a string of 3 digits
     *
     * @param aNumber
     *   A number between 0 and 999
     *
     * @return aNumber as string, prefixed with a 0 if number exists of 1 digit
     *
     * @private
     */
    static threeDigits(aNumber: number): string;
    /**
     * Replace all keys by their value in a string.
     *
     * @param aText
     *   Text to update
     * @param aMap
     *   Replace keys with their values
     *
     * @return Updated aText
     */
    static replace(aText: string, aMap: object): string;
    /**
     * Returns a number converted to a hex number of two digits.
     *
     * @param aNumber
     *   Number to convert (will be clamped between 0 and 255)
     *
     * @return hexadecimal string of 2 digits
     */
    static hexTwoDigits(aNumber: number): string;
    /**
     * Returns a number converted to a hex number of four digits.
     *
     * @param aNumber
     *   Number to convert (will be clamped between 0 and 65535)
     *
     * @return hexadecimal string of 4 digits
     */
    static hexFourDigits(aNumber: number): string;
    /**
     * Joins strings making sure there is one delimiter string between them.
     *
     * @param aDelimiter
     *   Delimiter to use
     * @param aTexts
     *   Texts to join
     *
     * @return aTexts joined together
     */
    static join(aDelimiter: string, ...aTexts: string[]): string;
    /**
     * Joins strings together using '/' as a delimiter.
     *
     * @param aTexts
     *   Texts to join
     *
     * @return aTexts joined together
     */
    static joinPath(...aTexts: string[]): string;
    /**
     * Gets the text to convert a number to an english ordinal number.
     *
     * @param aNumber
     *   Number to convert.
     *
     * @return Text to add to the number.
     */
    static getOrdinalPost(aNumber: number): string;
    /**
     * Converts a number to an english ordinal number.
     *
     * @param aNumber
     *   Number to convert.
     *
     * @return number with shortened ordinal text added to it.
     */
    static getOrdinalNumber(aNumber: number): string;
    /**
     * Gets a value as string.
     *
     * @param aValue
     *   Value to get
     * @param aDefault
     *   Default is used if aValue can not be converted to a string (in case of null, undefined, NaN)
     *
     * @return aValue as string (via toString() call) or aDefault.
     */
    static asString(aValue: any, aDefault?: string): string;
}

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

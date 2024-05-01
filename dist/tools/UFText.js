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
import { UFMath } from "./UFMath.js";
// endregion
// region class
/**
 * {@link UFText} implements methods for supporting strings and characters.
 */
export class UFText {
    // region constructor
    /**
     * Utility class with only static methods, do not allow instances.
     *
     * @private
     */
    constructor() {
    }
    // endregion
    // region public methods
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
    static append(aSource, aValue, aSeparator) {
        if (aSource.length <= 0) {
            return aValue;
        }
        if (aValue.length <= 0) {
            return aSource;
        }
        return aSource + aSeparator + aValue;
    }
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
    static escapeHtml(aText) {
        return aText.replace(/[&<>"'\n\t\r]/g, character => this.s_escapeHtmlMap.get(character));
    }
    /**
     * Generate a code existing of a random sequence of upper and lowercase and numbers.
     *
     * @param aLength
     *   Number of characters the code exists of
     *
     * @return The generated code.
     */
    static generateCode(aLength) {
        let result = '';
        let numberCount = 1;
        for (let cnt = 0; cnt < aLength; cnt++) {
            // 00..09: '0'..'9'
            // 10..35: 'A'..'Z'
            // 36..61: 'a'..'z'
            let charCode;
            while (true) {
                // make sure every 3rd char is a number (also to prevent offensive words)
                charCode = (numberCount > 2) ? UFMath.randomInteger(0, 9) : UFMath.randomInteger(0, 61);
                // break loop if char code is not zero or uppercase O or one and lowercase l (too similar)
                if ((charCode !== 0) && (charCode !== 24) && (charCode !== 1) && (charCode !== 47)) {
                    break;
                }
            }
            if (charCode < 10) {
                // reset number counter
                result += String.fromCharCode(charCode + 48);
                numberCount = 0;
            }
            else if (charCode < 36) {
                result += String.fromCharCode(charCode + 65 - 10);
                numberCount++;
            }
            else {
                result += String.fromCharCode(charCode + 97 - 10 - 26);
                numberCount++;
            }
        }
        return result;
    }
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
    static twoDigits(aNumber) {
        return aNumber < 10 ? '0' + aNumber : aNumber.toString();
    }
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
    static threeDigits(aNumber) {
        return ('000' + aNumber.toString()).substring(-3);
    }
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
    static replace(aText, aMap) {
        for (const [key, value] of Object.entries(aMap)) {
            aText = aText.replace(key, value);
        }
        return aText;
    }
    /**
     * Returns a number converted to a hex number of two digits.
     *
     * @param aNumber
     *   Number to convert (will be clamped between 0 and 255)
     *
     * @return hexadecimal string of 2 digits
     */
    static hexTwoDigits(aNumber) {
        return ('0' + Math.min(255, Math.max(0, aNumber)).toString(16)).substring(-2);
    }
    /**
     * Returns a number converted to a hex number of four digits.
     *
     * @param aNumber
     *   Number to convert (will be clamped between 0 and 65535)
     *
     * @return hexadecimal string of 4 digits
     */
    static hexFourDigits(aNumber) {
        return ('000' + Math.min(65535, Math.max(0, aNumber)).toString(16)).substring(-4);
    }
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
    static join(aDelimiter, ...aTexts) {
        return aTexts.reduce((previous, current) => {
            if (current.startsWith(aDelimiter)) {
                current = current.substring(aDelimiter.length);
            }
            if (!previous.endsWith(aDelimiter) && previous.length) {
                previous += aDelimiter;
            }
            return previous + current;
        });
    }
    /**
     * Joins strings together using '/' as a delimiter.
     *
     * @param aTexts
     *   Texts to join
     *
     * @return aTexts joined together
     */
    static joinPath(...aTexts) {
        return this.join('/', ...aTexts);
    }
    /**
     * Gets the text to convert a number to an english ordinal number.
     *
     * @param aNumber
     *   Number to convert.
     *
     * @return Text to add to the number.
     */
    static getOrdinalPost(aNumber) {
        switch (aNumber % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }
    /**
     * Converts a number to an english ordinal number.
     *
     * @param aNumber
     *   Number to convert.
     *
     * @return number with shortened ordinal text added to it.
     */
    static getOrdinalNumber(aNumber) {
        return aNumber.toString() + this.getOrdinalPost(aNumber);
    }
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
    static asString(aValue, aDefault = '') {
        switch (aValue) {
            case null:
            case undefined:
            case NaN:
                return aDefault;
            default:
                return aValue.toString();
        }
    }
}
// endregion
// region private vars
/**
 * Maps certain characters to their entity or special html tag or empty string if it has no use in html
 *
 * @private
 */
UFText.s_escapeHtmlMap = new Map([
    ['&', '&amp;'],
    ['<', '&lt;'],
    ['>', '&gt;'],
    ['"', '&quot;'],
    ["'", '&#039;'],
    ['\n', '<br/>'],
    ['\t', ''],
    ['\r', '']
]);
// endregion
//# sourceMappingURL=UFText.js.map
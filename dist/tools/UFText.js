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
     * Appends a text to another text using a separator. If either texts are empty, the method
     * just returns the other text without the separator.
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
     * Gets the text to convert a number to an English ordinal number.
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
     * Converts a number to an English ordinal number.
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
    /**
     * Formats a file size adding unit (bytes, KB, MB or GB).
     *
     * @param aSize
     *   Size to format
     *
     * @returns formatted size
     */
    static formatFileSize(aSize) {
        let result;
        if (aSize < 1024) {
            result = aSize + ' bytes';
        }
        else if (aSize < 1024 * 1024) {
            result = (aSize / 1024).toFixed(1) + ' KB';
        }
        else if (aSize < 1024 * 1024 * 1024) {
            result = (aSize / 1024 / 1024).toFixed(1) + ' MB';
        }
        else {
            result = (aSize / 1024 / 1024 / 1024).toFixed(1) + ' GB';
        }
        return result;
    }
    /**
     * Gets the extension of file by returning the part after the last '.' in the name.
     *
     * @param aFileName
     *   Filename to get extension of (may include path parts)
     *
     * @returns extension (without '.' and in lowercase) or false if no '.' could be
     *   located in the name.
     */
    static getFileExtension(aFileName) {
        const fileStart = aFileName.lastIndexOf('/');
        if (fileStart > 0) {
            aFileName = aFileName.substring(fileStart + 1);
        }
        const start = aFileName.lastIndexOf('.');
        return start < 0 ? false : aFileName.substring(start + 1).toLowerCase();
    }
    /**
     * Add a number of padding chars on the left (in front) until a string reaches a certain
     * minimal size.
     *
     * @param aText
     *   Text to pad
     * @param aMinSize
     *   Minimal size
     * @param aPadChar
     *   Char to add
     *
     * @return {string} aText padded with aPadChar, if aTexts length >= aMinSize then aText
     *   is just returned
     */
    static lpad(aText, aMinSize, aPadChar = ' ') {
        while (aText.length < aMinSize) {
            aText = aPadChar + aText;
        }
        return aText;
    }
    /**
     * Add a number of padding chars on the right until a string reaches a certain minimal size.
     *
     * @param aText
     *   Text to pad
     * @param aMinSize
     *   Minimal size
     * @param aPadChar
     *   Char to add
     *
     * @return {string} aText padded with aPadChar, if aTexts length >= aMinSize then aText is
     * just returned
     */
    static rpad(aText, aMinSize, aPadChar = ' ') {
        while (aText.length < aMinSize) {
            aText = aText + aPadChar;
        }
        return aText;
    }
    /**
     * Adds a parameter to an url. The method checks if the url already contains parameters
     * (by containing a ? character). If it does the parameter is added to the end with a '&'
     * character. Else the parameter is added to the end with a '?' character.
     *
     * @param anUrl
     *   Filename to add parameter to
     * @param aParameter
     *   Parameter to add
     * @param aValue
     *   When specified the value to add to the parameter using '='
     *
     * @return anUrl with '?aParameter[=aValue]' or '&aParameter[=aValue]' added to it.
     */
    static addParameter(anUrl, aParameter, aValue) {
        if (aValue) {
            aParameter = aParameter + '=' + aValue;
        }
        aParameter = (anUrl.indexOf('?') >= 0 ? '&' : '?') + aParameter;
        return anUrl + aParameter;
    }
    /**
     * Format a string using format specifiers and additional parameters. Next to formatting primitive
     * values the method can also format a property within an object.
     *
     * Format:
     * `%[number$][{name}][+][0|'char][-][number]\[.number]%|(name)|b|c|d|e|f|F|o|u|s|x|X`
     * - [] = optional
     * - | = choices for a single location
     *
     * Format specifiers:
     * - `number$` = use argument at index number (first argument has index 1); if the value is too
     *   high and points to a non-existing argument the method will skip this format string and leave
     *   it as is.
     * - `{name}` = show the value of a property of the specified name, the property is formatted
     *              according to the type specifier.
     * - `+` = when formatting a decimal or float prefix with a '+' if the number is positive
     *        (sign of number is always shown)
     * - `0` = use 0 as padding character (default is a space)
     * - `'char` = use char as padding character (char is a single character)
     * - `-` = instead of right justification, left justify the result when padding
     * - `number` = minimal size, add padding characters if needed
     * - `.number` = with floats this number specifies the number of decimal digits to display;
     *               else it specifies the maximum size (in characters)
     *
     * The format specification should end with a type specifier that indicates the type of the argument:
     * - `%` = no argument is used and all the formatting is ignored, a single % character is
     *         inserted (with other words, use %% inside the format string to get a single %)
     * - `(name)` = show the value of a property, treating the value as a string. Other
     *              formatting specifiers can still be used. See also comments below.
     * - `b` = the argument is treated as an unsigned integer and presented as a binary number.
     * - `c` = the argument is treated as an unsigned integer and presented as the character with
     *         that ASCII value.
     * - `d` = the argument is treated as an integer and presented as a (signed) decimal number.
     * - `e` = the argument is treated as a float and presented using scientific notation
     *         (e.g. 1.2e+2). The precision specifier stands for the number of digits after
     *         the decimal point.
     * - `u` = the argument is treated as an unsigned integer and presented as an unsigned
     *         decimal number. The plus modifier is not used.
     * - `f` = the argument is treated as a float and presented as a floating-point number.
     * - `F` = same as f (to be compatible with PHP's formatting)
     * - `o` = the argument is treated as an unsigned integer and presented as an octal number.
     * - `s` = the argument is treated as and presented as a string.
     * - `x` = the argument is treated as an unsigned integer and presented as a hexadecimal
     *         number (with lowercase letters).
     * - `X` = the argument is treated as an unsigned integer and presented as a hexadecimal
     *         number (with uppercase letters).
     *
     * The method uses a regular expression with named groups to identify the various parts. The
     * order of the format specifiers must follow the order as specified above.
     *
     * The first time a property value specification is encountered, the method will store the
     * matching argument assuming it is an object. Any property value specification after will use
     * the same object.
     *
     * To show property values of multiple objects, one can use the `number$` specifier to select
     * a certain argument. When using `number$` to select a certain object that object
     * is not stored as default object.
     *
     * To format a property value using a certain type specifier use the `{}` specifier; to show
     * the property as string one can use the `()` specifier.
     *
     * If no argument index is used and there are no more arguments to map to, the method will
     * not process the string and just keep it.
     *
     * @param {string} aFormat
     *   A string including format specifiers.
     * @param {...*} anArguments
     *   Various arguments to format within the string
     *
     * @return {string} formatted string
     *
     * @example <caption>A few formatting statements</caption>
     * var pear = {color: 'brown', shape: 'pear', weight: 100 };
     * var apple = {color: 'green', shape: 'round', weight: 150 };
     *
     * console.log(UFText.sprintf('The color of an apple is %(color) and the shape is %(shape)', apple));
     * // The color of an apple is green and the shape is round
     *
     * console.log(UFText.sprintf('The color of a pear is %0$(color) and the color of an apple is %1$(color)', pear, apple));
     * // The color of a pear is brown and the color of an apple is green
     *
     * console.log(UFText.sprintf('The weight of a pear is %0${weight}.2f and the weight of an apple is %1${weight}.2f', pear, apple));
     * // The weight of a pear is 100.00 and the weight of an apple is 150.00
     *
     * console.log(UFText.sprintf('The number 12 as binary = %b', 12));
     * // The number 12 as binary = 1100
     *
     * console.log(UFText.sprintf('The number 12 as octal = %o', 12));
     * // The number 12 as octal = 14
     *
     * console.log(UFText.sprintf('The number 12 as decimal = %d', 12));
     * // The number 12 as decimal = 12
     *
     * console.log(UFText.sprintf('The number 12 as decimal with + = %+d', 12));
     * // The number 12 as decimal with + = +12
     *
     * console.log(UFText.sprintf('The number 12 as hexadecimal = %x', 12));
     * // The number 12 as hexadecimal = c
     *
     * console.log(UFText.sprintf('The number 12 as hexadecimal = %X', 12));
     * // The number 12 as hexadecimal = C
     *
     * console.log(UFText.sprintf('The number 12 as hexadecimal with padding = %04X', 12));
     * // The number 12 as hexadecimal = 000C
     *
     * console.log(UFText.sprintf('The number 12.5 as exponential = %.3e', 12.5));
     * // The number 12.5 as exponential = 1.250e+1
     *
     * console.log(UFText.sprintf('The number 12.5 as float = %.3f', 12.5));
     * // The number 12.5 as float = 12.500
     *
     * console.log(UFText.sprintf('[%8s] = default justification', 'abcd'));
     * // [    abcd] = default justification
     *
     * console.log(UFText.sprintf('[%-8s] = left justification', 'abcd'));
     * // [abcd    ] = left justification
     *
     * console.log(UFText.sprintf('[%08s] = default justification with zero padding', 'abcd'));
     * // [0000abcd] = default justification with zero padding
     *
     * // the next example uses \' to insert the - into the string
     * console.log(UFText.sprintf('[%\'-8s] = default justification with - padding', 'abcd'));
     * // [----abcd] = default justification with - padding
     *
     * console.log(UFText.sprintf('[%10s] = default justification with space padding', 'abcd'));
     * // [      abcd] = default justification with space padding
     *
     * console.log(UFText.sprintf('%%%.2f percentage', 33.5));
     * // %33.50 percentage
     */
    static sprintf(aFormat, ...anArguments) {
        // build regular expression to find specifications, the format specifier starts with a %
        const regExpr = "%"
            // skip if there is another % (%% are handled at the end of the method)
            + "(?!%)"
            // argument index
            + "((?<param_index>\\d+)\\$)?"
            // property name (which will be followed by a type specifier)
            + "(\\{(?<prop_typed>\\w+)\\})?"
            // add plus to numbers
            + "(?<add_plus>\\+)?"
            // determine padding character (either 0 or a custom char)
            + "(?<pad_zero>0|\'(?<pad_char>.))?"
            // left justification instead of right
            + "(?<left_justify>\\-)?"
            // minimal size
            + "(?<min_size>\\d+)?"
            // maximal size or number of decimal digits
            + "(\\.(?<max_size>\\d+))?"
            // type specifier and property name to be shown as text
            + "(?<format_type>\\((?<prop_text>\\w+)\\)|[bcdefFousxX])";
        // create RegExp instance and use global search
        const testExp = new RegExp(regExpr, 'g');
        // result contains resulting string
        let result = '';
        // end of last formatting part (points to character after)
        let formatEnd = 0;
        // current index into argument
        let argumentIndex = 0;
        // object to use for properties
        let defaultObject = null;
        // replace all matches
        for (let execResult = testExp.exec(aFormat); execResult != null; execResult = testExp.exec(aFormat)) {
            if (!execResult.groups) {
                continue;
            }
            // add string from previous position up to current
            result = result + aFormat.substring(formatEnd, execResult.index);
            // set to point after the found expression ([0] contains the whole regular expression string)
            formatEnd = execResult.index + execResult[0].length;
            // argument contains the value to format
            let argument = null;
            // get property name, use (name) if present ({name} will be ignored), else get {name}
            const propName = execResult.groups.prop_text
                ? execResult.groups.prop_text
                : execResult.groups.prop_typed ? execResult.groups.prop_typed : '';
            // object to get property from
            let object = null;
            // a parameter index is set?
            if (execResult.groups.param_index) {
                // get index to argument/object
                const index = Number(execResult.groups.param_index);
                if (index >= anArguments.length) {
                    // add % to result
                    result = result + '%';
                    // continue parsing with character after %
                    formatEnd = execResult.index + 1;
                    continue;
                }
                // set argument
                argument = anArguments[index];
                // also use as object to get property value from
                object = argument;
            }
            else if ((propName.length === 0) || (defaultObject == null)) {
                // no property name is specified, or there is no default object yet.
                // skip if there are no more arguments
                if (argumentIndex >= anArguments.length) {
                    // add % to result
                    result = result + '%';
                    // continue parsing with character after %
                    formatEnd = execResult.index + 1;
                    continue;
                }
                // Get argument and advance index
                argument = anArguments[argumentIndex++];
            }
            // there is a property name? Y: replace argument with value of property
            if (propName.length > 0) {
                // no parameter index was used?
                if (object == null) {
                    // yes, use defaultObject; initialize it if it is still null
                    if (defaultObject == null) {
                        defaultObject = argument;
                    }
                    object = defaultObject;
                }
                argument = object[propName];
            }
            // if there is a text property, change format_type to s to simulate a text format
            if (execResult.groups.prop_text) {
                execResult.groups.format_type = 's';
            }
            // textValue will be set to a textual representation of the value
            let textValue;
            // get min and max size (used with multiple format types)
            let min = execResult.groups.min_size ? Number(execResult.groups.min_size) : -1;
            let max = execResult.groups.max_size ? Number(execResult.groups.max_size) : -1;
            // format argument depending on type
            switch (execResult.groups.format_type) {
                case 's':
                    // get text value for special argument cases
                    switch (argument) {
                        case null:
                            textValue = 'null';
                            break;
                        case undefined:
                            textValue = 'undefined';
                            break;
                        default:
                            textValue = argument.toString();
                            break;
                    }
                    break;
                case 'c':
                    textValue = String.fromCharCode(Number(argument));
                    break;
                case 'b':
                    textValue = Number(argument).toString(2);
                    break;
                case 'x':
                    textValue = Number(argument).toString(16).toLowerCase();
                    break;
                case 'X':
                    textValue = Number(argument).toString(16).toUpperCase();
                    break;
                case 'u':
                    textValue = Number(argument).toString();
                    break;
                case 'd':
                    // int value
                    const intValue = Math.floor(Number(argument));
                    // add +?
                    textValue = ((intValue >= 0) && execResult.groups.add_plus ? execResult.groups.add_plus : '') + intValue.toString();
                    break;
                case 'o':
                    textValue = Number(argument).toString(8);
                    break;
                case 'e':
                case 'f':
                case 'F':
                    // get float value
                    const floatValue = Number(argument);
                    // add +?
                    textValue = (floatValue >= 0) && execResult.groups.add_plus
                        ? execResult.groups.add_plus : '';
                    // default to 6 if no max is specified
                    if (max < 0) {
                        max = 6;
                    }
                    // add formatted
                    textValue = textValue + ((execResult.groups.format_type === 'e') ?
                        floatValue.toExponential(max) : floatValue.toFixed(max));
                    // no cut off
                    max = -1;
                    break;
                default:
                    throw new Error('Unknown format specifier "' + execResult.groups.format_type + '"');
            }
            // pad to reach min size
            if (min >= 0) {
                // select correct pad char
                const padChar = execResult.groups.pad_char ?
                    execResult.groups.pad_char : (execResult.groups.pad_zero ? '0' : ' ');
                // add padding
                textValue = execResult.groups.left_justify ?
                    UFText.rpad(textValue, min, padChar) : UFText.lpad(textValue, min, padChar);
            }
            // keep within certain size?
            if (max >= 0) {
                textValue = textValue.substring(0, max);
            }
            // add formatted value to result
            result = result + textValue;
        }
        // add last part
        result = result + aFormat.substring(formatEnd);
        // replace all %% with a single %
        result = result.replace(/%%/g, '%');
        // return formatted string
        return result;
    }
    /**
     * This method performs: `console.log(UFStringTools.sprintf(aFormat, ...));`.
     *
     * @param aFormat
     *   String to format
     * @param anArguments
     *   Various parameters to format within the string
     */
    static printf(aFormat, ...anArguments) {
        console.log(UFText.sprintf.apply(null, arguments));
    }
}
// endregion
// region private vars
/**
 * Maps certain characters to their entity or special html tag or empty string if it has no
 * use in html
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
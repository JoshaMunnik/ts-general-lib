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
     * Maps certain characters to their entity or special html tag or empty string if it has no
     * use in html
     *
     * @private
     */
    static s_escapeHtmlMap: Map<string, string>;
    /**
     * Appends a text to another text using a separator. If either texts are empty, the method
     * just returns the other text without the separator.
     *
     * @param source
     *   Source to add to
     * @param value
     *   Value to append
     * @param separator
     *   Separator to use
     *
     * @return aValue added to aSource with aSeparator if both aValue and aSource are not empty.
     */
    static append(source: string, value: string, separator: string): string;
    /**
     * Converts plain text to html by replacing certain characters with their entity equivalent and
     * replacing \n with <br/> tags.
     *
     * Based on code from answer: https://stackoverflow.com/a/4835406/968451
     *
     * @param text
     *   Text to convert
     *
     * @return Html formatted plain text
     */
    static escapeHtml(text: string): string;
    /**
     * Escapes special characters in a string to be used in a regular expression.
     *
     * @param text
     *   Text to convert
     *
     * @return Escaped string with special characters prefixed with a backslash.
     */
    static escapeRegExp(text: string): string;
    /**
     * Generate a code existing of a random sequence of upper and lowercase and numbers.
     *
     * @param length
     *   Number of characters the code exists of
     *
     * @return The generated code.
     */
    static generateCode(length: number): string;
    /**
     * Converts a number to a string of 2 digits
     *
     * @param numberValue
     *   A number between 0 and 99
     *
     * @return aNumber as string, prefixed with a 0 if number exists of 1 digit
     *
     * @private
     */
    static twoDigits(numberValue: number): string;
    /**
     * Converts a number to a string of 3 digits
     *
     * @param numberValue
     *   A number between 0 and 999
     *
     * @return aNumber as string, prefixed with a 0 if number exists of 1 digit
     *
     * @private
     */
    static threeDigits(numberValue: number): string;
    /**
     * Replace all keys by their value in a string.
     *
     * @param text
     *   Text to update
     * @param map
     *   Replace keys with their values
     *
     * @return Updated aText
     */
    static replace(text: string, map: object): string;
    /**
     * Returns a number converted to a hex number of two digits.
     *
     * @param numberValue
     *   Number to convert (will be clamped between 0 and 255)
     *
     * @return hexadecimal string of 2 digits
     */
    static hexTwoDigits(numberValue: number): string;
    /**
     * Returns a number converted to a hex number of four digits.
     *
     * @param numberValue
     *   Number to convert (will be clamped between 0 and 65535)
     *
     * @return hexadecimal string of 4 digits
     */
    static hexFourDigits(numberValue: number): string;
    /**
     * Joins strings making sure there is one delimiter string between them.
     *
     * @param delimiter
     *   Delimiter to use
     * @param texts
     *   Texts to join
     *
     * @return aTexts joined together
     */
    static join(delimiter: string, ...texts: string[]): string;
    /**
     * Joins strings together using '/' as a delimiter.
     *
     * @param texts
     *   Texts to join
     *
     * @return aTexts joined together
     */
    static joinPath(...texts: string[]): string;
    /**
     * Gets the text to convert a number to an English ordinal number.
     *
     * @param numberValue
     *   Number to convert.
     *
     * @return Text to add to the number.
     */
    static getOrdinalPost(numberValue: number): string;
    /**
     * Converts a number to an English ordinal number.
     *
     * @param numberValue
     *   Number to convert.
     *
     * @return number with shortened ordinal text added to it.
     */
    static getOrdinalNumber(numberValue: number): string;
    /**
     * Gets a value as string.
     *
     * @param value
     *   Value to get
     * @param defaultText
     *   Default is used if aValue can not be converted to a string (in case of null, undefined, NaN)
     *
     * @return aValue as string (via toString() call) or aDefault.
     */
    static asString(value: any, defaultText?: string): string;
    /**
     * Formats a file size adding unit (bytes, KB, MB or GB).
     *
     * @param size
     *   Size to format
     *
     * @returns formatted size
     */
    static formatFileSize(size: number): string;
    /**
     * Gets the extension of file by returning the part after the last '.' in the name.
     *
     * @param fileName
     *   Filename to get extension of (may include path parts)
     *
     * @returns extension (without '.' and in lowercase) or false if no '.' could be
     *   located in the name.
     */
    static getFileExtension(fileName: string): string | false;
    /**
     * Add a number of padding chars on the left (in front) until a string reaches a certain
     * minimal size.
     *
     * @param text
     *   Text to pad
     * @param minSize
     *   Minimal size
     * @param padChar
     *   Char to add
     *
     * @return {string} aText padded with aPadChar, if aTexts length >= aMinSize then aText
     *   is just returned
     */
    static lpad(text: string, minSize: number, padChar?: string): string;
    /**
     * Add a number of padding chars on the right until a string reaches a certain minimal size.
     *
     * @param text
     *   Text to pad
     * @param minSize
     *   Minimal size
     * @param padChar
     *   Char to add
     *
     * @return {string} aText padded with aPadChar, if aTexts length >= aMinSize then aText is
     * just returned
     */
    static rpad(text: string, minSize: number, padChar?: string): string;
    /**
     * Adds a parameter to an url. The method checks if the url already contains parameters
     * (by containing a ? character). If it does the parameter is added to the end with a '&'
     * character. Else the parameter is added to the end with a '?' character.
     *
     * @param url
     *   Filename to add parameter to
     * @param parameter
     *   Parameter to add
     * @param value
     *   When specified the value to add to the parameter using '='
     *
     * @return anUrl with '?aParameter[=aValue]' or '&aParameter[=aValue]' added to it.
     */
    static addParameter(url: string, parameter: string, value?: string): string;
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
     * @param {string} format
     *   A string including format specifiers.
     * @param {...*} argumentList
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
    static sprintf(format: string, ...argumentList: any[]): string;
    /**
     * This method performs: `console.log(UFStringTools.sprintf(aFormat, ...));`.
     *
     * @param format
     *   String to format
     * @param argumentList
     *   Various parameters to format within the string
     */
    static printf(format: string, ...argumentList: any[]): void;
}

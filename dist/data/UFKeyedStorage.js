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
// region types
/**
 * A base class for storage classes that store values together with keys. A subclass must
 * implement the following methods: {@link setString}, {@link getString}, {@link remove},
 * {@link has} and {@link clear}.
 */
export class UFKeyedStorage {
    // endregion
    // region public methods
    /**
     * Stores an object in the storage. The default implementation uses JSON.stringify and calls
     * {@link setString} to store the object as string.
     *
     * @param key
     *   Key to store object for
     * @param value
     *   Object to store
     */
    setObject(key, value) {
        this.setString(key, JSON.stringify(value));
    }
    /**
     * Retrieves an object from storage. The default implementation gets a string using {@link getString} and uses
     * JSON.parse to convert a string back to an object.
     *
     * @param key
     *   Key to retrieve object for
     * @param defaultValue
     *   Default value to use
     *
     * @returns parsed object or aDefault if there is no item or an exception occurred while parsing the string.
     */
    getObject(key, defaultValue) {
        try {
            return this.has(key) ? JSON.parse(this.getString(key, "")) : defaultValue;
        }
        catch (error) {
            return defaultValue;
        }
    }
    /**
     * Stores a number in the storage. The default implementation converts the value to a string and stores it as a
     * string.
     *
     * @param key
     *   Key to store number for
     * @param value
     *   number to store
     */
    setNumber(key, value) {
        this.setString(key, '' + value);
    }
    /**
     * Retrieves a number from storage. The default implementation gets the value as string and uses parseFloat to
     * convert it back to a number.
     *
     * @param key
     *   Key to get value for
     * @param defaultValue
     *   Default value to use
     *
     * @returns parsed number or aDefault if there is no item or parsing resulted in a NaN value.
     */
    getNumber(key, defaultValue) {
        if (this.has(key)) {
            const result = parseFloat(this.getString(key, ""));
            return isNaN(result) ? defaultValue : result;
        }
        else {
            return defaultValue;
        }
    }
    /**
     * Stores an integer in the storage. The default implementation converts the value to a string and stores it as
     * a string.
     *
     * @param key
     *   Key to store integer for
     * @param value
     *   Integer to store
     */
    setInteger(key, value) {
        this.setString(key, '' + value);
    }
    /**
     * Retrieves a integer from storage. The default implementation gets the value as string and uses parseInt to convert
     * it back to an integer.
     *
     * @param key
     *   Key to get integer for
     * @param defaultValue
     *   Default value to use
     *
     * @returns parsed integer or aDefault if there is no item or parsing resulted in a NaN value.
     */
    getInteger(key, defaultValue) {
        if (this.has(key)) {
            const result = parseInt(this.getString(key, ""), 10);
            return isNaN(result) ? defaultValue : result;
        }
        else {
            return defaultValue;
        }
    }
    /**
     * Stores a boolean in the storage. The default implementation stores either '1' or '0'.
     *
     * @param key
     *   Key to store boolean for
     * @param value
     *   Boolean to store
     */
    setBoolean(key, value) {
        this.setString(key, value ? '1' : '0');
    }
    /**
     * Retrieves a boolean from storage. The default implementation gets the value as string and checks if it equals '1'
     *
     * @param key
     *   Key to get value for
     * @param defaultValue
     *   Default value to use
     *
     * @returns stored value is '1' or aDefault if there is no item
     */
    getBoolean(key, defaultValue) {
        if (this.has(key)) {
            return this.getString(key, '') === '1';
        }
        else {
            return defaultValue;
        }
    }
}
// endregion
//# sourceMappingURL=UFKeyedStorage.js.map
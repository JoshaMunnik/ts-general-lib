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
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS´´ AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
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
     * @param aKey
     *   Key to store object for
     * @param aValue
     *   Object to store
     */
    setObject(aKey, aValue) {
        this.setString(aKey, JSON.stringify(aValue));
    }
    /**
     * Retrieves an object from storage. The default implementation gets a string using {@link getString} and uses
     * JSON.parse to convert a string back to an object.
     *
     * @param aKey
     *   Key to retrieve object for
     * @param aDefault
     *   Default value to use
     *
     * @returns parsed object or aDefault if there is no item or an exception occurred while parsing the string.
     */
    getObject(aKey, aDefault) {
        try {
            return this.has(aKey) ? JSON.parse(this.getString(aKey, "")) : aDefault;
        }
        catch (error) {
            return aDefault;
        }
    }
    /**
     * Stores a number in the storage. The default implementation converts the value to a string and stores it as a
     * string.
     *
     * @param aKey
     *   Key to store number for
     * @param aValue
     *   number to store
     */
    setNumber(aKey, aValue) {
        this.setString(aKey, '' + aValue);
    }
    /**
     * Retrieves a number from storage. The default implementation gets the value as string and uses parseFloat to
     * convert it back to a number.
     *
     * @param aKey
     *   Key to get value for
     * @param aDefault
     *   Default value to use
     *
     * @returns parsed number or aDefault if there is no item or parsing resulted in a NaN value.
     */
    getNumber(aKey, aDefault) {
        if (this.has(aKey)) {
            const result = parseFloat(this.getString(aKey, ""));
            return isNaN(result) ? aDefault : result;
        }
        else {
            return aDefault;
        }
    }
    /**
     * Stores an integer in the storage. The default implementation converts the value to a string and stores it as
     * a string.
     *
     * @param aKey
     *   Key to store integer for
     * @param aValue
     *   Integer to store
     */
    setInteger(aKey, aValue) {
        this.setString(aKey, '' + aValue);
    }
    /**
     * Retrieves a integer from storage. The default implementation gets the value as string and uses parseInt to convert
     * it back to an integer.
     *
     * @param aKey
     *   Key to get integer for
     * @param aDefault
     *   Default value to use
     *
     * @returns parsed integer or aDefault if there is no item or parsing resulted in a NaN value.
     */
    getInteger(aKey, aDefault) {
        if (this.has(aKey)) {
            const result = parseInt(this.getString(aKey, ""), 10);
            return isNaN(result) ? aDefault : result;
        }
        else {
            return aDefault;
        }
    }
    /**
     * Stores a boolean in the storage. The default implementation stores either '1' or '0'.
     *
     * @param aKey
     *   Key to store boolean for
     * @param aValue
     *   Boolean to store
     */
    setBoolean(aKey, aValue) {
        this.setString(aKey, aValue ? '1' : '0');
    }
    /**
     * Retrieves a boolean from storage. The default implementation gets the value as string and checks if it equals '1'
     *
     * @param aKey
     *   Key to get value for
     * @param aDefault
     *   Default value to use
     *
     * @returns stored value is '1' or aDefault if there is no item
     */
    getBoolean(aKey, aDefault) {
        if (this.has(aKey)) {
            return this.getString(aKey, '') === '1';
        }
        else {
            return aDefault;
        }
    }
}
// endregion
//# sourceMappingURL=UFKeyedStorage.js.map
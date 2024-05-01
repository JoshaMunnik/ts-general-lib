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
 * {@link UFObject} implements various support methods for objects.
 */
export declare class UFObject {
    /**
     * Utility class with only static methods, do not allow instances.
     *
     * @private
     */
    private constructor();
    /**
     * Gets a property or throws an error if the property is missing.
     *
     * @param anObject
     *   Object to get property from
     * @param aPropertyName
     *   Property to get
     *
     * @return value of property
     *
     * @throws an error if the object does not contain the property
     */
    static getOrFail(anObject: any, aPropertyName: string): any;
    /**
     * Gets a property as a certain type or throws an error if the property is missing.
     *
     * @param anObject
     *   Object to get property from
     * @param aPropertyName
     *   Property to get
     *
     * @return value of property
     *
     * @throws an error if the object does not contain the property
     */
    static getOrFailAs<T>(anObject: any, aPropertyName: string): T;
    /**
     * Gets a property from an object.
     *
     * @param anObject
     *   Object to get property from
     * @param aPropertyName
     *   Property to get
     * @param aDefault
     *   Default value to use
     *
     * @return value from property or aDefault if it does not exist
     */
    static get(anObject: any, aPropertyName: string, aDefault: any): any;
    /**
     * Gets a property from an object and typecast it to a type.
     *
     * @param anObject
     *   Object to get property from
     * @param aPropertyName
     *   Property to get
     * @param aDefault
     *   Default value to use
     *
     * @return value from property or aDefault if it does not exist
     */
    static getAs<T>(anObject: any, aPropertyName: string, aDefault: T): T;
    /**
     * Sets a property in an object to a value. If the property can not be found, the method does
     * nothing.
     *
     * @param anObject
     *   Object to get property from
     * @param aPropertyName
     *   Property to set
     * @param aValue
     *   Value to set property with
     */
    static set(anObject: any, aPropertyName: string, aValue: any): void;
    /**
     * Sets a property in an object to a value. If the property can not be found, the method throws
     * an error.
     *
     * @param anObject
     *   Object to get property from
     * @param aPropertyName
     *   Property to set
     * @param aValue
     *   Value to set property with
     */
    static setOrFail(anObject: any, aPropertyName: string, aValue: any): void;
    /**
     * Gets a property from an object. If there is no property, create a new value and attach it
     * to the object.
     *
     * @param anObject
     *   Object to get property from
     * @param aPropertyName
     *   Name of property to get
     * @param aFactory
     *   Factory function to create a new value
     *
     * @return value from property
     */
    static getAttachedAs<T>(anObject: any, aPropertyName: string, aFactory: () => T): T;
    /**
     * See if all properties in aMatch can be found in aSource and are equal. If a property is an object, the
     * method will call itself recursively.
     *
     * Only properties defined in aMatch are checked.
     *
     * @param aSource
     *   Source object to test
     * @param aMatch
     *   Contains properties to match
     * @param [anIgnoreCase=false]
     *   True=ignore case of string properties,  false=casing must match for properties to be equal
     *
     * @return True: all properties found and matching in value
     */
    static equalProperties(aSource: any, aMatch: any, anIgnoreCase?: boolean): boolean;
    /**
     * Create a copy of the map setting properties in it to values of properties in aSource.
     *
     * aMap can contain properties with basic types or properties of type Object. In that case the object
     * properties are scanned.
     *
     * If aSource is an Array instance, a new Array instance is created else a new Object instance is used.
     *
     * @param aSource
     *   Source object to obtain values from
     * @param aMap
     *   An object with various properties
     *
     * @return A copy of aMap with values obtained from a Source.
     *
     * @example make copy of some properties in TextInput
     * <listing>
     * var map = Object = {
     *   text: 'some text',
     *   textField: {
     *     borderColor: 0xFF0000,
     *     backgroundColor: 0xFFCCCC
     *   }
     * };
     * var data: Object = UFObject.backupProperties(SomeTextInput, map);
     * // data.text = text of SomeTextInput
     * // data.textField.borderColor = current border color of SomeTextInput
     * // data.textField.backgroundColor = current background color
     * </listing>
     */
    static backupProperties(aSource: any, aMap: any): any;
    /**
     * Copy the values of properties in aValues to properties of same name in anObject.
     *
     * If a property of aValue is an object, the function will copy the properties in that object.
     *
     * If the value of a property if aValue is a function, the function will be called with two parameters:
     * anObject, property name. The function is responsible for assigning a value to anObject.
     *
     * @param anObject
     *   Object to update properties
     * @param aValues
     *   Object to get parse and obtain values from
     *
     * @return Value of anObject
     *
     * @example <caption>show error in TextInput</caption>
     * var errorProperties: Object = {
     *   textField: {
     *     borderColor: 0xFF0000,
     *     backgroundColor: 0xFFCCCC
     *   }
     * };
     * // backup current properties
     * var originalProperties: Object = UFObjectTools.backupProperties(SomeTextInput, errorProperties);
     * // show error state
     * UFObjectTools.applyProperties(SomeTextInput, errorProperties);
     * // restore original settings
     * UFObjectTools.applyProperties(SomeTextInput, originalProperties);
     */
    static applyProperties(anObject: any, aValues: any): any;
    /**
     * Copies the properties of an object. Recursively call this method of properties that are object values.
     *
     * @param anObject
     *   Object to copy
     *
     * @return copy of an object
     */
    static deepCopy<T extends object>(anObject: T): T;
}

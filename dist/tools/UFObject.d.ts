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
     * @param objectValue
     *   Object to get property from
     * @param propertyName
     *   Property to get
     *
     * @return value of property
     *
     * @throws an error if the object does not contain the property
     */
    static getOrFail(objectValue: any, propertyName: string): any;
    /**
     * Gets a property as a certain type or throws an error if the property is missing.
     *
     * @param objectValue
     *   Object to get property from
     * @param propertyName
     *   Property to get
     *
     * @return value of property
     *
     * @throws an error if the object does not contain the property
     */
    static getOrFailAs<T>(objectValue: any, propertyName: string): T;
    /**
     * Gets a property from an object.
     *
     * @param objectValue
     *   Object to get property from
     * @param propertyName
     *   Property to get
     * @param defaultValue
     *   Default value to use
     *
     * @return value from property or aDefault if it does not exist
     */
    static get(objectValue: any, propertyName: string, defaultValue: any): any;
    /**
     * Gets a property from an object and typecast it to a type.
     *
     * @param objectValue
     *   Object to get property from
     * @param propertyName
     *   Property to get
     * @param defaultValue
     *   Default value to use
     *
     * @return value from property or aDefault if it does not exist
     */
    static getAs<T>(objectValue: any, propertyName: string, defaultValue: T): T;
    /**
     * Sets a property in an object to a value. If the property can not be found, the method does
     * nothing.
     *
     * @param objectValue
     *   Object to get property from
     * @param propertyName
     *   Property to set
     * @param value
     *   Value to set property with
     */
    static set(objectValue: any, propertyName: string, value: any): void;
    /**
     * Sets a property in an object to a value. If the property can not be found, the method throws
     * an error.
     *
     * @param objectValue
     *   Object to get property from
     * @param propertyName
     *   Property to set
     * @param value
     *   Value to set property with
     */
    static setOrFail(objectValue: any, propertyName: string, value: any): void;
    /**
     * Gets a property from an object. If there is no property, create a new value and attach it
     * to the object.
     *
     * @param objectValue
     *   Object to get property from
     * @param propertyName
     *   Name of property to get
     * @param factory
     *   Factory function to create a new value
     *
     * @return value from property
     */
    static getAttachedAs<T>(objectValue: any, propertyName: string, factory: () => T): T;
    /**
     * See if all properties in aMatch can be found in aSource and are equal. If a property is
     * an object, the method will call itself recursively.
     *
     * Only properties defined in aMatch are checked.
     *
     * @param source
     *   Source object to test
     * @param match
     *   Contains properties to match
     * @param ignoreCase
     *   True: ignore case of string properties, false: casing must match for properties to be equal
     *
     * @return True: all properties found and matching in value
     */
    static equalProperties(source: any, match: any, ignoreCase?: boolean): boolean;
    /**
     * Create a copy of the map object, setting properties in it to values of properties in aSource.
     *
     * aMap can contain properties with basic types or properties of type Object. In that case the
     * object properties are scanned.
     *
     * If aSource is an Array instance, a new Array instance is created else a new Object
     * instance is used.
     *
     * @param source
     *   Source object to obtain values from
     * @param map
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
    static backupProperties(source: any, map: any): any;
    /**
     * Copy the values of properties in aValues to properties of same name in anObject.
     *
     * If a property of aValue is an object, the function will copy all the properties in that object.
     *
     * If the value of a property of aValue is a function, the function will be called with
     * two parameters: anObject, property name. The function is responsible for assigning a value to
     * anObject.
     *
     * @param objectValue
     *   Object to update properties
     * @param values
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
    static applyProperties(objectValue: any, values: any): any;
    /**
     * Copies the properties of an object. Recursively call this method for properties that are
     * object values.
     *
     * @param objectValue
     *   Object to copy
     *
     * @return copy of an object
     */
    static deepCopy<T extends object>(objectValue: T): T;
    /**
     * Checks if an object contains a certain key. It is possible to specify multiple values.
     *
     * @param objectValue
     *   An object (keys are checked)
     * @param keys
     *   One or more key names to check
     *
     * @returns True if the object has a key that matches one of the aKeys values.
     */
    static contains(objectValue: any, ...keys: string[]): boolean;
    /**
     * Combines multiple object instances.
     *
     * The method will create a new object and copies all properties (including getters and setters)
     * from each argument to the new object.
     *
     * After processing all arguments, the method checks each argument again if it contains the
     * initialize method specified by anInitMethod.
     *
     * If aCallInit is true, the initialize method gets called using the newly created object as
     * its function scope.
     *
     * If aCallInit is false, a new initialize method is attached to the created object that will call
     * all the other initialize methods with the correct function scope.
     *
     * @param objects
     *   Object instances to combine
     * @param callInitialize
     *   When false do not call the initialize methods but create and attach a new initialize method
     *   that will call the initialize methods (if any of the other objects contains the initialize
     *   method).
     * @param initializeName
     *   The name of the initialize method to call or null to skip.
     *
     * @return An instance being a combination of all arguments
     */
    static combineObjects(objects: any[], callInitialize?: boolean, initializeName?: string): any;
    /**
     * Copies a property/method from one object to another. If the property is a getter or setter,
     * the method will redefine the property in the target object.
     *
     * @param name
     *   Name of property
     * @param source
     *   Source to copy property from
     * @param target
     *   Target to copy property to
     */
    static copyProperty(name: string, source: any, target: any): void;
    /**
     * Copies all properties from one object to another object using {@link copyProperty}.
     *
     * It is possible to specify a separator name via `aSeparatorName`; in that case the property
     * of that name is not copied but is placed in the `aSeparatorList`.
     *
     * @private
     *
     * @param source
     *   Source to copy from
     * @param target
     *   Target to copy to
     * @param separatorName
     *   Optional name of property to place in aSeparatorList
     * @param separatorList
     *   Must be specified if aSeparatorName is specified.
     */
    static copyProperties(source: any, target: any, separatorName?: string, separatorList?: any[]): void;
    /**
     * Processes init methods.
     *
     * @private
     *
     * @param {object} target
     *   Object that acts as the function scope and might get an initialized function attached to it
     *   if aCallInit is false.
     * @param functions
     *   A list of functions to call using aTarget as function scope.
     * @param methodName
     *   When specified, instead of calling the functions a new method will be attached to aTarget
     *   using this name. The method will call all functions with aTarget as function scope.
     */
    static callMethods(target: any, functions: any[], methodName?: string): void;
    /**
     * Checks if an object is an instance of a class. If anObject is not an object, the method will
     * return false.
     *
     * The method will also return false if instanceOf fails with an exception.
     *
     * @param objectValue
     *   Object to check
     * @param classType
     *   Class to check
     *
     * @return True if anObject is an instance of aClass; in all other cases false.
     */
    static instanceOf(objectValue: any, classType: any): boolean;
}

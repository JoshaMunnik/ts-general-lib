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
 * {@link UFObject} implements various support methods for objects.
 */
export class UFObject {
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
    static getOrFail(objectValue, propertyName) {
        if (propertyName in objectValue) {
            return objectValue[propertyName];
        }
        throw new Error(`Missing ${propertyName} in object`);
    }
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
    static getOrFailAs(objectValue, propertyName) {
        return UFObject.getOrFail(objectValue, propertyName);
    }
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
    static get(objectValue, propertyName, defaultValue) {
        return propertyName in objectValue ? objectValue[propertyName] : defaultValue;
    }
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
    static getAs(objectValue, propertyName, defaultValue) {
        return propertyName in objectValue ? objectValue[propertyName] : defaultValue;
    }
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
    static set(objectValue, propertyName, value) {
        if (propertyName in objectValue) {
            objectValue[propertyName] = value;
        }
    }
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
    static setOrFail(objectValue, propertyName, value) {
        if (propertyName in objectValue) {
            objectValue[propertyName] = value;
        }
        else {
            throw new Error(`Missing ${propertyName} in object`);
        }
    }
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
    static getAttachedAs(objectValue, propertyName, factory) {
        if (!(propertyName in objectValue)) {
            objectValue[propertyName] = factory();
        }
        return objectValue[propertyName];
    }
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
    static equalProperties(source, match, ignoreCase = false) {
        // go through all properties in aMatch
        for (let propertyName in match) {
            // only test properties that are defined by aMatch
            if (match.hasOwnProperty(propertyName)) {
                // exit if source does not have that property
                if (!source.hasOwnProperty(propertyName)) {
                    return false;
                }
                // handle certain types
                switch (typeof (match[propertyName])) {
                    case 'object':
                        // match properties of both objects
                        if (!UFObject.equalProperties(source[propertyName], match[propertyName], ignoreCase)) {
                            return false;
                        }
                        break;
                    case 'string':
                        // convert both to lower case if ignoring case
                        let sourceText = source[propertyName];
                        let matchText = match[propertyName];
                        if (ignoreCase) {
                            sourceText = sourceText.toLowerCase();
                            matchText = matchText.toLowerCase();
                        }
                        if (sourceText !== matchText) {
                            return false;
                        }
                        break;
                    default:
                        // exit if source is not equal to match
                        if (source[propertyName] !== match[propertyName]) {
                            return false;
                        }
                        break;
                }
            }
        }
        // all properties passed the test, so aSource matched
        // all properties in aMatch
        return true;
    }
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
    static backupProperties(source, map) {
        const result = Array.isArray(source) ? [] : {};
        for (const propertyName in map) {
            if (map.hasOwnProperty(propertyName) &&
                source.hasOwnProperty(propertyName)) {
                let value = map[propertyName];
                if (typeof value === 'object') {
                    result[propertyName] = UFObject.backupProperties(source[propertyName], map[propertyName]);
                }
                else {
                    result[propertyName] = source[propertyName];
                }
            }
        }
        return result;
    }
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
    static applyProperties(objectValue, values) {
        for (const propertyName in values) {
            if (values.hasOwnProperty(propertyName) && objectValue.hasOwnProperty(propertyName)) {
                const value = values[propertyName];
                if (typeof value === 'function') {
                    value(objectValue, propertyName);
                }
                else if (typeof value === 'object') {
                    UFObject.applyProperties(objectValue[propertyName], values[propertyName]);
                }
                else {
                    objectValue[propertyName] = values[propertyName];
                }
            }
        }
        return objectValue;
    }
    /**
     * Copies the properties of an object. Recursively call this method for properties that are
     * object values.
     *
     * @param objectValue
     *   Object to copy
     *
     * @return copy of an object
     */
    static deepCopy(objectValue) {
        const result = {};
        Object.keys(objectValue).forEach(key => {
            const value = objectValue[key];
            result[key] = typeof value === 'object' ? this.deepCopy(value) : value;
        });
        return result;
    }
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
    static contains(objectValue, ...keys) {
        return keys.findIndex(key => objectValue.hasOwnProperty(key)) >= 0;
    }
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
    static combineObjects(objects, callInitialize = true, initializeName = '__init') {
        if (objects.length === 0) {
            return {};
        }
        // start with empty object
        const result = {};
        // get all __init methods from all objects
        const initializeFunctions = [];
        // add each argument to result
        objects.forEach(source => UFObject.copyProperties(source, result, initializeName, initializeFunctions));
        if (initializeFunctions.length) {
            UFObject.callMethods(result, initializeFunctions, callInitialize ? undefined : initializeName);
        }
        return result;
    }
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
    static copyProperty(name, source, target) {
        // if there is a descriptor, and it defines a get and/or set field copy the property by
        // redefining it in the result object.
        const descriptor = Object.getOwnPropertyDescriptor(source, name);
        if (descriptor && (descriptor.get || descriptor.set)) {
            Object.defineProperty(target, name, descriptor);
        }
        else {
            // just copy field
            target[name] = source[name];
        }
    }
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
    static copyProperties(source, target, separatorName, separatorList) {
        if (separatorName && !separatorList) {
            throw new Error('Missing separator list while a separator name was specified');
        }
        // only copy properties defined within the object itself
        const names = Object.getOwnPropertyNames(source);
        names.forEach(name => {
            if (separatorName && (name === separatorName)) {
                separatorList.push(source[name]);
            }
            else {
                UFObject.copyProperty(name, source, target);
            }
        });
    }
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
    static callMethods(target, functions, methodName) {
        const callFunctions = () => functions.forEach(method => method.call(target));
        if (methodName) {
            target[methodName] = callFunctions;
        }
        else {
            callFunctions();
        }
    }
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
    static instanceOf(objectValue, classType) {
        if (typeof classType !== 'function') {
            return false;
        }
        try {
            return objectValue instanceof classType;
        }
        catch (_a) {
            return false;
        }
    }
}
// endregion
//# sourceMappingURL=UFObject.js.map
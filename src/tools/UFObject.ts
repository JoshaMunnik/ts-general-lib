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
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
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
 * {@link UFObject} implements various support methods for objects.
 */
export class UFObject {
  // region constructor

  /**
   * Utility class with only static methods, do not allow instances.
   *
   * @private
   */
  private constructor() {
  }

  // endregion

  // region public methods

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
  static getOrFail(anObject: any, aPropertyName: string): any {
    if (aPropertyName in anObject) {
      return anObject[aPropertyName];
    }
    throw new Error(`Missing ${aPropertyName} in object`);
  }

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
  static getOrFailAs<T>(anObject: any, aPropertyName: string): T {
    return UFObject.getOrFail(anObject, aPropertyName) as T;
  }

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
  static getAs<T>(anObject: any, aPropertyName: string, aDefault: T): T {
    return aPropertyName in anObject ? anObject[aPropertyName] as T : aDefault;
  }

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
  static equalProperties(aSource: any, aMatch: any, anIgnoreCase: boolean = false): boolean {
    // go through all properties in aMatch
    for (let propertyName in aMatch) {
      // only test properties that are defined by aMatch
      if (aMatch.hasOwnProperty(propertyName)) {
        // exit if source does not have that property
        if (!aSource.hasOwnProperty(propertyName)) {
          return false;
        }
        // handle certain types
        switch (typeof (aMatch[propertyName])) {
          case 'object':
            // match properties of both objects
            if (!UFObject.equalProperties(
              aSource[propertyName], aMatch[propertyName], anIgnoreCase
            )) {
              return false;
            }
            break;
          case 'string':
            // convert both to lower case if ignoring case
            let source: string = aSource[propertyName];
            let match: string = aMatch[propertyName];
            if (anIgnoreCase) {
              source = source.toLowerCase();
              match = match.toLowerCase();
            }
            if (source !== match) {
              return false;
            }
            break;
          default:
            // exit if source is not equal to match
            if (aSource[propertyName] !== aMatch[propertyName]) {
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
  static backupProperties(aSource: any, aMap: any): any {
    const result: any = aSource instanceof Array ? [] : {};
    for (let propertyName in aMap) {
      if (aMap.hasOwnProperty(propertyName) &&
        aSource.hasOwnProperty(propertyName)) {
        let value = aMap[propertyName];
        if (typeof value === 'object') {
          result[propertyName] = UFObject.backupProperties(
            aSource[propertyName], aMap[propertyName]
          );
        }
        else {
          result[propertyName] = aSource[propertyName];
        }
      }
    }
    return result;
  }

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
  static applyProperties(anObject: any, aValues: any): any {
    for (let propertyName in aValues) {
      if (aValues.hasOwnProperty(propertyName) && anObject.hasOwnProperty(propertyName)) {
        const value = aValues[propertyName];
        if (typeof value === 'function') {
          value(anObject, propertyName);
        }
        else if (typeof value === 'object') {
          UFObject.applyProperties(
            anObject[propertyName], aValues[propertyName]
          );
        }
        else {
          anObject[propertyName] = aValues[propertyName];
        }
      }
    }
    return anObject;
  }

  /**
   * Copies the properties of an object. Recursively call this method of properties that are object values.
   *
   * @param anObject
   *   Object to copy
   *
   * @return copy of an object
   */
  static deepCopy<T extends object>(anObject: T): T {
    const result: any = {};
    Object.keys(anObject).forEach(key => {
      const value = (anObject as any)[key];
        result[key] = typeof value === 'object' ? this.deepCopy(value) : value;
    });
    return result;
  }

}

// endregion

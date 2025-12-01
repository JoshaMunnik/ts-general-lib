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

import {IUFModel} from "../models/IUFModel.js";

// endregion

// region private constants

/**
 * Number of days in a month. The first month starts at 1.
 *
 * @type {number[]}
 */
const MONTH_DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * A regular expression to test for integer numbers (without plus or minus sign)
 */
const INT_NUMBER: RegExp = /\d+/;

// endregion

// region exports

/**
 * A function interface to validate a value.
 */
export interface IUFValidateValue {
  /**
   * Checks if a value is valid.
   *
   * @param value
   *   Value to check
   *
   * @returns True if the value is valid; false otherwise.
   */
  (value: any): boolean
}

/**
 * A object interface that defines a method to test if a value is valid.
 */
export interface IUFValueValidator {
  /**
   * Checks if a value is valid.
   *
   * @param value
   *   Value to check
   *
   * @returns True if the value is valid; false otherwise.
   */
  isValidValue(value: any): boolean;
}

/**
 * An object interface that defines a method to test if a property is valid.
 */
export interface IUFPropertyValidator {
  /**
   * Checks if a value is valid for a certain property.
   *
   * @param propertyName
   *   Name of property
   * @param data
   *   Data that contains the property
   * @param value
   *   Value to check
   *
   * @returns True if the value is valid; false otherwise.
   */
  isValidPropertyValue(propertyName: string, data: IUFModel, value: any): boolean;
}

/**
 * {@link UFValidators} defines various static methods to validate values.
 *
 * There are two form of validation methods:
 * - the isXXXX(*) methods perform an immediate validation of a value.
 * - the createXXXX methods create and return a validation function to validate a value.
 */
export class UFValidators {
  // region constructor

  /**
   * Utility class with only static methods, do not allow instances.
   *
   * @private
   */
  private constructor() {
  }

  // endregion

  // region validator functions

  /**
   * Checks if a text contains at least one non space character.
   *
   * @param text
   *   Value to validate
   *
   * @returns True if the value contains one or more non-space chars; false if the string is null, empty or
   *   contains only spaces.
   */
  static isNonEmptyText(text: any): boolean {
    if (text) {
      const value = text.toString().trim();
      return value.length > 0;
    }
    return false;
  }

  /**
   * Checks if a value is valid number.
   *
   * @param value
   *   Value to test
   *
   * @returns the result of !isNaN(aValue)
   */
  static isNumber(value: any): boolean {
    return !isNaN(value);
  }

  /**
   * Checks if a value is a valid integer.
   *
   * @param value
   *   Value to test
   *
   * @returns true if aValue is a valid integer.
   */
  static isInteger(value: any): boolean {
    return /^\s*(\+|-)?\d+\s*$/.test(value.toString());
  }

  /**
   * Checks if a value is a valid email address.
   *
   * @param value
   *   Value to test
   *
   * @returns true if aValue is a valid email address.
   */
  static isEmail(value: any): boolean {
    return /(\w|[_.\-])+@((\w|-)+\.)+\w{2,32}/.test(value.toString());
  }

  /**
   * Checks if a value is a valid dutch zip code.
   *
   * @param value
   *   Value to test
   *
   * @returns true if aValue is a valid dutch zip code.
   */
  static isZipCodeDutch(value: any): boolean {
    return /\d\d\d\d\s?[A-Za-z][A-Za-z]/.test(value.toString());
  }

  /**
   * Checks if a value is a valid city name.
   *
   * @param value
   *   Value to test
   *
   * @returns true if aValue is a valid city name.
   */
  static isCityName(value: any): boolean {
    return /[A-Za-z\-\s'"\.]+/.test(value.toString());
  }

  /**
   * Checks if a value is an array.
   *
   * @param value
   *   Value to test
   *
   * @returns true if aValue is a valid city name.
   */
  static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  // endregion

  // region validator creation functions

  /**
   * Creates a validator function that checks if a value matches a regular expression.
   *
   * @param regExp
   *   Regular expression to use for testing
   *
   * @returns validator function.
   */
  static createRegExp(regExp: RegExp): IUFValidateValue {
    return aValue => regExp.test(aValue.toString());
  }

  /**
   * Creates a validator function that checks if a value is string with a certain length.
   *
   * @param min
   *   Minimal number of characters allowed
   * @param [max=Number.MAX_VALUE]
   *   Maximum number of characters allowed
   *
   * @returns validator function.
   */
  createTextLength(min: number, max: number = Number.MAX_VALUE): IUFValidateValue {
    return aValue => {
      const charCount = aValue.toString().length;
      return (charCount >= min) && (charCount <= max);
    };
  }

  /**
   * Creates a validator that checks if a value is a valid number and within a certain value range.
   *
   * @param min
   *   Minimum value allowed (including this value)
   * @param [max=Number.MAX_VALUE]
   *   Maximum value allowed (including this value)
   *
   * @returns validator function.
   */
  createNumberRange(min: number, max: number = Number.MAX_VALUE): IUFValidateValue {
    return aValue => {
      if (!UFValidators.isNumber(aValue)) {
        return false;
      }
      const value = parseFloat(aValue + "");
      return (value >= min) && (value <= max);
    }
  }

  /**
   * Creates a validator that checks if a value is a valid integer and within a certain value range.
   *
   * @param min
   *   Minimum value allowed (including this value)
   * @param [max=Number.MAX_VALUE]
   *   Maximum value allowed (including this value)
   *
   * @returns validator function.
   */
  createIntegerRange(min: number, max: number = Number.MAX_VALUE): IUFValidateValue {
    return aValue => {
      if (!UFValidators.isInteger(aValue)) {
        return false;
      }
      const value = parseInt(aValue + "", 10);
      return (value >= min) && (value <= max);
    }
  }

  /**
   * Creates a validator that checks if a value is a valid integer and within a certain value range.
   *
   * @param min
   *   Minimum value allowed (including this value)
   * @param [max=Number.MAX_VALUE]
   *   Maximum value allowed (including this value)
   *
   * @returns validator function.
   */
  createArrayRange(min: number, max: number = Number.MAX_VALUE): IUFValidateValue {
    return aValue => {
      if (!UFValidators.isArray(aValue)) {
        return false;
      }
      return (aValue.length >= min) && (aValue.length <= max);
    }
  }

  /**
   * Creates a validator that checks if a value matches a boolean value.
   *
   * @param validValue
   *   Value to match
   *
   * @returns validator function.
   */
  static createBoolean(validValue: boolean): IUFValidateValue {
    return aValue => aValue === validValue;
  }

  /**
   * Creates a validator that checks if a property contains a valid value. The validator does not do
   * anything with the passed value.
   *
   * @param property
   *   Property name
   * @param data
   *   Data instance
   *
   * @returns validator function.
   */
  static createAnotherProperty(property: string, data: IUFModel): IUFValidateValue {
    return () => data.isValidPropertyValue(property, data.getPropertyValue(property));
  }

  /**
   * Creates a validator that checks if a value is equal to a property.
   *
   * @param property
   *   Property name
   * @param data
   *   Data instance
   *
   * @returns validator function.
   */
  static createEqualToProperty(property: string, data: IUFModel): IUFValidateValue {
    return aValue => aValue === data.getPropertyValue(property);
  }

  /**
   * Creates a validator that optionally validates a value. If a value is empty or '' then the validator
   * will return true else it will pass the value to another validator.
   *
   * @param validator
   *   Validator to use for non empty values.
   *
   * @returns validator function.
   */
  static createOptional(validator: IUFValidateValue|IUFValueValidator): IUFValidateValue {
    return aValue => aValue && aValue.toString().length
      ? UFValidators.isValidValue(aValue, validator)
      : true;
  }

  /**
   * Creates a validator to validate a day value.
   *
   * @param monthProperty
   *   Property name for month
   * @param yearProperty
   *   Property name for year
   * @param data
   *   UFModel instance
   *
   * @returns validator function.
   */
  createDay(monthProperty: string, yearProperty: string, data: IUFModel): IUFValidateValue {
    return aValue => {
      const value: string = aValue + "";
      if (!INT_NUMBER.test(value)) {
        return false;
      }
      const day: number = parseInt(value, 10);
      // day should be between 1 and 31 (at least)
      if ((day < 1) || (day > 31)) {
        return false;
      }
      let maxDay: number = 31;
      const yearValue: string = data.getPropertyValue<any>(yearProperty).toString();
      const monthValue: string = data.getPropertyValue<any>(monthProperty).toString();
      if (INT_NUMBER.test(monthValue) && INT_NUMBER.test(yearValue)) {
        const year = parseInt(yearValue, 10);
        const month = parseInt(monthValue, 10);
        // valid month
        if ((month > 1) && (month < 13)) {
          // yes, get maximum day
          maxDay = MONTH_DAYS[month];
          // handle leap years and the month february
          if ((month === 2) && (((year % 400) === 0) || (((year % 100) !== 0) && ((year % 4) === 0)))) {
            maxDay = 29;
          }
        }
      }
      // there was already a check on day being 1 or more, so only check if day is small enough
      return day <= maxDay;
    }
  }

  // endregion

  // region support methods

  /**
   * Checks if value is valid.
   *
   * @param value
   *   Value to validate
   * @param validator
   *   Validator to use
   *
   * @returns result from validator or true if validator is not
   *   supported.
   */
  static isValidValue(value: any, validator: IUFValidateValue|IUFValueValidator) {
    // use validation function
    if (typeof validator === 'function') {
      return validator(value);
    }
    // use value validation
    if (validator.hasOwnProperty('isValidValue') && (typeof validator.isValidValue === 'function')) {
      return validator.isValidValue(value);
    }
    // unsupported validator, so value is always valid
    return true;
  }

  /**
   * Checks if a property has a valid value.
   *
   * @param data
   *   Data to get property value from
   * @param propertyName
   *   Name of property
   * @param validator
   *   Validator to use
   * @param [value]
   *   Value to validate, when missing use the value of the property.
   *
   * @returns result from validator or true if validator is not
   *   supported.
   */
  static isValidProperty(
    data: IUFModel,
    propertyName: string,
    validator: IUFValidateValue|IUFValueValidator|IUFPropertyValidator,
    value?: any
  ): boolean {
    // get value from property if none was specified
    if (value === undefined) {
      value = data.getPropertyValue(propertyName);
    }
    // use validation function
    if (typeof validator === 'function') {
      return validator(value);
    }
    // use property validation
    // @ts-ignore
    if (validator.hasOwnProperty('isValidPropertyValue') && (typeof validator.isValidPropertyValue === 'function')) {
      // @ts-ignore
      return validator.isValidPropertyValue(propertyName, data, value);
    }
    // use value validation
    // @ts-ignore
    if (typeof validator.isValidValue === 'function') {
      // @ts-ignore
      return validator.isValidValue(value);
    }
    // unsupported validator, so value is always valid
    return true;
  }

  // endregion
}

// endregion

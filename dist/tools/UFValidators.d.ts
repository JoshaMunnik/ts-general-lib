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
import { IUFModel } from "../models/IUFModel.js";
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
    (value: any): boolean;
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
export declare class UFValidators {
    /**
     * Utility class with only static methods, do not allow instances.
     *
     * @private
     */
    private constructor();
    /**
     * Checks if a text contains at least one non space character.
     *
     * @param text
     *   Value to validate
     *
     * @returns True if the value contains one or more non-space chars; false if the string is null, empty or
     *   contains only spaces.
     */
    static isNonEmptyText(text: any): boolean;
    /**
     * Checks if a value is valid number.
     *
     * @param value
     *   Value to test
     *
     * @returns the result of !isNaN(aValue)
     */
    static isNumber(value: any): boolean;
    /**
     * Checks if a value is a valid integer.
     *
     * @param value
     *   Value to test
     *
     * @returns true if aValue is a valid integer.
     */
    static isInteger(value: any): boolean;
    /**
     * Checks if a value is a valid email address.
     *
     * @param value
     *   Value to test
     *
     * @returns true if aValue is a valid email address.
     */
    static isEmail(value: any): boolean;
    /**
     * Checks if a value is a valid dutch zip code.
     *
     * @param value
     *   Value to test
     *
     * @returns true if aValue is a valid dutch zip code.
     */
    static isZipCodeDutch(value: any): boolean;
    /**
     * Checks if a value is a valid city name.
     *
     * @param value
     *   Value to test
     *
     * @returns true if aValue is a valid city name.
     */
    static isCityName(value: any): boolean;
    /**
     * Checks if a value is an array.
     *
     * @param value
     *   Value to test
     *
     * @returns true if aValue is a valid city name.
     */
    static isArray(value: any): boolean;
    /**
     * Creates a validator function that checks if a value matches a regular expression.
     *
     * @param regExp
     *   Regular expression to use for testing
     *
     * @returns validator function.
     */
    static createRegExp(regExp: RegExp): IUFValidateValue;
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
    createTextLength(min: number, max?: number): IUFValidateValue;
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
    createNumberRange(min: number, max?: number): IUFValidateValue;
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
    createIntegerRange(min: number, max?: number): IUFValidateValue;
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
    createArrayRange(min: number, max?: number): IUFValidateValue;
    /**
     * Creates a validator that checks if a value matches a boolean value.
     *
     * @param validValue
     *   Value to match
     *
     * @returns validator function.
     */
    static createBoolean(validValue: boolean): IUFValidateValue;
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
    static createAnotherProperty(property: string, data: IUFModel): IUFValidateValue;
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
    static createEqualToProperty(property: string, data: IUFModel): IUFValidateValue;
    /**
     * Creates a validator that optionally validates a value. If a value is empty or '' then the validator
     * will return true else it will pass the value to another validator.
     *
     * @param validator
     *   Validator to use for non empty values.
     *
     * @returns validator function.
     */
    static createOptional(validator: IUFValidateValue | IUFValueValidator): IUFValidateValue;
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
    createDay(monthProperty: string, yearProperty: string, data: IUFModel): IUFValidateValue;
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
    static isValidValue(value: any, validator: IUFValidateValue | IUFValueValidator): boolean;
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
    static isValidProperty(data: IUFModel, propertyName: string, validator: IUFValidateValue | IUFValueValidator | IUFPropertyValidator, value?: any): boolean;
}

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
// region class
/**
 * Possible angle units
 */
export var UFAngleUnit;
(function (UFAngleUnit) {
    UFAngleUnit[UFAngleUnit["degrees"] = 0] = "degrees";
    UFAngleUnit[UFAngleUnit["radians"] = 1] = "radians";
})(UFAngleUnit || (UFAngleUnit = {}));
/**
 * {@link UFMath} implements methods supporting numbers.
 */
export class UFMath {
    // region constructor
    /**
     * Utility class with only static methods, do not allow instances.
     *
     * @private
     */
    constructor() {
    }
    // endregion
    // region static properties
    /**
     * Determines how to treat angle parameters or which unit to use when returning angles.
     */
    static get angleUnit() {
        return UFMath.s_angleUnit;
    }
    static set angleUnit(value) {
        UFMath.s_angleUnit = value;
    }
    // endregion
    // region static methods
    /**
     * Convert angle to radians, use angleUnit to determine unit of input parameter.
     *
     * @param angle
     *   Angle to convert
     *
     * @returns Converted angle.
     */
    static toRadians(angle) {
        return (UFMath.angleUnit === UFAngleUnit.degrees) ? angle * Math.PI / 180 : angle;
    }
    /**
     * Convert angle from radians to unit as specified by m_angleUnit
     *
     * @param angle
     *   Angle to convert
     *
     * @returns Converted angle.
     */
    static fromRadians(angle) {
        return (UFMath.angleUnit === UFAngleUnit.degrees) ? angle * 180 / Math.PI : angle;
    }
    // endregion
    // region public methods
    /**
     * Rotates a 2D coordinate around a certain point.
     *
     * @param angle
     *   Angle
     * @param x
     *   X coordinate of point to rotate
     * @param y
     *   Y coordinate of point to rotate
     * @param originX
     *   X coordinate of point to rotate around
     * @param originY
     *   Y coordinate of point to rotate around
     *
     * @returns {{x,y}} An object with x and y property.
     */
    static rotate(angle, x, y, originX = 0, originY = 0) {
        angle = UFMath.toRadians(angle);
        const transX = x - originX;
        const transY = y - originY;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        return {
            x: transX * cos - transY * sin + originX,
            y: transX * sin + transY * cos + originY
        };
    }
    /**
     * Calculates the angle between two points
     *
     * @param x1
     *  First X coordinate of point
     * @param y1
     *  First Y coordinate of point
     * @param x2
     *  Second X coordinate of point
     * @param y2
     *  Second Y coordinate of point
     *
     * @returns Angle in degrees (0..360)
     */
    static angle(x1, y1, x2, y2) {
        return UFMath.fromRadians(Math.atan2(y2 - y1, x2 - x1));
    }
    /**
     * Calculates distance between two points.
     *
     * @param x1
     *  First X coordinate of point
     * @param y1
     *  First Y coordinate of point
     * @param x2
     *  Second X coordinate of point
     * @param y2
     *  Second Y coordinate of point
     *
     * @returns Distance between two points
     */
    static distance(x1, y1, x2, y2) {
        const dX = x1 - x2;
        const dY = y1 - y2;
        return Math.sqrt(dX * dX + dY * dY);
    }
    /**
     * Returns a random integer.
     *
     * @param minOrMaxValue
     *   Minimal or maximum value (if aMax is not specified)
     * @param maxValue
     *   Maximal value
     *
     * @return {number} random integer between aMin and aMax (inclusive)
     */
    static randomInteger(minOrMaxValue, maxValue) {
        if (maxValue === undefined) {
            maxValue = minOrMaxValue;
            minOrMaxValue = 0;
        }
        return Math.floor(minOrMaxValue + Math.random() * (maxValue - minOrMaxValue + 1));
    }
    /**
     * Increases or decreases value, so it gets nearer to a target value.
     *
     * @param target
     *   Value to reach
     * @param current
     *   Current value
     * @param stepSize
     *   Value to move with
     *
     * @returns aCurrent +/- aStep or aTarget if aCurrent was closer to aTarget then aStep distance
     */
    static moveTo(target, current, stepSize) {
        return (target > current)
            ? Math.min(target, current + stepSize)
            : Math.max(target, current - stepSize);
    }
    /**
     * Calculates a position based on movement over time. The method makes sure the returned value is between the
     * specified target and starting values.
     *
     * @param target
     *   Target to move to
     * @param start
     *   Starting position moving from
     * @param currentTime
     *   Current time
     * @param totalTime
     *   Total time movement should take place
     * @returns value between aStart and aTarget (both inclusive)
     */
    static moveOverTime(target, start, currentTime, totalTime) {
        return start + (target - start) *
            Math.max(0, Math.min(currentTime, totalTime)) / totalTime;
    }
    /**
     * Makes sure a value is within a range.
     *
     * @param minValue
     *   Minimum value
     * @param maxValue
     *   Maximum value
     * @param value
     *   Value to test
     *
     * @returns aValue if it is within range or aMin or aMax
     */
    static minmax(minValue, maxValue, value) {
        return Math.max(minValue, Math.min(maxValue, value));
    }
    /**
     * Checks if two rectangles overlap.
     *
     * @param x0
     *   Left of first rectangle
     * @param y0
     *   Left of first rectangle
     * @param width0
     *   Left of first rectangle
     * @param height0
     *   Left of first rectangle
     * @param x1
     *   Left of second rectangle
     * @param y1
     *   Left of second rectangle
     * @param width1
     *   Left of second rectangle
     * @param height1
     *   Left of second rectangle
     *
     * @returns {boolean} True if two rectangles overlap
     */
    static isOverlapping(x0, y0, width0, height0, x1, y1, width1, height1) {
        // just check if minimum value in one direction is equal or larger than the maximum value in that direction
        return !((x0 >= x1 + width1) ||
            (x1 >= x0 + width0) ||
            (y0 >= y1 + height1) ||
            (y1 >= y0 + height0));
    }
    /**
     * Checks if a value is a number.
     *
     * Copy from:
     * https://github.com/ReactiveX/rxjs/blob/master/src/internal/util/isNumeric.ts
     *
     * @param value
     *   Value to check
     *
     * @returns true if value is a valid, otherwise false
     */
    static isNumeric(value) {
        // parseFloat NaNs numeric-cast false positives (null|true|false|"")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        // adding 1 corrects loss of precision from parseFloat (#15100)
        return !Array.isArray(value) && (value - parseFloat(value) + 1) >= 0;
    }
    /**
     * Checks if a value is a valid number, if not return a default value instead.
     *
     * @param value
     *   Value to check
     * @param defaultNumber
     *   Default value to use if aValue is not a valid number
     *
     * @returns either aValue as a number or aDefault
     */
    static getNumber(value, defaultNumber) {
        return this.isNumeric(value) ? value : defaultNumber;
    }
    /**
     * Performs a logical xor on two values.
     *
     * Reference: {@link http://www.howtocreate.co.uk/xor.html}
     *
     * @param value0
     *   First value
     * @param value1
     *   Second value
     * @returns `True` if either aValue0 or aValue1 evaluates to a truthy but not both;
     *   otherwise `false` if both values evaluate to a truthy or falsy.
     */
    static xor(value0, value1) {
        // use !! to make sure with two falsy values, the result is still a boolean
        return !!((value0 || value1) && !(value0 && value1));
    }
}
// endregion
// region static private variables
/**
 * See property definitions
 *
 * @private
 */
UFMath.s_angleUnit = UFAngleUnit.degrees;
// endregion
//# sourceMappingURL=UFMath.js.map
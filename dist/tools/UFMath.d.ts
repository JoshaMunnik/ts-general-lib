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
 * Possible angle units
 */
export declare enum UFAngleUnit {
    degrees = 0,
    radians = 1
}
/**
 * {@link UFMath} implements methods supporting numbers.
 */
export declare class UFMath {
    /**
     * Utility class with only static methods, do not allow instances.
     *
     * @private
     */
    private constructor();
    /**
     * See property definitions
     *
     * @private
     */
    private static s_angleUnit;
    /**
     * Determines how to treat angle parameters or which unit to use when returning angles.
     */
    static get angleUnit(): UFAngleUnit;
    static set angleUnit(value: UFAngleUnit);
    /**
     * Convert angle to radians, use angleUnit to determine unit of input parameter.
     *
     * @param anAngle
     *   Angle to convert
     *
     * @returns Converted angle.
     */
    static toRadians(anAngle: number): number;
    /**
     * Convert angle from radians to unit as specified by m_angleUnit
     *
     * @param anAngle
     *   Angle to convert
     *
     * @returns Converted angle.
     */
    static fromRadians(anAngle: number): number;
    /**
     * Rotates a 2D coordinate around a certain point.
     *
     * @param anAngle
     *   Angle
     * @param aX
     *   X coordinate of point to rotate
     * @param aY
     *   Y coordinate of point to rotate
     * @param anOriginX
     *   X coordinate of point to rotate around
     * @param anOriginY
     *   Y coordinate of point to rotate around
     *
     * @returns {{x,y}} An object with x and y property.
     */
    static rotate(anAngle: number, aX: number, aY: number, anOriginX?: number, anOriginY?: number): {
        x: number;
        y: number;
    };
    /**
     * Calculates the angle between two points
     *
     * @param aX1
     *  First X coordinate of point
     * @param aY1
     *  First Y coordinate of point
     * @param aX2
     *  Second X coordinate of point
     * @param aY2
     *  Second Y coordinate of point
     *
     * @returns Angle in degrees (0..360)
     */
    static angle(aX1: number, aY1: number, aX2: number, aY2: number): number;
    /**
     * Calculates distance between two points.
     *
     * @param aX1
     *  First X coordinate of point
     * @param aY1
     *  First Y coordinate of point
     * @param aX2
     *  Second X coordinate of point
     * @param aY2
     *  Second Y coordinate of point
     *
     * @returns Distance between two points
     */
    static distance(aX1: number, aY1: number, aX2: number, aY2: number): number;
    /**
     * Returns a random integer.
     *
     * @param aMinOrMax
     *   Minimal or maximum value (if aMax is not specified)
     * @param aMax
     *   Maximal value
     *
     * @return {number} random integer between aMin and aMax (inclusive)
     */
    static randomInteger(aMinOrMax: number, aMax?: number): number;
    /**
     * Increases or decreases value, so it gets nearer to a target value.
     *
     * @param aTarget
     *   Value to reach
     * @param aCurrent
     *   Current value
     * @param aStepSize
     *   Value to move with
     *
     * @returns aCurrent +/- aStep or aTarget if aCurrent was closer to aTarget then aStep distance
     */
    static moveTo(aTarget: number, aCurrent: number, aStepSize: number): number;
    /**
     * Calculates a position based on movement over time. The method makes sure the returned value is between the
     * specified target and starting values.
     *
     * @param aTarget
     *   Target to move to
     * @param aStart
     *   Starting position moving from
     * @param aCurrentTime
     *   Current time
     * @param aTotalTime
     *   Total time movement should take place
     * @returns value between aStart and aTarget (both inclusive)
     */
    static moveOverTime(aTarget: number, aStart: number, aCurrentTime: number, aTotalTime: number): number;
    /**
     * Makes sure a value is within a range.
     *
     * @param aMin
     *   Minimum value
     * @param aMax
     *   Maximum value
     * @param aValue
     *   Value to test
     *
     * @returns aValue if it is within range or aMin or aMax
     */
    static minmax(aMin: number, aMax: number, aValue: number): number;
    /**
     * Checks if two rectangles overlap.
     *
     * @param aX0
     *   Left of first rectangle
     * @param aY0
     *   Left of first rectangle
     * @param aWidth0
     *   Left of first rectangle
     * @param anHeight0
     *   Left of first rectangle
     * @param aX1
     *   Left of second rectangle
     * @param aY1
     *   Left of second rectangle
     * @param aWidth1
     *   Left of second rectangle
     * @param anHeight1
     *   Left of second rectangle
     *
     * @returns {boolean} True if two rectangles overlap
     */
    static isOverlapping(aX0: number, aY0: number, aWidth0: number, anHeight0: number, aX1: number, aY1: number, aWidth1: number, anHeight1: number): boolean;
    /**
     * Checks if a value is a number.
     *
     * Copy from:
     * https://github.com/ReactiveX/rxjs/blob/master/src/internal/util/isNumeric.ts
     *
     * @param aValue
     *   Value to check
     *
     * @returns true if value is a valid, otherwise false
     */
    static isNumeric(aValue: any): aValue is number | string;
    /**
     * Checks if a value is a valid number, if not return a default value instead.
     *
     * @param aValue
     *   Value to check
     * @param aDefault
     *   Default value to use if aValue is not a valid number
     *
     * @returns either aValue as a number or aDefault
     */
    static getNumber(aValue: any, aDefault: number): number;
}

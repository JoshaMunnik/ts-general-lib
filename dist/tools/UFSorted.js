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
// endregion
// region types
/**
 * {@link UFSorted} implements various static support methods for {@link IUFSorted}.
 */
export class UFSorted {
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
     * Either sort an array or dictionary.
     *
     * @param aData
     *   Object or array.
     *
     * @returns sorted values
     */
    static sort(aData) {
        return UFSorted.getValues(aData).sort((item0, item1) => item0.sortOrder - item1.sortOrder);
    }
    /**
     * Gets the maximum {@link IUFSorted.sortOrder} value.
     *
     * @param aData
     *   Data to process
     *
     * @returns {number} maximum value or Number.MIN_VALUE if none was found.
     */
    static getMax(aData) {
        const list = UFSorted.getValues(aData);
        return list.reduce((previous, current) => Math.max(previous, current.sortOrder), Number.MIN_VALUE);
    }
    /**
     * Gets the minimum {@link IUFSorted.sortOrder} value.
     *
     * @param aData
     *   Data to process
     *
     * @returns {number} minimum value or Number.MAX_VALUE if none was found.
     */
    static getMin(aData) {
        const list = UFSorted.getValues(aData);
        return list.reduce((previous, current) => Math.min(previous, current.sortOrder), Number.MAX_VALUE);
    }
    // endregion
    // region private methods
    /**
     * Gets the values of a collection as an array.
     * @param aData
     *   Data to get values from
     *
     * @returns list of values
     */
    static getValues(aData) {
        if (Array.isArray(aData)) {
            return aData;
        }
        if (aData instanceof Set) {
            return Array.from(aData);
        }
        if (aData instanceof Map) {
            return Array.from(aData.values());
        }
        return Object.values(aData);
    }
}
// endregion
//# sourceMappingURL=UFSorted.js.map
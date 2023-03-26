import { UFObject } from "./UFObject";
export class UFProgressTools {
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
     * Checks if the object has a {@link IUFWeightedProgress.progressWeight} property and return the value; else return
     * a default value.
     *
     * @param anObject
     * @param aDefault
     */
    static getProgressWeight(anObject, aDefault = 1.0) {
        return UFObject.getAs(anObject, 'progressWeight', aDefault);
    }
    /**
     * Checks if the object has a {@link IUFProgress.progress} property and return the value; else return
     * a default value.
     *
     * @param anObject
     * @param aDefault
     */
    static getProgress(anObject, aDefault = 0.0) {
        return UFObject.getAs(anObject, 'progress', aDefault);
    }
}
//# sourceMappingURL=UFProgressTools.js.map
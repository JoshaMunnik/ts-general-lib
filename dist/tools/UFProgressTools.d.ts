export declare class UFProgressTools {
    /**
     * Utility class with only static methods, do not allow instances.
     *
     * @private
     */
    private constructor();
    /**
     * Checks if the object has a {@link IUFWeightedProgress.progressWeight} property and return the value; else return
     * a default value.
     *
     * @param anObject
     * @param aDefault
     */
    static getProgressWeight(anObject: object, aDefault?: number): number;
    /**
     * Checks if the object has a {@link IUFProgress.progress} property and return the value; else return
     * a default value.
     *
     * @param anObject
     * @param aDefault
     */
    static getProgress(anObject: object, aDefault?: number): number;
}

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
import { UFValidators } from "../tools/UFValidators.js";
import { UFMapOfSet } from "../data/UFMapOfSet.js";
// endregion
// region private types
/**
 * Internal class, contains property meta data.
 *
 * @private
 */
class PropertyMetaData {
    constructor() {
        this.validators = [];
    }
}
/**
 * {@link UFModel} implements {@link IUFModel} and adds support change events and dirty state.
 */
export class UFModel {
    constructor() {
        // region private variables
        /**
         * Current lock count
         *
         * @private
         */
        this.m_lockCount = 0;
        /**
         * List of property names that have changed while model has been locked.
         *
         * @private
         */
        this.m_changedList = new Set();
        /**
         * List of property names that have changed since last call to {@link clearDirty}.
         *
         * @private
         */
        this.m_dirtyList = new Set();
        /**
         * Registered change listeners
         *
         * @private
         */
        this.m_listeners = new Set();
        /**
         * An object containing a meta data object for property names.
         *
         * @private
         */
        this.m_propertyMetaData = {};
        /**
         * Registered property change listeners
         *
         * @private
         */
        this.m_propertyListeners = new UFMapOfSet();
        // endregion
    }
    // endregion
    // region public methods
    /**
     * Locks the model instance, preventing changed events from being fired. An internal lock counter
     * is kept; so the number of {@link lock} and {@link unlock} calls must match
     * before the model instance is fully unlocked.
     *
     * @return current lock count
     */
    lock() {
        this.m_lockCount++;
        return this.m_lockCount;
    }
    /**
     * Unlocks the model instance. If a call matches the first call to {@link lock}, call
     * {@link onPropertiesChanged} if there are any pending changes.
     *
     * @return current lock count
     */
    unlock() {
        this.m_lockCount--;
        if ((this.m_lockCount === 0) && (this.m_changedList.size > 0)) {
            // make copy
            const list = Array.from(this.m_changedList);
            // clear list
            this.m_changedList.clear();
            // call callback
            this.onPropertiesChanged(list);
        }
        return this.m_lockCount;
    }
    /**
     * Adds a listener for data changes. If the listener was already added, nothing happens.
     *
     * @param aCallback
     *   Callback to add
     *
     * @return a function that can be called to remove the listener. It just
     * calls {@link removeChangeListener} with aCallback.
     */
    addChangeListener(aCallback) {
        this.m_listeners.add(aCallback);
        return () => this.removeChangeListener(aCallback);
    }
    /**
     * Removes a listener for data changes.
     *
     * @param aCallback
     *   Callback to remove
     */
    removeChangeListener(aCallback) {
        this.m_listeners.delete(aCallback);
    }
    /**
     * Adds a listener for changes to a certain property. If the listener was already added for
     * the property, nothing happens.
     *
     * @param aProperty
     *   Name of property
     * @param aListener
     *   Callback function to call when property changes value
     *
     * @return a function that can be called to remove the listener. It just calls
     * {@link removePropertyChangeListener} with aProperty and aListener.
     */
    addPropertyChangeListener(aProperty, aListener) {
        this.m_propertyListeners.add(aProperty, aListener);
        return () => this.removePropertyChangeListener(aProperty, aListener);
    }
    /**
     * Removes a listener for changes to a certain property.
     *
     * @param aProperty
     *   Name of property
     * @param aListener
     *   Listener to remove
     */
    removePropertyChangeListener(aProperty, aListener) {
        this.m_propertyListeners.remove(aProperty, aListener);
    }
    /**
     * Checks if there are changed properties. This method only is useful while the data is locked.
     * Else the method will always return false.
     *
     * @returns true if there is a changed property.
     */
    hasChanged() {
        return this.m_changedList.size > 0;
    }
    /**
     * Checks if there are dirty properties.
     *
     * @returns true if there is a dirty property.
     */
    isDirty() {
        return this.m_dirtyList.size > 0;
    }
    /**
     * Gets all dirty properties.
     *
     * @returns a list of dirty property names.
     */
    getDirtyProperties() {
        return Array.from(this.m_dirtyList);
    }
    /**
     * Clears the dirty state.
     */
    clearDirty() {
        this.m_dirtyList.clear();
    }
    // endregion
    // region IUFModel
    /**
     * @inheritDoc
     */
    isValidPropertyValue(aPropertyName, aValue) {
        // make sure metadata exists before using it (to prevent creation of unnecessary data)
        if (this.hasPropertyMetaData(aPropertyName)) {
            return this.getPropertyMetaData(aPropertyName).validators.every(validator => UFValidators.isValidProperty(this, aPropertyName, validator, aValue));
        }
        // no metadata, so no validators were registered, so the value is always valid
        return true;
    }
    /**
     * Gets a value of a property. The method checks if the property is a function.
     * If it is, the method returns the result of a call to that function. Else the method just
     * returns the value.
     *
     * @param aName
     *   Name of property
     *
     * @returns Value of property
     */
    getPropertyValue(aName) {
        // @ts-ignore
        return typeof this[aName] === 'function' ? this[aName]() : this[aName];
    }
    /**
     * Sets a property to a value. The method checks if the property is a function. If it is, the
     * method will call the function passing the value as parameter. Else the method will assign the
     * value directly and call {@link changed}.
     *
     * @param aName
     *   Property name
     * @param aValue
     *   Value to assign
     */
    setPropertyValue(aName, aValue) {
        // @ts-ignore
        if (typeof this[aName] === 'function') {
            // @ts-ignore
            this[aName](aValue);
        }
        // @ts-ignore
        else if (this[aName] !== aValue) {
            // lock in case aName is a property and the setter also calls changed
            this.lock();
            // @ts-ignore
            this[aName] = aValue;
            this.changed(aName);
            this.unlock();
        }
    }
    // endregion
    // region protected methods
    /**
     * Processes a possible property assignment. If aNewValue is not undefined, compare it to the
     * current value and when not equal call {@link changed} for the property.
     *
     * When anEqualFunction is not defined, the method uses ===.
     *
     * The aTransformFunction can be used for example to keep a value within a certain range.
     *
     * @protected
     *
     * @param aName
     *   Property name
     * @param aCurrentValue
     *   Current value of the property
     * @param aNewValue
     *   New value of the property or undefined if no new value needs to be set
     * @param aSetterFunction
     *   Function that is called to set the new changed value (if any)
     * @param [aTransformFunction]
     *   Function to transform aNewValue with before comparing and assigning it
     * @param [anEqualFunction]
     *   Custom compare function that should return true if objects are equal. When null, the method
     *   uses === to compare the values.
     *
     * @returns the current or new property value
     */
    processPropertyValue(aName, aCurrentValue, aNewValue, aSetterFunction, aTransformFunction, anEqualFunction) {
        if (typeof aNewValue !== 'undefined') {
            if (aTransformFunction) {
                aNewValue = aTransformFunction(aNewValue);
            }
            const equal = anEqualFunction
                ? anEqualFunction(aCurrentValue, aNewValue)
                : aCurrentValue === aNewValue;
            if (!equal) {
                aSetterFunction(aNewValue);
                this.changed(aName);
                return aNewValue;
            }
        }
        return aCurrentValue;
    }
    /**
     * Adds a validator for a certain property.
     *
     * @param aPropertyName
     *   Property name
     * @param aValidator
     *   A validator for a value or property
     */
    addValidation(aPropertyName, aValidator) {
        this.getPropertyMetaData(aPropertyName).validators.push(aValidator);
    }
    /**
     * This method can be called when a property changes value. If the instance is locked
     * via {@link lock} the names are stored. Else the {@link onPropertiesChanged} method is
     * called with the list of names.
     *
     * The function accepts a variable number of name parameters
     *
     * @param aNames
     *   One or more property names that changed
     */
    changed(...aNames) {
        aNames.forEach(name => this.m_dirtyList.add(name));
        if (this.m_lockCount > 0) {
            aNames.forEach(name => this.m_changedList.add(name));
        }
        else {
            this.onPropertiesChanged(aNames);
        }
    }
    /**
     * This method is called whenever changed is called or the data structure is unlocked and there
     * are changed properties.
     *
     * The default implementation invokes all the registered listeners. Subclasses can override this
     * method to take additional actions.
     *
     * @param aList
     *   List of property names
     */
    onPropertiesChanged(aList) {
        const changeListeners = [...this.m_listeners];
        changeListeners.forEach(listener => listener(this, aList));
        aList.forEach(property => this.callPropertyListeners(property));
    }
    // endregion
    // region private methods
    /**
     * Gets metadata for property name. Creates a metadata record if none exists for the property.
     *
     * @param aPropertyName
     *   Name of property
     *
     * @returns Meta data
     *
     * @private
     */
    getPropertyMetaData(aPropertyName) {
        // get meta, create new meta if there is none yet
        const meta = this.m_propertyMetaData[aPropertyName] || new PropertyMetaData();
        this.m_propertyMetaData[aPropertyName] = meta;
        return meta;
    }
    /**
     * Checks if property has validation data.
     *
     * @param aPropertyName
     *   Name of property
     *
     * @return True when there is validation data for the property.
     *
     * @private
     */
    hasPropertyMetaData(aPropertyName) {
        return this.m_propertyMetaData.hasOwnProperty(aPropertyName);
    }
    /**
     * Calls the listeners for a certain property.
     *
     * @param aProperty
     *   Property to call listeners for
     *
     * @private
     */
    callPropertyListeners(aProperty) {
        const listeners = this.m_propertyListeners.get(aProperty);
        listeners.forEach(listener => listener(this, aProperty));
    }
}
// endregion
//# sourceMappingURL=UFModel.js.map
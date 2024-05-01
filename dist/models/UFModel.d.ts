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
import { IUFPropertyValidator, IUFValidateValue, IUFValueValidator } from "../tools/UFValidators.js";
import { IUFModel } from "./IUFModel.js";
import { UFCallback } from "../types/UFCallback";
/**
 * The function template that is called whenever one or more properties have changed value.
 *
 * @param sender
 *   Sender of 'event', the model instance with one or more changed properties.
 * @param properties
 *   The names of properties that changed.
 */
export type UFModelChangedCallback = (sender: UFModel, properties: string[]) => void;
/**
 * The function template that is called whenever a certain property has changed value.
 *
 * @param sender
 *  Sender of 'event', the model instance with the changed property.
 * @param property
 *   The name of the property that has changed.
 */
export type UFPropertyChangedCallback = (sender: UFModel, property: string) => void;
/**
 * {@link UFModel} implements {@link IUFModel} and adds support change events and dirty state.
 */
export declare class UFModel implements IUFModel {
    /**
     * Current lock count
     *
     * @private
     */
    private m_lockCount;
    /**
     * List of property names that have changed while model has been locked.
     *
     * @private
     */
    private readonly m_changedList;
    /**
     * List of property names that have changed since last call to {@link clearDirty}.
     *
     * @private
     */
    private readonly m_dirtyList;
    /**
     * Registered change listeners
     *
     * @private
     */
    private readonly m_listeners;
    /**
     * An object containing a meta data object for property names.
     *
     * @private
     */
    private m_propertyMetaData;
    /**
     * Registered property change listeners
     *
     * @private
     */
    private readonly m_propertyListeners;
    /**
     * Locks the model instance, preventing changed events from being fired. An internal lock counter
     * is kept; so the number of {@link lock} and {@link unlock} calls must match
     * before the model instance is fully unlocked.
     *
     * @return current lock count
     */
    lock(): number;
    /**
     * Unlocks the model instance. If a call matches the first call to {@link lock}, call
     * {@link onPropertiesChanged} if there are any pending changes.
     *
     * @return current lock count
     */
    unlock(): number;
    /**
     * Adds a listener for data changes. If the listener was already added, nothing happens.
     *
     * @param aCallback
     *   Callback to add
     *
     * @return a function that can be called to remove the listener. It just
     * calls {@link removeChangeListener} with aCallback.
     */
    addChangeListener(aCallback: UFModelChangedCallback): UFCallback;
    /**
     * Removes a listener for data changes.
     *
     * @param aCallback
     *   Callback to remove
     */
    removeChangeListener(aCallback: UFModelChangedCallback): void;
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
    addPropertyChangeListener(aProperty: string, aListener: UFPropertyChangedCallback): UFCallback;
    /**
     * Removes a listener for changes to a certain property.
     *
     * @param aProperty
     *   Name of property
     * @param aListener
     *   Listener to remove
     */
    removePropertyChangeListener(aProperty: string, aListener: UFPropertyChangedCallback): void;
    /**
     * Checks if there are changed properties. This method only is useful while the data is locked.
     * Else the method will always return false.
     *
     * @returns true if there is a changed property.
     */
    hasChanged(): boolean;
    /**
     * Checks if there are dirty properties.
     *
     * @returns true if there is a dirty property.
     */
    isDirty(): boolean;
    /**
     * Gets all dirty properties.
     *
     * @returns a list of dirty property names.
     */
    getDirtyProperties(): string[];
    /**
     * Clears the dirty state.
     */
    clearDirty(): void;
    /**
     * @inheritDoc
     */
    isValidPropertyValue(aPropertyName: string, aValue: any): boolean;
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
    getPropertyValue<T>(aName: string): T;
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
    setPropertyValue<T>(aName: string, aValue: T): void;
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
    protected processPropertyValue<T>(aName: string, aCurrentValue: T, aNewValue: T, aSetterFunction: (value: T) => void, aTransformFunction?: (value: T) => T, anEqualFunction?: (value0: T, value1: T) => boolean): T;
    /**
     * Adds a validator for a certain property.
     *
     * @param aPropertyName
     *   Property name
     * @param aValidator
     *   A validator for a value or property
     */
    protected addValidation(aPropertyName: string, aValidator: IUFValueValidator | IUFPropertyValidator | IUFValidateValue): void;
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
    protected changed(...aNames: string[]): void;
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
    protected onPropertiesChanged(aList: Array<string>): void;
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
    private getPropertyMetaData;
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
    private hasPropertyMetaData;
    /**
     * Calls the listeners for a certain property.
     *
     * @param aProperty
     *   Property to call listeners for
     *
     * @private
     */
    private callPropertyListeners;
}

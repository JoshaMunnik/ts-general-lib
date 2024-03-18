/**
 * @version 1
 * @author Josha Munnik
 * @copyright Copyright (c) 2019 Ultra Force Development
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
import { IUFPropertyValidator, IUFValidateValue, IUFValueValidator } from "../tools/UFValidators.js";
import { IUFModel } from "./IUFModel.js";
/**
 * Function template a model change listener function must use
 */
export interface IUFModelChangeListener {
    /**
     * The function is called whenever one or more properties have changed value.
     *
     * @param sender
     *   Sender of 'event', the model instance with one or more changed properties.
     * @param properties
     *   The names of properties that changed.
     */
    (sender: UFModel, properties: string[]): void;
}
/**
 * Function template a property change listener function must use
 */
export interface IUFPropertyChangeListener {
    /**
     * The function is called whenever a certain property has changed value.
     *
     * @param sender
     *  Sender of 'event', the model instance with the changed property.
     * @param property
     *   The name of the property that has changed.
     */
    (sender: UFModel, property: string): void;
}
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
     * Locks the model instance, preventing changed events from being fired. An internal lock counter is
     * kept; so the number of lock and unlock calls must match before the model instance is
     * fully unlocked.
     *
     * @return current lock count
     */
    lock(): number;
    /**
     * Unlocks the model instance. If a call matches the first call to {@link lock} call
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
     */
    addChangeListener(aCallback: IUFModelChangeListener): void;
    /**
     * Removes a listener for data changes.
     *
     * @param aCallback
     *   Callback to remove
     */
    removeChangeListener(aCallback: IUFModelChangeListener): void;
    /**
     * Adds a listener for changes to a certain property. If the listener was already added for the property, nothing
     * happens.
     *
     * @param aProperty
     *   Name of property
     * @param aListener
     *   Callback function to call when property changes value
     */
    addPropertyChangeListener(aProperty: string, aListener: IUFPropertyChangeListener): void;
    /**
     * Removes a listener for changes to a certain property.
     *
     * @param aProperty
     *   Name of property
     * @param aListener
     *   Listener to remove
     */
    removePropertyChangeListener(aProperty: string, aListener: IUFPropertyChangeListener): void;
    /**
     * Checks if there are changed properties. This method only is useful while the data is locked. Else the method
     * will always return false.
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
     * Gets a value of a property. The method checks if the property is a function. If it is, the method
     * returns the result of a call to that function. Else the method just returns the value.
     *
     * @param aName
     *   Name of property
     *
     * @returns Value of property
     */
    getPropertyValue<T>(aName: string): T;
    /**
     * Sets a property to a value. The method checks if the property is a function. If it is, the method
     * will call the function passing the value as parameter. Else the method will assign the value
     * directly and call {@link changed}.
     *
     * @param aName
     *   Property name
     * @param aValue
     *   Value to assign
     */
    setPropertyValue<T>(aName: string, aValue: T): void;
    /**
     * Processes a possible property assignment. If aNewValue is not undefined, compare it to the current
     * value and when not equal call {@link changed} for the property.
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
     * This method can be called when a property changes value. If the instance is locked via {@link lock} the names are
     * stored. Else the {@link onPropertiesChanged} method is called with the list of names.
     *
     * The function accepts a variable number of name parameters
     *
     * @param aNames
     *   One or more property names that changed
     */
    protected changed(...aNames: string[]): void;
    /**
     * This method is called whenever changed is called or the data structure is unlocked and there are
     * changed properties.
     *
     * The default implementation invokes all the registered listeners. Subclasses can override this method to
     * take additional actions.
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

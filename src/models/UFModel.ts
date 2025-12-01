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

import {
  IUFPropertyValidator,
  IUFValidateValue,
  IUFValueValidator,
  UFValidators
} from "../tools/UFValidators.js";
import {IUFModel} from "./IUFModel.js";
import {UFMapOfSet} from "../data/UFMapOfSet.js";
import {UFCallback} from "../types/UFCallback.js";

// endregion

// region private types

/**
 * Internal class, contains property meta data.
 *
 * @private
 */
class PropertyMetaData {
  validators: Array<IUFValueValidator | IUFPropertyValidator | IUFValidateValue> = [];
}

// endregion

// region exports

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
export class UFModel implements IUFModel {
  // region type

  [key: string]: any;

  // endregion

  // region private variables

  /**
   * Current lock count
   *
   * @private
   */
  private m_lockCount: number = 0;

  /**
   * List of property names that have changed while model has been locked.
   *
   * @private
   */
  private readonly m_changedList: Set<string> = new Set();

  /**
   * List of property names that have changed since last call to {@link clearDirty}.
   *
   * @private
   */
  private readonly m_dirtyList: Set<string> = new Set();

  /**
   * Registered change listeners
   *
   * @private
   */
  private readonly m_listeners: Set<UFModelChangedCallback> = new Set();

  /**
   * An object containing a meta data object for property names.
   *
   * @private
   */
  private m_propertyMetaData: Record<string, PropertyMetaData> = {};

  /**
   * Registered property change listeners
   *
   * @private
   */
  private readonly m_propertyListeners: UFMapOfSet<string, UFPropertyChangedCallback> =
    new UFMapOfSet<string, UFPropertyChangedCallback>();

  // endregion

  // region public methods

  /**
   * Locks the model instance, preventing changed events from being fired. An internal lock counter
   * is kept; so the number of {@link lock} and {@link unlock} calls must match
   * before the model instance is fully unlocked.
   *
   * @return current lock count
   */
  lock(): number {
    this.m_lockCount++;
    return this.m_lockCount;
  }

  /**
   * Unlocks the model instance. If a call matches the first call to {@link lock}, call
   * {@link onPropertiesChanged} if there are any pending changes.
   *
   * @return current lock count
   */
  unlock(): number {
    this.m_lockCount--;
    if ((this.m_lockCount === 0) && (this.m_changedList.size > 0)) {
      // make copy
      const list: string[] = Array.from(this.m_changedList);
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
   * @param callback
   *   Callback to add
   *
   * @return a function that can be called to remove the listener. It just
   * calls {@link removeChangeListener} with aCallback.
   */
  addChangeListener(callback: UFModelChangedCallback): UFCallback {
    this.m_listeners.add(callback);
    return () => this.removeChangeListener(callback);
  }

  /**
   * Removes a listener for data changes.
   *
   * @param callback
   *   Callback to remove
   */
  removeChangeListener(callback: UFModelChangedCallback) {
    this.m_listeners.delete(callback);
  }

  /**
   * Adds a listener for changes to a certain property. If the listener was already added for
   * the property, nothing happens.
   *
   * @param property
   *   Name of property
   * @param listener
   *   Callback function to call when property changes value
   *
   * @return a function that can be called to remove the listener. It just calls
   * {@link removePropertyChangeListener} with aProperty and aListener.
   */
  public addPropertyChangeListener(
    property: string, listener: UFPropertyChangedCallback
  ): UFCallback {
    this.m_propertyListeners.add(property, listener);
    return () => this.removePropertyChangeListener(property, listener);
  }

  /**
   * Removes a listener for changes to a certain property.
   *
   * @param property
   *   Name of property
   * @param listener
   *   Listener to remove
   */
  public removePropertyChangeListener(
    property: string, listener: UFPropertyChangedCallback
  ): void {
    this.m_propertyListeners.remove(property, listener);
  }

  /**
   * Checks if there are changed properties. This method only is useful while the data is locked.
   * Else the method will always return false.
   *
   * @returns true if there is a changed property.
   */
  hasChanged(): boolean {
    return this.m_changedList.size > 0;
  }

  /**
   * Checks if there are dirty properties.
   *
   * @returns true if there is a dirty property.
   */
  isDirty(): boolean {
    return this.m_dirtyList.size > 0;
  }

  /**
   * Gets all dirty properties.
   *
   * @returns a list of dirty property names.
   */
  getDirtyProperties(): string[] {
    return Array.from(this.m_dirtyList);
  }

  /**
   * Clears the dirty state.
   */
  clearDirty(): void {
    this.m_dirtyList.clear();
  }

  // endregion

  // region IUFModel

  /**
   * @inheritDoc
   */
  isValidPropertyValue(propertyName: string, value: any): boolean {
    // make sure metadata exists before using it (to prevent creation of unnecessary data)
    if (this.hasPropertyMetaData(propertyName)) {
      return this.getPropertyMetaData(propertyName).validators.every(
        validator => UFValidators.isValidProperty(this, propertyName, validator, value)
      );
    }
    // no metadata, so no validators were registered, so the value is always valid
    return true;
  }

  /**
   * Gets a value of a property. The method checks if the property is a function.
   * If it is, the method returns the result of a call to that function. Else the method just
   * returns the value.
   *
   * @param name
   *   Name of property
   *
   * @returns Value of property
   */
  getPropertyValue<T>(name: string): T {
    return typeof this[name] === 'function' ? this[name]() : this[name];
  }

  /**
   * Sets a property to a value. The method checks if the property is a function. If it is, the
   * method will call the function passing the value as parameter. Else the method will assign the
   * value directly and call {@link changed}.
   *
   * @param name
   *   Property name
   * @param value
   *   Value to assign
   */
  setPropertyValue<T>(name: string, value: T): void {
    if (typeof this[name] === 'function') {
      this[name](value);
    }
    else if (this[name] !== value) {
      // lock in case aName is a property and the setter also calls changed
      this.lock();
      this[name] = value;
      this.changed(name);
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
   * @param name
   *   Property name
   * @param currentValue
   *   Current value of the property
   * @param newValue
   *   New value of the property or undefined if no new value needs to be set
   * @param setterFunction
   *   Function that is called to set the new changed value (if any)
   * @param [transformFunction]
   *   Function to transform aNewValue with before comparing and assigning it
   * @param [equalFunction]
   *   Custom compare function that should return true if objects are equal. When null, the method
   *   uses === to compare the values.
   *
   * @returns the current or new property value
   */
  protected processPropertyValue<T>(
    name: string,
    currentValue: T,
    newValue: T,
    setterFunction: (value: T) => void,
    transformFunction?: (value: T) => T,
    equalFunction?: (value0: T, value1: T) => boolean
  ): T {
    if (typeof newValue !== 'undefined') {
      if (transformFunction) {
        newValue = transformFunction(newValue);
      }
      const equal: boolean = equalFunction
        ? equalFunction(currentValue, newValue)
        : currentValue === newValue;
      if (!equal) {
        setterFunction(newValue);
        this.changed(name);
        return newValue;
      }
    }
    return currentValue;
  }

  /**
   * Adds a validator for a certain property.
   *
   * @param propertyName
   *   Property name
   * @param validator
   *   A validator for a value or property
   */
  protected addValidation(
    propertyName: string, validator: IUFValueValidator | IUFPropertyValidator | IUFValidateValue
  ) {
    this.getPropertyMetaData(propertyName).validators.push(validator);
  }

  /**
   * This method can be called when a property changes value. If the instance is locked
   * via {@link lock} the names are stored. Else the {@link onPropertiesChanged} method is
   * called with the list of names.
   *
   * The function accepts a variable number of name parameters
   *
   * @param names
   *   One or more property names that changed
   */
  protected changed(...names: string[]) {
    names.forEach(name => this.m_dirtyList.add(name));
    if (this.m_lockCount > 0) {
      names.forEach(name => this.m_changedList.add(name));
    }
    else {
      this.onPropertiesChanged(names);
    }
  }

  /**
   * This method is called whenever changed is called or the data structure is unlocked and there
   * are changed properties.
   *
   * The default implementation invokes all the registered listeners. Subclasses can override this
   * method to take additional actions.
   *
   * @param list
   *   List of property names
   */
  protected onPropertiesChanged(list: Array<string>) {
    const changeListeners: UFModelChangedCallback[] = [...this.m_listeners];
    changeListeners.forEach(listener => listener(this, list));
    list.forEach(property => this.callPropertyListeners(property));
  }

  // endregion

  // region private methods

  /**
   * Gets metadata for property name. Creates a metadata record if none exists for the property.
   *
   * @param propertyName
   *   Name of property
   *
   * @returns Meta data
   *
   * @private
   */
  private getPropertyMetaData(propertyName: string): PropertyMetaData {
    // get meta, create new meta if there is none yet
    const meta = this.m_propertyMetaData[propertyName] || new PropertyMetaData();
    this.m_propertyMetaData[propertyName] = meta;
    return meta;
  }

  /**
   * Checks if property has validation data.
   *
   * @param propertyName
   *   Name of property
   *
   * @return True when there is validation data for the property.
   *
   * @private
   */
  private hasPropertyMetaData(propertyName: string): boolean {
    return this.m_propertyMetaData.hasOwnProperty(propertyName);
  }

  /**
   * Calls the listeners for a certain property.
   *
   * @param property
   *   Property to call listeners for
   *
   * @private
   */
  private callPropertyListeners(property: string): void {
    const listeners: UFPropertyChangedCallback[] = this.m_propertyListeners.get(property);
    listeners.forEach(listener => listener(this, property));
  }

  // endregion
}

// endregion

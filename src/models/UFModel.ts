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
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

// region imports

import {IUFPropertyValidator, IUFValidateValue, IUFValueValidator, UFValidators} from "../tools/UFValidators";
import {IUFModel} from "./IUFModel";
import {UFMapOfSet} from "../data/UFMapOfSet";

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
  (sender: UFModel, properties: string[]): void
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
  (sender: UFModel, property: string): void
}

/**
 * {@link UFModel} implements {@link IUFModel} and adds support change events and dirty state.
 */
export class UFModel implements IUFModel {
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
  private readonly m_listeners: Set<IUFModelChangeListener> = new Set();

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
  private readonly m_propertyListeners: UFMapOfSet<string, IUFPropertyChangeListener> =
    new UFMapOfSet<string, IUFPropertyChangeListener>();

  // endregion
  
  // region public methods

  /**
   * Locks the model instance, preventing changed events from being fired. An internal lock counter is
   * kept; so the number of lock and unlock calls must match before the model instance is
   * fully unlocked.
   *
   * @return current lock count
   */
  lock(): number {
    this.m_lockCount++;
    return this.m_lockCount;
  }

  /**
   * Unlocks the model instance. If a call matches the first call to {@link lock} call
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
   * @param aCallback
   *   Callback to add
   */
  addChangeListener(aCallback: IUFModelChangeListener) {
    this.m_listeners.add(aCallback);
  }

  /**
   * Removes a listener for data changes.
   *
   * @param aCallback
   *   Callback to remove
   */
  removeChangeListener(aCallback: IUFModelChangeListener) {
    this.m_listeners.delete(aCallback);
  }

  /**
   * Adds a listener for changes to a certain property. If the listener was already added for the property, nothing
   * happens.
   *
   * @param aProperty
   *   Name of property
   * @param aListener
   *   Callback function to call when property changes value
   */
  public addPropertyChangeListener(aProperty: string, aListener: IUFPropertyChangeListener): void {
    this.m_propertyListeners.add(aProperty, aListener);
  }

  /**
   * Removes a listener for changes to a certain property.
   *
   * @param aProperty
   *   Name of property
   * @param aListener
   *   Listener to remove
   */
  public removePropertyChangeListener(aProperty: string, aListener: IUFPropertyChangeListener): void {
    this.m_propertyListeners.remove(aProperty, aListener);
  }

  /**
   * Checks if there are changed properties. This method only is useful while the data is locked. Else the method
   * will always return false.
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
  isValidPropertyValue(aPropertyName: string, aValue: any): boolean {
    // make sure metadata exists before using it (to prevent creation of unnecessary data)
    if (this.hasPropertyMetaData(aPropertyName)) {
      return this.getPropertyMetaData(aPropertyName).validators.every(
        validator => UFValidators.isValidProperty(this, aPropertyName, validator, aValue)
      );
    }
    // no metadata, so no validators were registered, so the value is always valid
    return true;
  }

  /**
   * Gets a value of a property. The method checks if the property is a function. If it is, the method
   * returns the result of a call to that function. Else the method just returns the value.
   *
   * @param aName
   *   Name of property
   *
   * @returns Value of property
   */
  getPropertyValue<T>(aName: string): T {
    // @ts-ignore
    return typeof this[aName] === 'function' ? this[aName]() : this[aName];
  }

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
  setPropertyValue<T>(aName: string, aValue: T): void {
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
  protected processPropertyValue<T>(
    aName: string,
    aCurrentValue: T,
    aNewValue: T,
    aSetterFunction: (value: T) => void,
    aTransformFunction?: (value: T) => T,
    anEqualFunction?: (value0: T, value1: T) => boolean
  ): T {
    if (typeof aNewValue !== 'undefined') {
      if (aTransformFunction) {
        aNewValue = aTransformFunction(aNewValue);
      }
      const equal: boolean = anEqualFunction
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
  protected addValidation(
    aPropertyName: string, aValidator: IUFValueValidator | IUFPropertyValidator | IUFValidateValue
  ) {
    this.getPropertyMetaData(aPropertyName).validators.push(aValidator);
  }

  /**
   * This method can be called when a property changes value. If the instance is locked via {@link lock} the names are
   * stored. Else the {@link onPropertiesChanged} method is called with the list of names.
   *
   * The function accepts a variable number of name parameters
   *
   * @param aNames
   *   One or more property names that changed
   */
  protected changed(...aNames: string[]) {
    aNames.forEach(name => this.m_dirtyList.add(name));
    if (this.m_lockCount > 0) {
      aNames.forEach(name => this.m_changedList.add(name));
    }
    else {
      this.onPropertiesChanged(aNames);
    }
  }

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
  protected onPropertiesChanged(aList: Array<string>) {
    const changeListeners: IUFModelChangeListener[] = [...this.m_listeners];
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
  private getPropertyMetaData(aPropertyName: string): PropertyMetaData {
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
  private hasPropertyMetaData(aPropertyName: string): boolean {
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
  private callPropertyListeners(aProperty: string): void {
    const listeners: IUFPropertyChangeListener[] = this.m_propertyListeners.get(aProperty);
    listeners.forEach(listener => listener(this, aProperty));
  }


  // endregion
}

// endregion

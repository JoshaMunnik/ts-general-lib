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

import {UFDynamicObject} from "../types/UFDynamicObject.js";

// endregion

// region types

/**
 * {@link IUFDatabase} defines the methods a database will implement.
 */
export interface IUFDatabase {
  /**
   * Execute a sql to get a single value as a certain type.
   *
   * @template T
   *
   * @param sql
   *   Sql statement to perform
   * @param parameterValues
   *   Values to use in case the statement contains parameters
   * @param defaultValue
   *   Default value to return if the sql statement did not have any results
   *
   * @return result from sql statement or aDefault
   */
  fieldAs<T>(sql: string, parameterValues: UFDynamicObject, defaultValue: T): Promise<T>;

  /**
   * Execute a sql to get a single value as a certain type. If no value can be found, the method
   * will throw an error.
   *
   * @template T
   *
   * @param sql
   *   Sql statement to perform
   * @param parameterValues
   *   Values to use in case the statement contains parameters
   *
   * @return result from sql statement
   *
   * @throws if no row (and thus field) can be found
   */
  fieldOrFailAs<T>(sql: string, parameterValues?: UFDynamicObject): Promise<T>;

  /**
   * Performs an insert and returns the id of the created record.
   *
   * @param sql
   *   Sql insert statement
   * @param parameterValues
   *   Values to use in case the statement contains parameters
   *
   * @return id of created record or 0 if there is no id.
   */
  insert(sql: string, parameterValues?: UFDynamicObject): Promise<number>;

  /**
   * Inserts a data from an object. The method creates an insert into statement using the property
   * names inside the object.
   *
   * The aData structure can contain a primary key property, when building the sql statement it
   * will be skipped. After the insert statement the generated id (if any) will be assigned to the
   * primary key field.
   *
   * @template T should be an object type not a class; since the method might create a new object
   *
   * @param table
   *   Name of table
   * @param data
   *   Data to insert (should be some form of object)
   * @param primaryKey
   *   Name of primary key field
   * @param ignoreFields
   *   Fields to ignore in aData
   *
   * @return Either aData if there is no primary key or a new object with values copied from aData
   * with the new primary key value.
   */
  insertObject<T extends object>(
    table: string, data: T, primaryKey?: string, ignoreFields?: string[]
  ): Promise<T>;

  /**
   * Execute a sql to get a row as a certain type.
   *
   * @template T
   *
   * @param sql
   *   Sql statement to perform
   * @param parameterValues
   *   Values to use in case the statement contains parameters
   *
   * @return result from sql statement; undefined when no row could be found
   */
  rowAs<T>(sql: string, parameterValues?: UFDynamicObject): Promise<T | undefined>;

  /**
   * Execute a sql to get a row as a certain type. If no row can be found, the method will throw an
   * error.
   *
   * @template T
   *
   * @param sql
   *   Sql statement to perform
   * @param parameterValues
   *   Values to use in case the statement contains parameters
   *
   * @return result from sql statement
   *
   * @throws error if no row can be found
   */
  rowOrFailAs<T>(sql: string, parameterValues?: UFDynamicObject): Promise<T>;

  /**
   * Execute a sql to get multiple rows as a certain type.
   *
   * @template T
   *
   * @param sql
   *   Sql statement to perform
   * @param parameterValues
   *   Values to use in case the statement contains parameters
   *
   * @return result from sql statement
   */
  rowsAs<T>(sql: string, parameterValues?: UFDynamicObject): Promise<T[]>;

  /**
   * Execute a function within a transaction.
   *
   * @param callback
   *   A function that will be called with await. It will be called with a single parameter, which
   *   can be used to communicate with the database. The parameter might be a different instance
   *   then the instance the transaction call originated from.
   *
   * @throws any exception that occurred while calling aCallback
   */
  transaction(callback: (database: IUFDatabase) => Promise<void>): Promise<void>;

  /**
   * Performs an update and returns the number of changed records.
   *
   * @param sql
   *   Sql update statement
   * @param parameterValues
   *   Values to use in case the statement contains parameters
   *
   * @return number of changed records.
   */
  update(sql: string, parameterValues?: UFDynamicObject): Promise<number>;

  /**
   * Updates a record in a table assuming it has a single primary key column.
   *
   * @template T
   *
   * @param table
   *   Name of table
   * @param primaryValue
   *   Primary key vale
   * @param data
   *   Object containing field names and their new values.
   * @param primaryKey
   *   Name of primary key
   * @param ignoreFields
   *   Fields to ignore in aData
   */
  updateObject<T extends object>(
    table: string, primaryValue: any, data: T, primaryKey?: string, ignoreFields?: string[]
  ): Promise<void>;


  /**
   * Performs a database delete and returns the number of deleted records.
   *
   * @param sql
   *   Sql delete statement
   * @param parameterValues
   *   Values to use in case the statement contains parameters
   *
   * @return number of deleted records.
   */
  delete(sql: string, parameterValues?: UFDynamicObject): Promise<number>;

  /**
   * Generates a unique code with {@link UFText.generateCode} to be used in some table.
   *
   * @param table
   *   Table to use unique code with
   * @param column
   *   Name of column in table that contains the unique code
   * @param length
   *   Number of characters the code should exist of
   *
   * @return an unique code
   */
  getUniqueCode(table: string, column: string, length: number): Promise<string>;
}

// endregion

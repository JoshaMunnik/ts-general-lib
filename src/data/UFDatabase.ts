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
import {UFText} from "../tools/UFText.js";
import {IUFDatabase} from "./IUFDatabase.js";

// endregion

// region types

/**
 * {@link UFDatabase} can act as a base class for database implementations.
 *
 * It supports named parameters in sql queries, using ':name' where name can be a combination of
 * letters, numbers and underscores.
 *
 * The parameter values are contained in a dynamic object, where the property names match the
 * named parameter.
 *
 * Subclasses can use {@link processSqlParameters} to convert the sql statement.
 *
 * The class defines several abstract methods subclasses must implement.
 *
 * @template TRow
 */
export abstract class UFDatabase<TRow> implements IUFDatabase {
  // region IUFDatabase

  /**
   * @inheritDoc
   */
  async fieldAs<T>(sql: string, parameterValues: UFDynamicObject, defaultValue: T): Promise<T> {
    return await this.field(sql, parameterValues, defaultValue) as T;
  }

  /**
   * @inheritDoc
   */
  async fieldOrFailAs<T>(sql: string, parameterValues?: UFDynamicObject): Promise<T> {
    const field = await this.field(sql, parameterValues);
    if (field === undefined) {
      throw new Error('no field for query');
    }
    return field as T;
  }

  /**
   * @inheritDoc
   */
  abstract insert(sql: string, parameterValues?: UFDynamicObject): Promise<number>;

  /**
   * @inheritDoc
   */
  async insertObject<T extends object>(
    table: string, data: T, primaryKey: string = 'id', ignoreFields: string[] = []
  ): Promise<T> {
    let columns = '';
    let values = '';
    const parameters: UFDynamicObject = {};
    Object.entries(data).forEach(([key, value]) => {
      if ((key !== primaryKey) && !ignoreFields.includes(key)) {
        columns = UFText.append(columns, key, ',');
        values = UFText.append(values, ':' + key, ',');
        parameters[key] = value;
      }
    });
    const id = await this.insert(
      `insert into ${table} (${columns}) values (${values})`, parameters
    );
    if (id > 0) {
      return {
        ...data,
        [primaryKey]: id
      };
    }
    return data;
  }

  /**
   * @inheritDoc
   */
  async rowAs<T>(sql: string, parameterValues?: UFDynamicObject): Promise<T | undefined> {
    const result = await this.row(sql, parameterValues);
    return result == undefined ? undefined : this.convertRow<T>(result as TRow);
  }

  /**
   * @inheritDoc
   */
  async rowOrFailAs<T>(sql: string, parameterValues?: UFDynamicObject): Promise<T> {
    const row = await this.rowAs<T>(sql, parameterValues);
    if (row == undefined) {
      throw new Error('no row for query ' + sql + ' ' + JSON.stringify(parameterValues));
    }
    return row;
  }

  /**
   * @inheritDoc
   */
  async rowsAs<T>(sql: string, parameterValues?: UFDynamicObject): Promise<T[]> {
    const result = await this.rows(sql, parameterValues);
    return result.map(row => this.convertRow<T>(row));
  }

  /**
   * @inheritDoc
   */
  abstract transaction(callback: (database: IUFDatabase) => Promise<void>): Promise<void>;

  /**
   * @inheritDoc
   */
  abstract update(sql: string, parameterValues?: UFDynamicObject): Promise<number>;

  /**
   * @inheritDoc
   */
  async updateObject<T extends object>(
    table: string, primaryValue: any, data: T,
    primaryKey: string = 'id', ignoreFields: string[] = []
  ): Promise<void> {
    let fields = '';
    const parameters: UFDynamicObject = {};
    Object.entries(data).forEach(([key, value]) => {
      if ((key !== primaryKey) && !ignoreFields.includes(key)) {
        fields = UFText.append(fields, key + '=' + ':' + key, ',');
        parameters[key] = value;
      }
    });
    if (fields.length) {
      const sql = 'update ' + table + ' set ' + fields + ' where ' + primaryKey + ' = :' + primaryKey;
      parameters[primaryKey] = primaryValue;
      await this.update(sql, parameters);
    }
  }

  /**
   * @inheritDoc
   */
  async delete(sql: string, parameterValues?: UFDynamicObject): Promise<number> {
    // The default implementation calls update assuming it is handled in the same way by the database
    // implementation.
    return await this.update(sql, parameterValues);
  }

  /**
   * @inheritDoc
   */
  async getUniqueCode(table: string, column: string, length: number): Promise<string> {
    while (true) {
      const values = {
        code: UFText.generateCode(length)
      }
      if (await this.fieldAs<number>(`select count(*) from ${table} where ${column} = :code`, values, 0) === 0) {
        return values.code;
      }
    }
  }

  // endregion

  // region protected methods

  /**
   * Execute a sql to get a single value.
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
  protected abstract field(sql: string, parameterValues?: UFDynamicObject, defaultValue?: any): Promise<any>;

  /**
   * Execute a sql to get a row.
   *
   * @param sql
   *   Sql statement to perform
   * @param parameterValues
   *   Values to use in case the statement contains parameters
   *
   * @return result from sql statement; undefined when no row could be found
   */
  protected abstract row(sql: string, parameterValues?: UFDynamicObject): Promise<TRow | undefined>;

  /**
   * Execute a sql to get multiple rows.
   *
   * @param sql
   *   Sql statement to perform
   * @param parameterValues
   *   Values to use in case the statement contains parameters
   *
   * @return Result from sql statement
   */
  protected abstract rows(sql: string, parameterValues?: UFDynamicObject): Promise<TRow[]>;

  /**
   * Converts a row from database type to an external type. The default implementation just uses a
   * typecast.
   *
   * @template T
   * @template TRow
   *
   * @param row
   *   Row to convert.
   *
   * @return The data from aRow as new type.
   */
  protected convertRow<T>(row: TRow): T {
    return row as unknown as T;
  }

  /**
   * Processes a sql with named parameters and replaces the named parameters with values returned by the callback.
   *
   * @param sql
   *   Sql statement to process.
   * @param parameterValues
   *   An object that contains properties whose name match the named parameters
   * @param callback
   *   This callback is invoked for every found named parameter. The result will be used to replace the named parameter.
   *
   * @return an updated SQL statement
   */
  protected processSqlParameters(
    sql: string, parameterValues: UFDynamicObject, callback: (name: string, value: any) => string
  ): string {
    const matches = sql.matchAll(/(:[\w\d_]+)/g);
    let start = 0;
    let result = '';
    // @ts-ignore
    for (const match of matches) {
      if (match.index != undefined) {
        const currentName = match[0].substring(1);
        const newName = callback(currentName, parameterValues[currentName]);
        result += sql.substring(start, match.index);
        result += newName;
        start = match.index + match[0].length;
      }
    }
    result += sql.substring(start);
    return result;
  }

  // endregion
}

// endregion

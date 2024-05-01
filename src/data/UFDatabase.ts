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

import {UFDynamicObject} from "../types/UFDynamicObject";
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
  async fieldAs<T>(aSql: string, aParameterValues: UFDynamicObject, aDefault: T): Promise<T> {
    return await this.field(aSql, aParameterValues, aDefault) as T;
  }

  /**
   * @inheritDoc
   */
  async fieldOrFailAs<T>(aSql: string, aParameterValues?: UFDynamicObject): Promise<T> {
    const field = await this.field(aSql, aParameterValues);
    if (field === undefined) {
      throw new Error('no field for query');
    }
    return field as T;
  }

  /**
   * @inheritDoc
   */
  abstract insert(aSql: string, aParameterValues?: UFDynamicObject): Promise<number>;

  /**
   * @inheritDoc
   */
  async insertObject<T extends object>(
    aTable: string, aData: T, aPrimaryKey: string = 'id', anIgnoreFields: string[] = []
  ): Promise<T> {
    let columns = '';
    let values = '';
    const data: UFDynamicObject = {};
    Object.entries(aData).forEach(([key, value]) => {
      if ((key !== aPrimaryKey) && !anIgnoreFields.includes(key)) {
        columns = UFText.append(columns, key, ',');
        values = UFText.append(values, ':' + key, ',');
        data[key] = value;
      }
    });
    const id = await this.insert(
      `insert into ${aTable} (${columns}) values (${values})`, data
    );
    if (id > 0) {
      return {
        ...aData,
        [aPrimaryKey]: id
      };
    }
    return aData;
  }

  /**
   * @inheritDoc
   */
  async rowAs<T>(aSql: string, aParameterValues?: UFDynamicObject): Promise<T | undefined> {
    const result = await this.row(aSql, aParameterValues);
    return result == undefined ? undefined : this.convertRow<T>(result as TRow);
  }

  /**
   * @inheritDoc
   */
  async rowOrFailAs<T>(aSql: string, aParameterValues?: UFDynamicObject): Promise<T> {
    const row = await this.rowAs<T>(aSql, aParameterValues);
    if (row == undefined) {
      throw new Error('no row for query ' + aSql + ' ' + JSON.stringify(aParameterValues));
    }
    return row;
  }

  /**
   * @inheritDoc
   */
  async rowsAs<T>(aSql: string, aParameterValues?: UFDynamicObject): Promise<T[]> {
    const result = await this.rows(aSql, aParameterValues);
    return result.map(row => this.convertRow<T>(row));
  }

  /**
   * @inheritDoc
   */
  abstract transaction(aCallback: (aDatabase: IUFDatabase) => Promise<void>): Promise<void>;

  /**
   * @inheritDoc
   */
  abstract update(aSql: string, aParameterValues?: UFDynamicObject): Promise<number>;

  /**
   * @inheritDoc
   */
  async updateObject<T extends object>(
    aTable: string, aPrimaryValue: any, aData: T,
    aPrimaryKey: string = 'id', anIgnoreFields: string[] = []
  ): Promise<void> {
    let fields = '';
    const data: UFDynamicObject = {};
    Object.entries(aData).forEach(([key, value]) => {
      if ((key !== aPrimaryKey) && !anIgnoreFields.includes(key)) {
        fields = UFText.append(fields, key + '=' + ':' + key, ',');
        data[key] = value;
      }
    });
    if (fields.length) {
      const sql = 'update ' + aTable + ' set ' + fields + ' where ' + aPrimaryKey + ' = :' + aPrimaryKey;
      data[aPrimaryKey] = aPrimaryValue;
      await this.update(sql, data);
    }
  }

  /**
   * @inheritDoc
   */
  async delete(aSql: string, aParameterValues?: UFDynamicObject): Promise<number> {
    // The default implementation calls update assuming it is handled in the same way by the database
    // implementation.
    return await this.update(aSql, aParameterValues);
  }

  /**
   * @inheritDoc
   */
  async getUniqueCode(aTable: string, aColumn: string, aLength: number): Promise<string> {
    while (true) {
      const values = {
        code: UFText.generateCode(aLength)
      }
      if (await this.fieldAs<number>(`select count(*) from ${aTable} where ${aColumn} = :code`, values, 0) === 0) {
        return values.code;
      }
    }
  }

  // endregion

  // region protected methods

  /**
   * Execute a sql to get a single value.
   *
   * @param aSql
   *   Sql statement to perform
   * @param aParameterValues
   *   Values to use in case the statement contains parameters
   * @param aDefault
   *   Default value to return if the sql statement did not have any results
   *
   * @return result from sql statement or aDefault
   */
  protected abstract field(aSql: string, aParameterValues?: UFDynamicObject, aDefault?: any): Promise<any>;

  /**
   * Execute a sql to get a row.
   *
   * @param aSql
   *   Sql statement to perform
   * @param aParameterValues
   *   Values to use in case the statement contains parameters
   *
   * @return result from sql statement; undefined when no row could be found
   */
  protected abstract row(aSql: string, aParameterValues?: UFDynamicObject): Promise<TRow | undefined>;

  /**
   * Execute a sql to get multiple rows.
   *
   * @param aSql
   *   Sql statement to perform
   * @param aParameterValues
   *   Values to use in case the statement contains parameters
   *
   * @return Result from sql statement
   */
  protected abstract rows(aSql: string, aParameterValues?: UFDynamicObject): Promise<TRow[]>;

  /**
   * Converts a row from database type to an external type. The default implementation just uses a
   * typecast.
   *
   * @template T
   * @template TRow
   *
   * @param aRow
   *   Row to convert.
   *
   * @return The data from aRow as new type.
   */
  protected convertRow<T>(aRow: TRow): T {
    return aRow as unknown as T;
  }

  /**
   * Processes a sql with named parameters and replaces the named parameters with values returned by the callback.
   *
   * @param aSql
   *   Sql statement to process.
   * @param aParameterValues
   *   An object that contains properties whose name match the named parameters
   * @param aCallback
   *   This callback is invoked for every found named parameter. The result will be used to replace the named parameter.
   *
   * @return an updated SQL statement
   */
  protected processSqlParameters(
    aSql: string, aParameterValues: UFDynamicObject, aCallback: (aName: string, aValue: any) => string
  ): string {
    const matches = aSql.matchAll(/(:[\w\d_]+)/g);
    let start = 0;
    let result = '';
    // @ts-ignore
    for (const match of matches) {
      if (match.index != undefined) {
        const currentName = match[0].substring(1);
        const newName = aCallback(currentName, aParameterValues[currentName]);
        result += aSql.substring(start, match.index);
        result += newName;
        start = match.index + match[0].length;
      }
    }
    result += aSql.substring(start);
    return result;
  }

  // endregion
}

// endregion

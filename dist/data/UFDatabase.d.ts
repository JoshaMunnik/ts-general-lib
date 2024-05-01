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
import { UFDynamicObject } from "../types/UFDynamicObject";
import { IUFDatabase } from "./IUFDatabase.js";
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
export declare abstract class UFDatabase<TRow> implements IUFDatabase {
    /**
     * @inheritDoc
     */
    fieldAs<T>(aSql: string, aParameterValues: UFDynamicObject, aDefault: T): Promise<T>;
    /**
     * @inheritDoc
     */
    fieldOrFailAs<T>(aSql: string, aParameterValues?: UFDynamicObject): Promise<T>;
    /**
     * @inheritDoc
     */
    abstract insert(aSql: string, aParameterValues?: UFDynamicObject): Promise<number>;
    /**
     * @inheritDoc
     */
    insertObject<T extends object>(aTable: string, aData: T, aPrimaryKey?: string, anIgnoreFields?: string[]): Promise<T>;
    /**
     * @inheritDoc
     */
    rowAs<T>(aSql: string, aParameterValues?: UFDynamicObject): Promise<T | undefined>;
    /**
     * @inheritDoc
     */
    rowOrFailAs<T>(aSql: string, aParameterValues?: UFDynamicObject): Promise<T>;
    /**
     * @inheritDoc
     */
    rowsAs<T>(aSql: string, aParameterValues?: UFDynamicObject): Promise<T[]>;
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
    updateObject<T extends object>(aTable: string, aPrimaryValue: any, aData: T, aPrimaryKey?: string, anIgnoreFields?: string[]): Promise<void>;
    /**
     * @inheritDoc
     */
    delete(aSql: string, aParameterValues?: UFDynamicObject): Promise<number>;
    /**
     * @inheritDoc
     */
    getUniqueCode(aTable: string, aColumn: string, aLength: number): Promise<string>;
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
    protected convertRow<T>(aRow: TRow): T;
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
    protected processSqlParameters(aSql: string, aParameterValues: UFDynamicObject, aCallback: (aName: string, aValue: any) => string): string;
}

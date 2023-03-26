/**
 * @version 1
 * @author Josha Munnik
 * @copyright Copyright (c) 2022 Ultra Force Development
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
import { IUFDynamicObject } from "../types/IUFDynamicObject";
import { IUFDatabase } from "./IUFDatabase";
/**
 * {@link UFDatabase} can act as a base class for database implementations.
 *
 * It supports named parameters in sql queries, using ':name' where name can be a combination of letters, numbers
 * and underscores.
 *
 * The parameter values are contained in a dynamic object, where the property names match the named parameter.
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
    fieldAs<T>(aSql: string, aParameterValues: IUFDynamicObject, aDefault: T): Promise<T>;
    /**
     * @inheritDoc
     */
    fieldOrFailAs<T>(aSql: string, aParameterValues?: IUFDynamicObject): Promise<T>;
    /**
     * @inheritDoc
     */
    abstract insert(aSql: string, aParameterValues?: IUFDynamicObject): Promise<number>;
    /**
     * @inheritDoc
     */
    insertObject<T extends object>(aTable: string, aData: T, aPrimaryKey?: string): Promise<T>;
    /**
     * @inheritDoc
     */
    rowAs<T>(aSql: string, aParameterValues?: IUFDynamicObject): Promise<T | undefined>;
    /**
     * @inheritDoc
     */
    rowOrFailAs<T>(aSql: string, aParameterValues?: IUFDynamicObject): Promise<T>;
    /**
     * @inheritDoc
     */
    rowsAs<T>(aSql: string, aParameterValues?: IUFDynamicObject): Promise<T[]>;
    /**
     * @inheritDoc
     */
    abstract transaction(aCallback: (aDatabase: IUFDatabase) => Promise<void>): Promise<void>;
    /**
     * @inheritDoc
     */
    abstract update(aSql: string, aParameterValues?: IUFDynamicObject): Promise<number>;
    /**
     * @inheritDoc
     */
    updateObject<T extends object>(aTable: string, aPrimaryValue: any, aData: T, aPrimaryKey?: string): Promise<void>;
    /**
     * @inheritDoc
     */
    delete(aSql: string, aParameterValues?: IUFDynamicObject): Promise<number>;
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
    protected abstract field(aSql: string, aParameterValues?: IUFDynamicObject, aDefault?: any): Promise<any>;
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
    protected abstract row(aSql: string, aParameterValues?: IUFDynamicObject): Promise<TRow | undefined>;
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
    protected abstract rows(aSql: string, aParameterValues?: IUFDynamicObject): Promise<TRow[]>;
    /**
     * Converts a row from database type to an external type. The default implementation just uses a typecast.
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
    protected processSqlParameters(aSql: string, aParameterValues: IUFDynamicObject, aCallback: (aName: string, aValue: any) => string): string;
}

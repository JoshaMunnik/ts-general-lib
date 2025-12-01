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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UFText } from "../tools/UFText.js";
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
export class UFDatabase {
    // region IUFDatabase
    /**
     * @inheritDoc
     */
    fieldAs(sql, parameterValues, defaultValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.field(sql, parameterValues, defaultValue);
        });
    }
    /**
     * @inheritDoc
     */
    fieldOrFailAs(sql, parameterValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const field = yield this.field(sql, parameterValues);
            if (field === undefined) {
                throw new Error('no field for query');
            }
            return field;
        });
    }
    /**
     * @inheritDoc
     */
    insertObject(table_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (table, data, primaryKey = 'id', ignoreFields = []) {
            let columns = '';
            let values = '';
            const parameters = {};
            Object.entries(data).forEach(([key, value]) => {
                if ((key !== primaryKey) && !ignoreFields.includes(key)) {
                    columns = UFText.append(columns, key, ',');
                    values = UFText.append(values, ':' + key, ',');
                    parameters[key] = value;
                }
            });
            const id = yield this.insert(`insert into ${table} (${columns}) values (${values})`, parameters);
            if (id > 0) {
                return Object.assign(Object.assign({}, data), { [primaryKey]: id });
            }
            return data;
        });
    }
    /**
     * @inheritDoc
     */
    rowAs(sql, parameterValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.row(sql, parameterValues);
            return result == undefined ? undefined : this.convertRow(result);
        });
    }
    /**
     * @inheritDoc
     */
    rowOrFailAs(sql, parameterValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.rowAs(sql, parameterValues);
            if (row == undefined) {
                throw new Error('no row for query ' + sql + ' ' + JSON.stringify(parameterValues));
            }
            return row;
        });
    }
    /**
     * @inheritDoc
     */
    rowsAs(sql, parameterValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.rows(sql, parameterValues);
            return result.map(row => this.convertRow(row));
        });
    }
    /**
     * @inheritDoc
     */
    updateObject(table_1, primaryValue_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (table, primaryValue, data, primaryKey = 'id', ignoreFields = []) {
            let fields = '';
            const parameters = {};
            Object.entries(data).forEach(([key, value]) => {
                if ((key !== primaryKey) && !ignoreFields.includes(key)) {
                    fields = UFText.append(fields, key + '=' + ':' + key, ',');
                    parameters[key] = value;
                }
            });
            if (fields.length) {
                const sql = 'update ' + table + ' set ' + fields + ' where ' + primaryKey + ' = :' + primaryKey;
                parameters[primaryKey] = primaryValue;
                yield this.update(sql, parameters);
            }
        });
    }
    /**
     * @inheritDoc
     */
    delete(sql, parameterValues) {
        return __awaiter(this, void 0, void 0, function* () {
            // The default implementation calls update assuming it is handled in the same way by the database
            // implementation.
            return yield this.update(sql, parameterValues);
        });
    }
    /**
     * @inheritDoc
     */
    getUniqueCode(table, column, length) {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const values = {
                    code: UFText.generateCode(length)
                };
                if ((yield this.fieldAs(`select count(*) from ${table} where ${column} = :code`, values, 0)) === 0) {
                    return values.code;
                }
            }
        });
    }
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
    convertRow(row) {
        return row;
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
    processSqlParameters(sql, parameterValues, callback) {
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
}
// endregion
//# sourceMappingURL=UFDatabase.js.map
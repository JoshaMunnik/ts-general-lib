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
    fieldAs(aSql, aParameterValues, aDefault) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.field(aSql, aParameterValues, aDefault);
        });
    }
    /**
     * @inheritDoc
     */
    fieldOrFailAs(aSql, aParameterValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const field = yield this.field(aSql, aParameterValues);
            if (field === undefined) {
                throw new Error('no field for query');
            }
            return field;
        });
    }
    /**
     * @inheritDoc
     */
    insertObject(aTable_1, aData_1) {
        return __awaiter(this, arguments, void 0, function* (aTable, aData, aPrimaryKey = 'id', anIgnoreFields = []) {
            let columns = '';
            let values = '';
            const data = {};
            Object.entries(aData).forEach(([key, value]) => {
                if ((key !== aPrimaryKey) && !anIgnoreFields.includes(key)) {
                    columns = UFText.append(columns, key, ',');
                    values = UFText.append(values, ':' + key, ',');
                    data[key] = value;
                }
            });
            const id = yield this.insert(`insert into ${aTable} (${columns}) values (${values})`, data);
            if (id > 0) {
                return Object.assign(Object.assign({}, aData), { [aPrimaryKey]: id });
            }
            return aData;
        });
    }
    /**
     * @inheritDoc
     */
    rowAs(aSql, aParameterValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.row(aSql, aParameterValues);
            return result == undefined ? undefined : this.convertRow(result);
        });
    }
    /**
     * @inheritDoc
     */
    rowOrFailAs(aSql, aParameterValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.rowAs(aSql, aParameterValues);
            if (row == undefined) {
                throw new Error('no row for query ' + aSql + ' ' + JSON.stringify(aParameterValues));
            }
            return row;
        });
    }
    /**
     * @inheritDoc
     */
    rowsAs(aSql, aParameterValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.rows(aSql, aParameterValues);
            return result.map(row => this.convertRow(row));
        });
    }
    /**
     * @inheritDoc
     */
    updateObject(aTable_1, aPrimaryValue_1, aData_1) {
        return __awaiter(this, arguments, void 0, function* (aTable, aPrimaryValue, aData, aPrimaryKey = 'id', anIgnoreFields = []) {
            let fields = '';
            const data = {};
            Object.entries(aData).forEach(([key, value]) => {
                if ((key !== aPrimaryKey) && !anIgnoreFields.includes(key)) {
                    fields = UFText.append(fields, key + '=' + ':' + key, ',');
                    data[key] = value;
                }
            });
            if (fields.length) {
                const sql = 'update ' + aTable + ' set ' + fields + ' where ' + aPrimaryKey + ' = :' + aPrimaryKey;
                data[aPrimaryKey] = aPrimaryValue;
                yield this.update(sql, data);
            }
        });
    }
    /**
     * @inheritDoc
     */
    delete(aSql, aParameterValues) {
        return __awaiter(this, void 0, void 0, function* () {
            // The default implementation calls update assuming it is handled in the same way by the database
            // implementation.
            return yield this.update(aSql, aParameterValues);
        });
    }
    /**
     * @inheritDoc
     */
    getUniqueCode(aTable, aColumn, aLength) {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const values = {
                    code: UFText.generateCode(aLength)
                };
                if ((yield this.fieldAs(`select count(*) from ${aTable} where ${aColumn} = :code`, values, 0)) === 0) {
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
     * @param aRow
     *   Row to convert.
     *
     * @return The data from aRow as new type.
     */
    convertRow(aRow) {
        return aRow;
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
    processSqlParameters(aSql, aParameterValues, aCallback) {
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
}
// endregion
//# sourceMappingURL=UFDatabase.js.map